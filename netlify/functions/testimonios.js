// /netlify/functions/testimonios.js
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

exports.handler = async ({ httpMethod, body }) => {
  if (httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers:{ 'Access-Control-Allow-Origin':'*' } };
  }
  if (httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Método no permitido' }) };
  }

  const { nombre, texto, servicio, estrellas, destino, imagen_url } = JSON.parse(body);

  if (!nombre||!texto||!servicio||!estrellas||!destino) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Faltan campos' }) };
  }

  const { error: dbErr } = await supabase
    .from('testimonios')
    .insert([{ nombre, texto, servicio, estrellas, destino, imagen_url, fecha: new Date().toISOString() }]);
  if (dbErr) {
    console.error('Error guardando testimonio:', dbErr);
    return { statusCode: 500, body: JSON.stringify({ error:'Error guardando' }) };
  }

  return { statusCode:201, headers:{ 'Access-Control-Allow-Origin':'*' }, body: JSON.stringify({ mensaje:'Guardado' }) };
};
