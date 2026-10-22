/* ============================================================
   Nova EJA - Multi-provedor de IA com Failover
   ============================================================ */

import { GoogleGenerativeAI } from "@google/generative-ai";
import { ENV } from "./env.js";

// ---------- Gemini ----------
let geminiClient = null;
function getGemini() {
  if (!geminiClient) {
    if (!ENV.GEMINI_API_KEY) throw new Error("GEMINI_API_KEY nao configurada.");
    geminiClient = new GoogleGenerativeAI(ENV.GEMINI_API_KEY);
  }
  return geminiClient;
}

async function chamarGemini({ promptSistema, mensagens }) {
  const genAI = getGemini();
  const model = genAI.getGenerativeModel({
    model: ENV.GEMINI_MODEL,
    systemInstruction: promptSistema
  });

  const contents = mensagens.map(m => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }]
  }));

  const result = await model.generateContent({ contents });
  const texto = result.response.text();
  return { texto, provedor: "gemini", modelo: ENV.GEMINI_MODEL };
}

// ---------- OpenAI ----------
async function chamarOpenAI({ promptSistema, mensagens }) {
  if (!ENV.OPENAI_API_KEY) throw new Error("OPENAI_API_KEY nao configurada.");

  const corpo = {
    model: ENV.OPENAI_MODEL,
    messages: [{ role: "system", content: promptSistema }, ...mensagens],
    temperature: 0.4
  };

  const resp = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + ENV.OPENAI_API_KEY.trim()
    },
    body: JSON.stringify(corpo)
  });

  if (!resp.ok) {
    const detalhe = await resp.text();
    throw new Error("OpenAI " + resp.status + ": " + detalhe);
  }

  const dados = await resp.json();
  const texto = dados.choices?.[0]?.message?.content || "";
  return { texto, provedor: "openai", modelo: ENV.OPENAI_MODEL };
}

// ---------- Groq ----------
async function chamarGroq({ promptSistema, mensagens }) {
  if (!ENV.GROQ_API_KEY) throw new Error("GROQ_API_KEY nao configurada.");

  const corpo = {
    model: ENV.GROQ_MODEL,
    messages: [{ role: "system", content: promptSistema }, ...mensagens],
    temperature: 0.4
  };

  const resp = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + ENV.GROQ_API_KEY.trim()
    },
    body: JSON.stringify(corpo)
  });

  if (!resp.ok) {
    const detalhe = await resp.text();
    throw new Error("Groq " + resp.status + ": " + detalhe);
  }

  const dados = await resp.json();
  const texto = dados.choices?.[0]?.message?.content || "";
  return { texto, provedor: "groq", modelo: ENV.GROQ_MODEL };
}

// ---------- API publica com Failover ----------
export async function chamarIA({ promptSistema, mensagens }) {
  const provedorPreferido = (ENV.IA_PROVEDOR || "gemini").toLowerCase();
  
  const fila = [];

  // Monta a fila de prioridade
  if (provedorPreferido === "gemini") {
    fila.push({ nome: "gemini", funcao: chamarGemini });
    if (ENV.GROQ_API_KEY) fila.push({ nome: "groq", funcao: chamarGroq });
    if (ENV.OPENAI_API_KEY) fila.push({ nome: "openai", funcao: chamarOpenAI });
  } else if (provedorPreferido === "groq") {
    fila.push({ nome: "groq", funcao: chamarGroq });
    if (ENV.GEMINI_API_KEY) fila.push({ nome: "gemini", funcao: chamarGemini });
    if (ENV.OPENAI_API_KEY) fila.push({ nome: "openai", funcao: chamarOpenAI });
  } else {
    // Se o provedor preferido nao for reconhecido, tenta todos
    if (ENV.GEMINI_API_KEY) fila.push({ nome: "gemini", funcao: chamarGemini });
    if (ENV.GROQ_API_KEY) fila.push({ nome: "groq", funcao: chamarGroq });
    if (ENV.OPENAI_API_KEY) fila.push({ nome: "openai", funcao: chamarOpenAI });
  }

  let ultimoErro = null;

  for (const provedor of fila) {
    try {
      console.log("[ia] Tentando provedor: " + provedor.nome + "...");
      const resultado = await provedor.funcao({ promptSistema, mensagens });
      console.log("[ia] Sucesso com: " + provedor.nome);
      return resultado;
    } catch (erro) {
      console.warn("[ia] Falha no provedor " + provedor.nome + ":", erro.message);
      ultimoErro = erro;
      // O loop continua para o proximo provedor da fila
    }
  }

  throw new Error("Todos os provedores de IA falharam. Ultimo erro: " + (ultimoErro ? ultimoErro.message : "Desconhecido"));
}
