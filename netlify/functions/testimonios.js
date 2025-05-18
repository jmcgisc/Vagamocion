const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
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

  if (event.httpMethod === 'GET') {
    return {
      statusCode: 200,
      body: 'Función activa. Usa POST para enviar testimonios.',
    };
  }

  try {
    const data = JSON.parse(event.body);
    const { nombre, texto, servicio, estrellas } = data;

    if (!nombre || !texto || !servicio || !estrellas) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Faltan campos obligatorios' }),
      };
    }

    const { error: dbError } = await supabase.from('testimonios').insert([
      {
        nombre,
        texto,
        servicio,
        estrellas,
        fecha: new Date().toISOString(),
      },
    ]);

    if (dbError) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Error guardando testimonio' }),
      };
    }

    return {
      statusCode: 201,
      body: JSON.stringify({ mensaje: 'Testimonio guardado correctamente' }),
      headers: { 'Access-Control-Allow-Origin': '*' },
    };
  } catch (error) {
    console.error('Error al procesar JSON:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error procesando datos' }),
    };
  }
};