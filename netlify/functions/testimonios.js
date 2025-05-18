const { createClient } = require('@supabase/supabase-js');
const multiparty = require('multiparty');
const fs = require('fs');
const path = require('path');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SECRET
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

  if (event.httpMethod === 'POST') {
    return new Promise((resolve, reject) => {
      const form = new multiparty.Form();

      form.parse(event, async (err, fields, files) => {
        if (err) {
          console.error('Form parse error', err);
          return resolve({ statusCode: 500, body: 'Error parsing form data' });
        }

        const nombre = fields.nombre?.[0];
        const texto = fields.texto?.[0];
        const servicio = fields.servicio?.[0];
        const estrellas = parseInt(fields.estrellas?.[0], 10);
        const imagen = files.imagen?.[0];

        if (!nombre || !texto || !servicio || !estrellas) {
          return resolve({
            statusCode: 400,
            body: JSON.stringify({ error: "Faltan campos obligatorios" }),
          });
        }

        let imagen_url = null;

        if (imagen) {
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
            console.error('Error subiendo imagen:', error);
            return resolve({
              statusCode: 500,
              body: JSON.stringify({ error: 'Error subiendo imagen' }),
            });
          }

          const { data: publicUrlData } = supabase.storage
            .from('testimonios')
            .getPublicUrl(nombreArchivo);

          imagen_url = publicUrlData.publicUrl;
        }

        // Insertar en la base de datos
        const { error: dbError } = await supabase.from('testimonios').insert([
          {
            nombre,
            texto,
            servicio,
            estrellas,
            fecha: new Date().toISOString(),
            imagen_url,
          },
        ]);

        if (dbError) {
          console.error('Error guardando en DB:', dbError);
          return resolve({
            statusCode: 500,
            body: JSON.stringify({ error: 'Error guardando testimonio' }),
          });
        }

        return resolve({
          statusCode: 201,
          body: JSON.stringify({ mensaje: 'Testimonio guardado correctamente' }),
          headers: { 'Access-Control-Allow-Origin': '*' },
        });
      });
    });
  }

  return {
    statusCode: 405,
    body: 'Método no permitido',
  };
};
