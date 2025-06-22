// netlify/functions/testimonios.js
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY // en producción aquí tu service_role key
);

exports.handler = async (event) => {
  // CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*'
      },
    };
  }

  // GET → listar todos los testimonios
  if (event.httpMethod === 'GET') {
    const { data, error } = await supabase
      .from('testimonios')
      .select('*')
      .order('fecha', { ascending: false });

    if (error) {
      console.error('Error al obtener testimonios:', error);
      return {
        statusCode: 500,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ error: 'Error obteniendo testimonios' }),
      };
    }

    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify(data),
    };
  }

  // POST → insertar nuevo testimonio
  if (event.httpMethod === 'POST') {
    let payload;
    try {
      payload = JSON.parse(event.body);
    } catch {
      return {
        statusCode: 400,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ error: 'JSON inválido' }),
      };
    }

    const { nombre, texto, servicio, estrellas, destino, imagen_url } = payload;
    if (!nombre || !texto || !servicio || !estrellas || !destino) {
      return {
        statusCode: 400,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ error: 'Faltan campos requeridos' }),
      };
    }

    const { error: dbErr } = await supabase
      .from('testimonios')
      .insert([{
        nombre,
        texto,
        servicio,
        estrellas,
        destino,
        imagen_url: imagen_url || null,
        fecha: new Date().toISOString()
      }]);

    if (dbErr) {
      console.error('Error guardando testimonio:', dbErr);
      return {
        statusCode: 500,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ error: 'Error guardando testimonio' }),
      };
    }

    return {
      statusCode: 201,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ mensaje: 'Testimonio guardado' }),
    };
  }

  // Cualquier otro método
  return {
    statusCode: 405,
    headers: { 'Access-Control-Allow-Origin': '*' },
    body: JSON.stringify({ error: 'Método no permitido' }),
  };
};
