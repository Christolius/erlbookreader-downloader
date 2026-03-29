export default async (request) => {
  try {
    const apiKey = Deno.env.get('transcriber_key');
    console.log("Received transcription request.");
    if (!apiKey) return new Response('Missing API key', { status: 500 });

    const formData = await request.formData();
    const file = formData.get('audio');
    if (!file) return new Response('Missing audio file', { status: 400 });

    const sm = new FormData();
    sm.append('data_file', file);
    sm.append('config', JSON.stringify({
      type: 'transcription',
      transcription_config: { language: 'id' }
    }));

    const res = await fetch('https://asr.api.speechmatics.com/v2/jobs/', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}` },
      body: sm
    });

    const text = await res.text();
    console.log('Speechmatics status:', res.status);
    console.log('Speechmatics response:', text);

    return new Response(text, {
      status: res.status,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (e) {
    console.error(e);
    return new Response(e.message, { status: 500 });
  }
};

export const config = { path: '/transcribe' };  