/* ============================================================
   Nova EJA - App Express (rotas + middlewares)
   ============================================================ */

import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";

import alunosRoutes from "./routes/alunos.js";
import formulariosRoutes from "./routes/formularios.js";
import experienciasRoutes from "./routes/experiencias.js";
import iaRoutes from "./routes/ia.js";
import chatRoutes from "./routes/chat.js";
import { errorHandler } from "./middlewares/errorHandler.js";

dotenv.config();

const app = express();

// ---------- CORS ----------
const origensPermitidas = (process.env.CORS_ORIGINS || "")
  .split(",")
  .map(o => o.trim())
  .filter(Boolean);

app.use(cors({
  origin: (origin, cb) => {
    if (!origin) return cb(null, true);
    if (origensPermitidas.includes(origin)) return cb(null, true);
    return cb(new Error("Origem nao permitida pelo CORS: " + origin));
  },
  credentials: false
}));

// ---------- Seguranca + parser ----------
app.use(helmet());
app.use(express.json({ limit: "4mb" }));

// ---------- Healthcheck ----------
app.get("/health", (req, res) => {
  res.json({
    ok: true,
    servico: "nova-eja-backend",
    ia_provedor: process.env.IA_PROVEDOR || "gemini",
    ts: new Date().toISOString()
  });
});

// ---------- Rotas ----------
app.use("/api/alunos", alunosRoutes);
app.use("/api/formularios", formulariosRoutes);
app.use("/api/experiencias", experienciasRoutes);
app.use("/api/ia", iaRoutes);
app.use("/api/chat", chatRoutes);

// ---------- 404 ----------
app.use((req, res) => {
  res.status(404).json({ ok: false, mensagem: "Rota nao encontrada" });
});

// ---------- Erros ----------
app.use(errorHandler);

export default app;
