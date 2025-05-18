const fs = require("fs");
const path = require("path");

const testimoniosPath = path.join(__dirname, "testimonios.json");

exports.handler = async function (event, context) {
  if (event.httpMethod === "GET") {
    const data = fs.readFileSync(testimoniosPath, "utf-8");
    return {
      statusCode: 200,
      body: data,
      headers: { "Content-Type": "application/json" }
    };
  }

  if (event.httpMethod === "POST") {
    const formData = JSON.parse(event.body);
    const { nombre, texto, servicio, estrellas } = formData;

    if (!nombre || !texto || !servicio || !estrellas) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Faltan campos obligatorios" })
      };
    }

    const nuevoTestimonio = {
      id: Date.now(),
      nombre,
      texto,
      servicio,
      estrellas,
      fecha: new Date().toISOString()
    };

    const testimonios = JSON.parse(fs.readFileSync(testimoniosPath, "utf-8"));
    testimonios.push(nuevoTestimonio);
    fs.writeFileSync(testimoniosPath, JSON.stringify(testimonios, null, 2));

    return {
      statusCode: 201,
      body: JSON.stringify({ mensaje: "Testimonio guardado correctamente" })
    };
  }

  return {
    statusCode: 405,
    body: "Método no permitido"
  };
};
