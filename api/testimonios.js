const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL || process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY || process.env.REACT_APP_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  // Configuración de CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('testimonios')
      .select('*')
      .order('fecha', { ascending: false });

    if (error) {
      console.error('Error al obtener testimonios:', error);
      return res.status(500).json({ error: 'Error obteniendo testimonios' });
    }

    return res.status(200).json(data);
  }

  if (req.method === 'POST') {
    let payload = req.body;
    // Si el body es un string (dependiendo de cómo envíe el cliente), parsearlo
    if (typeof payload === 'string') {
      try {
        payload = JSON.parse(payload);
      } catch (e) {
        return res.status(400).json({ error: 'JSON inválido' });
      }
    }

    const { nombre, texto, servicio, estrellas, destino, imagen_url } = payload;
    
    if (!nombre || !texto || !servicio || !estrellas || !destino) {
      return res.status(400).json({ error: 'Faltan campos requeridos' });
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
      return res.status(500).json({ error: 'Error guardando testimonio' });
    }

    return res.status(201).json({ mensaje: 'Testimonio guardado' });
  }

  return res.status(405).json({ error: 'Método no permitido' });
}
