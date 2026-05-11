const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

export default async function handler(req, res) {
  // CORS setup
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch (e) {
      return res.status(400).json({ error: 'JSON inválido' });
    }
  }

  const { fileName } = body;
  if (!fileName) {
    return res.status(400).json({ error: 'Falta fileName' });
  }

  // Generamos la URL firmada para PUT
  const { data, error } = await supabase.storage
    .from('testimonios')
    .createSignedUrl(fileName, 120, { method: 'PUT' });

  if (error) {
    console.error('Error creando signed URL:', error);
    return res.status(500).json({ error: 'No pudo generar URL firmada' });
  }

  // Construimos también la URL pública para luego guardar en la tabla
  const publicUrl = `${process.env.SUPABASE_URL
    .replace('/rest/v1','')
    .replace('/url','')}/storage/v1/object/public/testimonios/${fileName}`;

  return res.status(200).json({ signedUrl: data.signedUrl, publicUrl });
}
