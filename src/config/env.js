/* ============================================================
   Nova EJA - Leitura e validacao de variaveis de ambiente
   ============================================================ */

import dotenv from "dotenv";
dotenv.config();

function obrigatoria(nome) {
  const valor = process.env[nome];
  if (!valor) throw new Error("Variavel de ambiente obrigatoria ausente: " + nome);
  return valor;
}

function opcional(nome, padrao) {
  return process.env[nome] || padrao;
}

export const ENV = {
  NODE_ENV:           opcional("NODE_ENV", "development"),
  PORT:               Number(opcional("PORT", 3000)),
  CORS_ORIGINS:       opcional("CORS_ORIGINS", "http://localhost:3000"),

  SUPABASE_URL:               obrigatoria("SUPABASE_URL"),
  SUPABASE_SERVICE_ROLE_KEY:  obrigatoria("SUPABASE_SERVICE_ROLE_KEY"),

  IA_PROVEDOR:        opcional("IA_PROVEDOR", "gemini"),
  GEMINI_API_KEY:     opcional("GEMINI_API_KEY", ""),
  GEMINI_MODEL:       opcional("GEMINI_MODEL", "gemini-2.5-flash"),
  OPENAI_API_KEY:     opcional("OPENAI_API_KEY", ""),
  OPENAI_MODEL:       opcional("OPENAI_MODEL", "gpt-4o-mini"),
  
  // Groq
  GROQ_API_KEY:       opcional("GROQ_API_KEY", ""),
  GROQ_MODEL:         opcional("GROQ_MODEL", "openai/gpt-oss-120b")
};

export function validarEnv() {
  if (ENV.IA_PROVEDOR === "gemini" && !ENV.GEMINI_API_KEY) {
    console.warn("[env] IA_PROVEDOR=gemini mas GEMINI_API_KEY esta vazia.");
  }
  if (ENV.IA_PROVEDOR === "openai" && !ENV.OPENAI_API_KEY) {
    console.warn("[env] IA_PROVEDOR=openai mas OPENAI_API_KEY esta vazia.");
  }
  if (ENV.IA_PROVEDOR === "groq" && !ENV.GROQ_API_KEY) {
    console.warn("[env] IA_PROVEDOR=groq mas GROQ_API_KEY esta vazia.");
  }
}
