const { createClient } = require('@supabase/supabase-js');
const multiparty = require('multiparty');
const fs = require('fs');
const path = require('path');

const supabaseKey = process.env.SUPABASE_KEY;
const supabaseUrl = process.env.SUPABASE_URL;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("supabaseUrl and supabaseKey are required.");
}

const supabase = createClient(supabaseUrl, supabaseKey);
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
    try {
      const form = formidable({ multiples: false });
      const [fields, files] = await new Promise((resolve, reject) => {
        form.parse(event, (err, fields, files) => {
          if (err) {
            console.error("❌ Error al parsear:", err);
            reject(err);
          } else {
            resolve([fields, files]);
          }
        });
      });

      console.log("✅ Campos recibidos:", fields);
      console.log("📷 Imagen recibida:", files?.imagen);

      // Aquí sigue la lógica: subir imagen, guardar en supabase, etc...
      // ...
    } catch (error) {
      console.error("🔥 ERROR INTERNO:", error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Error interno al procesar testimonio" }),
      };
    }
  }

  return {
    statusCode: 405,
    body: "Método no permitido",
  };
};
