import { analisarRelato, conversar } from "../services/gemini.js";

export async function analisar(req, res, next) {
  try {
    const { aba, texto, segmento, situacaoId } = req.body;

    if (!aba || texto === undefined) {
      return res.status(400).json({ ok: false, mensagem: "Campos obrigatorios: aba, texto" });
    }

    const r = await analisarRelato({ aba, textoAluno: texto, segmento });

    res.json({
      ok: true,
      aba,
      situacaoId: situacaoId || null,
      resposta: r.texto,
      provedor: r.provedor,
      modelo: r.modelo
    });
  } catch (e) { next(e); }
}

export async function chat(req, res, next) {
  try {
    const { aba, texto, segmento, historico } = req.body;

    if (!aba) {
      return res.status(400).json({ ok: false, mensagem: "Campo obrigatorio: aba" });
    }
    if (!Array.isArray(historico)) {
      return res.status(400).json({ ok: false, mensagem: "historico deve ser uma lista" });
    }

    const r = await conversar({ aba, textoAluno: texto || "", segmento, historico });

    // Tenta extrair a area identificada pela IA
    let area_identificada = null;
    const match = r.texto.match(/\[MATRIZ: (\{.*?\})\]/);
    if (match) {
      try {
        const matriz = JSON.parse(match[1]);
        area_identificada = matriz.area || null;
      } catch (e) {
        console.warn("[ia] Erro ao ler JSON da matriz:", e);
      }
    }

    // Remove a tag tecnica da resposta final que vai para o aluno
    let textoLimpo = r.texto;
    if (match) {
      textoLimpo = textoLimpo.replace(match[0], "").trim();
    }

    res.json({
      ok: true,
      aba,
      resposta: textoLimpo,
      habilidade_id: area_identificada, // Salvamos a Area no banco
      provedor: r.provedor,
      modelo: r.modelo
    });
  } catch (e) { next(e); }
}
