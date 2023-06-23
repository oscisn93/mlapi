import { useState } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import { v4 as uuid } from "uuid";

// @ts-ignore
const DropzoneStyled = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px dashed #999;
  border-radius: 2px;
  padding: 4px;
  width: 70%;
  min-height: 200px;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 1em;
  color: #999;
  font-size: 1em;
`;

// @ts-ignore
const ImagePreview = styled.img`
  display: flex;
  width: 70%;
  object-fit: cover;
`;

export default function UploadImage() {
  const [images, setImages] = useState<Array<File & { preview: string }>>([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
    onDrop: (acceptedFiles) => {
      setImages(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });
  const handleUpload = async () => {
    await fetch(`https://bucket_api.ocisneros1.workers.dev/${uuid()}`, {
      method: "PUT",
      headers: {
        "Content-Type": "image/jpeg",
      },
      body: images.slice(-1)[0],
    });
  };

  return (
    <>
      {images.length == 0 ? (
        <DropzoneStyled {...getRootProps()}>
          <input {...getInputProps()} />
          <p>
            Drag and drop an image here, or click to select an image and find
            out!
          </p>
        </DropzoneStyled>
      ) : (
        ""
      )}
      {images.length > 0 ? (
        <>
          <ImagePreview src={images[0].preview} />
          <button onClick={() => handleUpload()}>Predict</button>
          <button onClick={() => setImages([])}>Clear</button>
        </>
      ) : (
        ""
      )}
    </>
  );
}
