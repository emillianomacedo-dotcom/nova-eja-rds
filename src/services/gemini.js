import { chamarIA } from "../config/providers.js";

export async function analisarRelato({ aba, textoAluno, segmento }) {
  const { promptAnalise } = await import("./prompts.js");
  const { promptSistema, mensagens } = promptAnalise(aba, textoAluno, segmento);

  const { texto, provedor, modelo } = await chamarIA({ promptSistema, mensagens });
  return { texto, provedor, modelo };
}

export async function conversar({ aba, textoAluno, segmento, historico }) {
  const { promptChat } = await import("./prompts.js");
  
  // LIMITA O HISTORICO PARA NAO ESTOURAR O LIMITE DE TOKENS DO GROQ (8000 TPM)
  // Mantem apenas as ultimas 10 mensagens (5 do aluno + 5 da IA)
  const historicoLimitado = historico.slice(-10);
  
  const { promptSistema, mensagens } = promptChat(aba, textoAluno, segmento, historicoLimitado);

  const { texto, provedor, modelo } = await chamarIA({ promptSistema, mensagens });
  return { texto, provedor, modelo };
}
