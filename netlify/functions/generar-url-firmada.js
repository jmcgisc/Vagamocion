const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

exports.handler = async function (event) {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Método no permitido' }),
    };
  }

  try {
    const { fileName, fileType } = JSON.parse(event.body);

    if (!fileName || !fileType) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Faltan parámetros' }),
      };
    }

    // Solo generamos URL pública esperada
    const publicUrl = `${process.env.SUPABASE_URL.replace('/rest/v1', '')}/storage/v1/object/public/testimonios/${fileName}`;

    return {
      statusCode: 200,
      body: JSON.stringify({ publicUrl }),
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    };
  } catch (e) {
    console.error("Error inesperado:", e);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error inesperado' }),
    };
  }
};
