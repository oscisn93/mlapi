export interface Env {
	R2_BUCKET: R2Bucket;
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {

		const corsHeaders = {
			'Access-Control-Allow-Headers': '*',
			'Access-Control-Allow-Methods': 'PUT, GET, DELETE, OPTIONS',
			'Access-Control-Allow-Origin': '*'
		}

		const url = new URL(request.url);
		const key = url.pathname.slice(1);

		switch (request.method) {
			case 'OPTIONS':
				return new Response("OK", {
					headers: corsHeaders
			})
			case 'PUT':
				await env.R2_BUCKET.put(key, request.body);
				return new Response(`Put ${key} successfully!`, {
					headers: corsHeaders
			});
			case 'GET':
				const object = await env.R2_BUCKET.get(key);
				if (object === null) return new Response('Object not found', { status: 404 });

			  object.writeHttpMetadata(headers);
				headers.set('etag', object.httpEtag);

				return new Response(object.body, {
					headers: corsHeaders
				});
			case 'DELETE':
				await env.R2_BUCKET.delete(key);
				return new Response('Deleted!', {
					headers: corsHeaders
			});
			default:
				return new Response('Method Not Allowed', {
					status: 405,
					headers: corsHeaders
				});
		}
	},
};

