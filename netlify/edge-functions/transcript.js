export default async (request) => {
  const apiKey = Deno.env.get('transcriber_key');
  const jobId = new URL(request.url).searchParams.get('job');

  const res = await fetch(`https://asr.api.speechmatics.com/v2/jobs/${jobId}/transcript?format=json-v2`, {
    headers: { Authorization: `Bearer ${apiKey}` }
  });

  const text = await res.text();
  console.log('transcript status:', res.status);
  console.log('transcript response:', text);

  return new Response(text, {
    status: res.status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  });
};

export const config = { path: '/transcript' };