import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Clé secrète pour JWT
const SECRET = "supersecretkey123";

// "Base de données" en mémoire
let users = []; // chaque utilisateur : { email, password (hash) }

// ------------------------
// Route Register
// ------------------------
app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  // Vérifier si l'utilisateur existe déjà
  const exists = users.find((u) => u.email === email);
  if (exists) return res.status(400).json({ message: "Utilisateur déjà existant" });

  // Hasher le mot de passe
  const hashedPassword = await bcrypt.hash(password, 10);

  // Ajouter à la "DB"
  users.push({ email, password: hashedPassword });

  res.status(201).json({ message: "Utilisateur créé avec succès" });
});

// ------------------------
// Route Login
// ------------------------
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Chercher l'utilisateur
  const user = users.find((u) => u.email === email);
  if (!user) return res.status(401).json({ message: "Utilisateur introuvable" });

  // Vérifier le mot de passe
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) return res.status(401).json({ message: "Mot de passe incorrect" });

  // Générer un token JWT
  const token = jwt.sign({ email }, SECRET, { expiresIn: "1h" });

  res.json({ accessToken: token });
});

// ------------------------
// Route test protégée
// ------------------------
app.get("/profile", (req, res) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.sendStatus(401);

  const token = authHeader.split(" ")[1];
  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    res.json({ message: "Bienvenue dans ton profil", user });
  });
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur backend lancé sur http://localhost:${PORT}`);
});
