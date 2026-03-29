export default async (request) => {
  const apiKey = Deno.env.get('SPEECHMATICS_API_KEY');
  const formData = await request.formData();
  const file = formData.get('audio');

  const sm = new FormData();
  sm.append('data_file', file);
  sm.append('config', JSON.stringify({
    type: 'transcription',
    transcription_config: { language: 'en' }
  }));

  const res = await fetch('https://asr.api.speechmatics.com/v2/jobs/', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}` },
    body: sm
  });

  const job = await res.json();
  return new Response(JSON.stringify(job), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  });
};

export const config = { path: '/transcribe' };