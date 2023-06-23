/**
 * - Run `npm run deploy` to publish your worker
 * Learn more at https://developers.cloudflare.com/workers/
 */

export interface Env {
	// Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
	R2_BUCKET: R2Bucket;
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const url = new URL(request.url);
		const key = url.pathname.slice(1);

		switch (request.method) {
			case 'PUT':
				await env.R2_BUCKET.put(key, request.body);
				return new Response(`Put ${key} successfully!`);
			case 'GET':
				const object = await env.R2_BUCKET.get(key);
				if (object === null) return new Response('Object not found', { status: 404 });

				const headers = new Headers();
			  object.writeHttpMetadata(headers);
				headers.set('etag', object.httpEtag);

				return new Response(object.body, {
					headers
				});
			case 'DELETE':
				await env.R2_BUCKET.delete(key);
				return new Response('Deleted!');
			default:
				return new Response('Method Not Allowed', {
					status: 405,
					headers: {
						Allow: 'PUT, GET, DELETE'
					}
				});
		}
	},
};

