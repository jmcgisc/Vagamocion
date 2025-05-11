const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

const RECAPTCHA_SECRET = "6Le6UDUrAAAAAMHUPBt6p4Z-JKg8-4iWmnH3Hgs8";

app.post("/api/contacto", async (req, res) => {
  const { token, ...formData } = req.body;

  if (!token) {
    return res.status(400).json({ message: "Falta el token de reCAPTCHA" });
  }

  try {
    const response = await axios.post(
      "https://www.google.com/recaptcha/api/siteverify",
      null,
      {
        params: {
          secret: RECAPTCHA_SECRET,
          response: token,
        },
      }
    );

    if (!response.data.success) {
      return res.status(403).json({ message: "Captcha inválido" });
    }

    console.log("Formulario recibido:", formData);
    return res.status(200).json({ message: "Formulario enviado con éxito" });
  } catch (error) {
    console.error("Error verificando captcha:", error);
    return res.status(500).json({ message: "Error del servidor" });
  }
});

app.listen(3001, () => {
  console.log("Servidor backend corriendo en http://localhost:3001");
});
