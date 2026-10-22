import { Router } from "express";
import { supabase } from "../config/supabase.js";

const router = Router();

router.post("/", async (req, res, next) => {
  try {
    const { aluno_id, segmento, turma } = req.body;
    if (!aluno_id || !segmento || !turma) {
      return res.status(400).json({ ok: false, mensagem: "aluno_id, segmento e turma sao obrigatorios" });
    }

    const { data, error } = await supabase
      .from("formularios")
      .insert({ aluno_id, segmento, turma, status: "rascunho" })
      .select()
      .single();

    if (error) throw error;
    res.status(201).json({ ok: true, formulario: data });
  } catch (e) { next(e); }
});

router.post("/buscar", async (req, res, next) => {
  try {
    const { aluno_id } = req.body;
    if (!aluno_id) return res.status(400).json({ ok: false, mensagem: "aluno_id e obrigatorio" });

    const { data, error } = await supabase
      .from("formularios")
      .select("*")
      .eq("aluno_id", aluno_id)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) throw error;
    res.json({ ok: true, formulario: data });
  } catch (e) { next(e); }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { data: formulario, error: errF } = await supabase.from("formularios").select("*").eq("id", req.params.id).maybeSingle();
    if (errF) throw errF;
    if (!formulario) return res.status(404).json({ ok: false, mensagem: "Formulario nao encontrado" });

    const { data: aluno } = await supabase.from("alunos").select("*").eq("id", formulario.aluno_id).maybeSingle();
    res.json({ ok: true, formulario, aluno });
  } catch (e) { next(e); }
});

export default router;
