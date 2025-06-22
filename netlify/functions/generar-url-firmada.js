// netlify/functions/generar-url-firmada.js
const { createClient } = require('@supabase/supabase-js');

// Inicializa el cliente con la URL y la Service Role Key
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

exports.handler = async (event) => {
  // CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': '*' },
    };
  }

  // Solo aceptamos POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Método no permitido' }),
    };
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'JSON inválido' }) };
  }

  const { fileName } = body;
  if (!fileName) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Falta fileName' }) };
  }

  // Generamos la URL firmada para PUT
  const { data, error } = await supabase.storage
    .from('testimonios')
    .createSignedUrl(fileName, 120, { method: 'PUT' });

  if (error) {
    console.error('Error creando signed URL:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'No pudo generar URL firmada' }),
    };
  }

  // Construimos también la URL pública para luego guardar en la tabla
  const publicUrl = `${process.env.SUPABASE_URL
    .replace('/rest/v1','')
    .replace('/url','')}/storage/v1/object/public/testimonios/${fileName}`;

  return {
    statusCode: 200,
    headers: { 'Access-Control-Allow-Origin': '*' },
    body: JSON.stringify({ signedUrl: data.signedUrl, publicUrl }),
  };
};
