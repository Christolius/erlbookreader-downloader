export default async (request) => {
  const url = new URL(request.url).searchParams.get('url');
  if (!url) return new Response('Missing url param', { status: 400 });

  const res = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0' }
  });

  const data = await res.arrayBuffer();

  return new Response(data, {
    status: res.status,
    headers: {
      'Content-Type': res.headers.get('content-type') || 'audio/mpeg',
      'Access-Control-Allow-Origin': '*',
    },
  });
};

export const config = { path: '/proxy' };