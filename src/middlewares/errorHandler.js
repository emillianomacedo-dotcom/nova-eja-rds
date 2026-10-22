/* ============================================================
   Nova EJA - Handler global de erros
   ============================================================ */

export function errorHandler(err, req, res, next) {
  console.error("[ERRO]", err.message || err);
  const status = err.status || 500;
  res.status(status).json({
    ok: false,
    mensagem: err.message || "Erro interno do servidor"
  });
}
