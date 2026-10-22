/* ============================================================
   Nova EJA - Rotas de IA
   ============================================================ */

import { Router } from "express";
import { analisar, chat } from "../controllers/iaController.js";

const router = Router();

router.post("/analisar", analisar);
router.post("/chat", chat);

// Healthcheck simples da IA
router.get("/", (req, res) => {
  res.json({ ok: true, mensagem: "Rota de IA ativa", endpoints: ["/analisar", "/chat"] });
});

export default router;
