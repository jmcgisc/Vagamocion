// index.js
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 8080;

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Configuración de Multer para imágenes
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = path.join(__dirname, "uploads");
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueName = Date.now() + ext;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

// Ruta para obtener los testimonios
app.get("/api/testimonios", (req, res) => {
  const filePath = path.join(__dirname, "testimonios.json");
  if (!fs.existsSync(filePath)) {
    return res.json([]);
  }

  const data = fs.readFileSync(filePath, "utf8");
  res.json(JSON.parse(data));
});

// Ruta para publicar un nuevo testimonio
app.post("/api/testimonios", upload.single("imagen"), (req, res) => {
  try {
    const filePath = path.join(__dirname, "testimonios.json");
    let testimonios = [];

    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, "utf8");
      testimonios = JSON.parse(raw);
    }

    const { nombre, texto, servicio, estrellas } = req.body;
    const imagen = req.file ? `/uploads/${req.file.filename}` : "/uploads/user2.jpg";

    if (!nombre || !texto || !servicio || !estrellas) {
      return res.status(400).json({ error: "Faltan campos requeridos" });
    }

    const nuevo = {
      nombre,
      texto,
      servicio,
      estrellas: Number(estrellas),
      fecha: new Date().toISOString(),
      imagen,
    };

    testimonios.unshift(nuevo);

    fs.writeFileSync(filePath, JSON.stringify(testimonios, null, 2));

    res.status(201).json({ mensaje: "Testimonio guardado con éxito", testimonio: nuevo });
  } catch (error) {
    console.error("Error en POST /api/testimonios:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Arrancar el servidor
app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
});
