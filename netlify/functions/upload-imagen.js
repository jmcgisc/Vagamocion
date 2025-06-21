const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

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

    const { data, error } = await supabase.storage
      .from('testimonios')
      .createSignedUploadUrl(fileName, fileType);

    if (error) {
      console.error('Error al crear signed URL:', error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Error creando la URL firmada' }),
      };
    }

    const publicUrl = supabase.storage
      .from('testimonios')
      .getPublicUrl(fileName).data.publicUrl;

    return {
      statusCode: 200,
      body: JSON.stringify({
        signedUrl: data.signedUrl,
        publicUrl,
      }),
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    };
  } catch (err) {
    console.error('Error general:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error interno' }),
    };
  }
};
