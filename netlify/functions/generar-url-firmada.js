// netlify/functions/generar-url-firmada.js
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: { 'Access-Control-Allow-Origin': '*' } };
  }
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Método no permitido' }) };
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'JSON inválido' }) };
  }
  const { fileName, fileType } = body;
  if (!fileName || !fileType) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Faltan parámetros' }) };
  }

  const { data, error } = await supabase.storage
    .from('testimonios')
    .createSignedUploadUrl(fileName, 120);
  if (error) {
    console.error('Error creando signed URL:', error);
    return { statusCode: 500, body: JSON.stringify({ error: 'No pudo generar URL firmada' }) };
  }

  // Construye la URL pública
  const publicUrl = `${process.env.SUPABASE_URL.replace('/rest/v1','')}/storage/v1/object/public/testimonios/${fileName}`;

  return {
    statusCode: 200,
    headers: { 'Access-Control-Allow-Origin': '*' },
    body: JSON.stringify({ signedUrl: data.signedUrl, publicUrl }),
  };
};
