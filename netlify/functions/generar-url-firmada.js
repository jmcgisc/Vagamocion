// /netlify/functions/generar-url-firmada.js
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

exports.handler = async function (event) {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*' }
    };
  }
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Método no permitido' }) };
  }

  const { fileName, fileType } = JSON.parse(event.body||'{}');
  if (!fileName || !fileType) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Faltan parámetros' }) };
  }

  // Crea la URL firmada (válida 2 minutos)
  const { data: signed, error: signErr } = await supabase.storage
    .from('testimonios')
    .createSignedUploadUrl(fileName, 120);
  if (signErr) {
    console.error('Error creando signed URL:', signErr);
    return { statusCode: 500, body: JSON.stringify({ error: 'No se pudo generar signed URL' }) };
  }

  // Public URL
  const publicUrl = `${process.env.SUPABASE_URL.replace('/rest/v1','')}/storage/v1/object/public/testimonios/${fileName}`;

  return {
    statusCode: 200,
    headers: { 'Access-Control-Allow-Origin': '*' },
    body: JSON.stringify({ signedUrl: signed.signedUrl, publicUrl })
  };
};
