const fs = require("fs");
const path = require("path");

exports.handler = async () => {
  try {
    const dataPath = path.join(__dirname, "testimonios.json");
    const data = fs.readFileSync(dataPath, "utf8");
    const testimonios = JSON.parse(data);

    return {
      statusCode: 200,
      body: JSON.stringify(testimonios),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "No se pudieron obtener los testimonios" }),
    };
  }
};
