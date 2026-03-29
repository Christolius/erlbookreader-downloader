export default async (request) => {
  const apiKey = Deno.env.get('SPEECHMATICS_API_KEY');
  const jobId = new URL(request.url).searchParams.get('job');

  const res = await fetch(`https://asr.api.speechmatics.com/v2/jobs/${jobId}/transcript?format=json-v2`, {
    headers: { Authorization: `Bearer ${apiKey}` }
  });

  const data = await res.json();
  return new Response(JSON.stringify(data), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  });
};

export const config = { path: '/transcript' };