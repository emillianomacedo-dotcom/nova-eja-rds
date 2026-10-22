/* ============================================================
   Nova EJA - Rotas de Experiencias
   ============================================================ */

import { Router } from "express";
import { supabase } from "../config/supabase.js";

const router = Router();

// POST /api/experiencias - Cria nova experiencia
router.post("/", async (req, res, next) => {
  try {
    const {
      formulario_id, tipo, descricao,
      periodo_inicio, periodo_fim, instituicao_local
    } = req.body;

    if (!formulario_id || !tipo || !descricao) {
      return res.status(400).json({
        ok: false,
        mensagem: "formulario_id, tipo e descricao sao obrigatorios"
      });
    }

    const { data, error } = await supabase
      .from("experiencias")
      .insert({ formulario_id, tipo, descricao, periodo_inicio, periodo_fim, instituicao_local })
      .select()
      .single();

    if (error) throw error;
    res.status(201).json({ ok: true, experiencia: data });
  } catch (e) { next(e); }
});

// DELETE /api/experiencias/:id
router.delete("/:id", async (req, res, next) => {
  try {
    const { error } = await supabase
      .from("experiencias")
      .delete()
      .eq("id", req.params.id);
    if (error) throw error;
    res.json({ ok: true });
  } catch (e) { next(e); }
});

export default router;
