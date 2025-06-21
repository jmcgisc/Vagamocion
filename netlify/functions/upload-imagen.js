const { createClient } = require('@supabase/supabase-js');
const multiparty = require('multiparty');
const fs = require('fs');
const path = require('path');
const { Readable } = require('stream');

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

  return new Promise((resolve) => {
    const form = new multiparty.Form();

    let reqBody = event.body;
    if (event.isBase64Encoded) {
      reqBody = Buffer.from(event.body, 'base64');
    }

    const req = new Readable();
    req.push(reqBody);
    req.push(null);
    req.headers = {
      'content-type': event.headers['content-type'] || event.headers['Content-Type'],
    };

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Error al parsear el formulario:', err);
        return resolve({
          statusCode: 500,
          body: JSON.stringify({ error: 'Error al procesar el formulario' }),
        });
      }

      const imagen = files.imagen?.[0];
      if (!imagen) {
        return resolve({
          statusCode: 400,
          body: JSON.stringify({ error: 'No se recibió ninguna imagen' }),
        });
      }

      const ext = path.extname(imagen.originalFilename);
      const nombreArchivo = `testimonio-${Date.now()}${ext}`;
      const { data, error } = await supabase.storage
        .from('testimonios')
        .upload(nombreArchivo, fs.createReadStream(imagen.path), {
          contentType: imagen.headers['content-type'],
          cacheControl: '3600',
          upsert: false,
        });

      if (error) {
        console.error('Error al subir imagen:', error);
        return resolve({
          statusCode: 500,
          body: JSON.stringify({ error: 'Error subiendo imagen' }),
        });
      }

      const { data: publicUrlData, error: urlError } = supabase.storage
      .from('testimonios')
      .getPublicUrl(nombreArchivo);

    if (urlError || !publicUrlData?.publicUrl) {
      console.error('Error obteniendo URL pública:', urlError);
      return resolve({
        statusCode: 500,
        body: JSON.stringify({ error: 'No se pudo obtener la URL de la imagen' }),
      });
    }

    return resolve({
      statusCode: 200,
      body: JSON.stringify({ url: publicUrlData.publicUrl }),
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    });
    });
  });
};
