// /.netlify/functions/testimonios
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

  if (event.httpMethod === 'GET') {
    const { data, error } = await supabase
      .from('testimonios')
      .select('*')
      .order('fecha', { ascending: false });

    if (error) {
      console.error('Error al obtener testimonios:', error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Error al obtener testimonios' }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(data),
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    };
  }

  if (event.httpMethod === 'POST') {
    try {
      const body = JSON.parse(event.body);
      const { nombre, texto, servicio, estrellas, destino, imagen_url } = body;

      if (!nombre || !texto || !servicio || !estrellas || !destino) {
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
          destino,
imagen_url: imagen_url?.trim() ? imagen_url : 'https://dfhulxkgsfhjgoqlyolv.supabase.co/storage/v1/object/public/testimonios/user1.jpg',
        },
      ]);

      if (dbError) {
        console.error('Error guardando en DB:', dbError);
        return {
          statusCode: 500,
          body: JSON.stringify({ error: 'Error guardando testimonio' }),
        };
      }

      return {
        statusCode: 201,
        body: JSON.stringify({ mensaje: 'Testimonio guardado correctamente' }),
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      };
    } catch (err) {
      console.error('Error en POST:', err);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Error procesando solicitud' }),
      };
    }
  }

  return {
    statusCode: 405,
    body: JSON.stringify({ error: 'Método no permitido' }),
  };
};
