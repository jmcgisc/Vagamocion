// netlify/functions/upload-imagen.js
const { createClient } = require('@supabase/supabase-js');
const multiparty = require('multiparty');
const fs = require('fs');
const path = require('path');
const { Readable } = require('stream');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

exports.handler = async (event) => {
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

    const bodyBuffer = event.isBase64Encoded
      ? Buffer.from(event.body, 'base64')
      : Buffer.from(event.body);

    const req = new Readable();
    req.push(bodyBuffer);
    req.push(null);
    req.headers = {
      'content-type': event.headers['content-type'] || event.headers['Content-Type'],
    };

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error("Error al parsear el formulario:", err);
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
          upsert: false,
        });

      if (error) {
        console.error("Error al subir imagen:", error);
        return resolve({
          statusCode: 500,
          body: JSON.stringify({ error: 'Error subiendo imagen' }),
        });
      }

      const { data: publicData } = supabase.storage
        .from('testimonios')
        .getPublicUrl(nombreArchivo);

      return resolve({
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ url: publicData.publicUrl }),
      });
    });
  });
};
