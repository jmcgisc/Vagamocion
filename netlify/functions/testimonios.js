// netlify/functions/testimonios.js
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

exports.handler = async (event) => {
  // Permitir CORS y preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': '*' },
    };
  }

  // GET → listar testimonios
  if (event.httpMethod === 'GET') {
    const { data, error } = await supabase
      .from('testimonios')
      .select('*')
      .order('fecha', { ascending: false });
    if (error) {
      console.error('Error al obtener testimonios:', error);
      return { statusCode: 500, body: JSON.stringify({ error: 'Error obteniendo testimonios' }) };
    }
    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify(data),
    };
  }

  // POST → agregar uno nuevo
  if (event.httpMethod === 'POST') {
    let payload;
    try {
      payload = JSON.parse(event.body);
    } catch (e) {
      return { statusCode: 400, body: JSON.stringify({ error: 'JSON inválido' }) };
    }

    const { nombre, servicio, destino, estrellas, texto, imagen_url } = payload;
    if (!nombre || !servicio || !destino || !estrellas || !texto) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Faltan campos' }) };
    }

    const { error: dbErr } = await supabase
      .from('testimonios')
      .insert([{ nombre, servicio, destino, estrellas, texto, imagen_url, fecha: new Date().toISOString() }]);
    if (dbErr) {
      console.error('Error guardando testimonio:', dbErr);
      return { statusCode: 500, body: JSON.stringify({ error: 'Error guardando testimonio' }) };
    }

    return {
      statusCode: 201,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ mensaje: 'Testimonio guardado' }),
    };
  }

  // Otros métodos no permitidos
  return { statusCode: 405, body: JSON.stringify({ error: 'Método no permitido' }) };
};
