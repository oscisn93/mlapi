from fastapi import FastAPI
import uvicorn
import numpy as np
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras.preprocessing import image


server = FastAPI()

# Load model
model = keras.models.load_model("ir_model")
# Load Image
image_path = "./image.jpg"
img = image.load_img(image_path, target_size=(128, 128))
img_array = image.img_to_array(img)
img_batch = np.expand_dims(img_array, axis=0)
img_preprocessed = keras.preprocess_input(img_batch)

prediction = model.predict(img_preprocessed)
msg = keras.decoded_predictions(prediction, top=3)[0]



@server.get("/")
async def root():
    return {"Prediction": f"It appears to be {msg}"}

if __name__ == "__main__":
    uvicorn.run(server)
