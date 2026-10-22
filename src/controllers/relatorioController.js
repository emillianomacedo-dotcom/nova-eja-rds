import { conversar } from "../services/gemini.js";

export async function gerarRelatorio(req, res, next) {
  try {
    const { mensagens, aluno } = req.body;

    if (!mensagens || !Array.isArray(mensagens)) {
      return res.status(400).json({ ok: false, mensagem: "Mensagens invalidas" });
    }

    const falasAluno = mensagens.filter(m => m.remetente === "aluno").map(m => m.texto);
    if (falasAluno.length === 0) {
      return res.json({ ok: true, relatorio: "Nenhuma fala do aluno registrada." });
    }

    const textoAluno = falasAluno.join("\n\n");

    const prompt = `
Voce e um avaliador pedagogico do SESI. Abaixo estao as respostas de um aluno.
Sua tarefa e:
1. Agrupar as respostas em formato de relatorio, usando os titulos oficiais dos blocos.
2. Identificar quais HABILIDADES ESPECIFICAS da Matriz SESI o aluno demonstrou (ex: "H1 - Identificar formas...", "H4 - Descrever...").

RESPOSTAS DO ALUNO:
${textoAluno}

INSTRUCOES DO RELATORIO:
- Organize em topicos: "1. Historia da Minha Vida", etc.
- No final, crie uma secao "HABILIDADES RECONHECIDAS" listando o nome da habilidade e um trecho da fala que comprova.
- Seja rigoroso: so marque uma habilidade se houver evidencia clara na fala do aluno.
`;

    const r = await conversar({ 
      aba: 1, 
      textoAluno: prompt, 
      segmento: aluno.segmento, 
      historico: [] 
    });

    res.json({ ok: true, relatorio: r.texto });
  } catch (e) { next(e); }
}
