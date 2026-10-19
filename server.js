/* ============================================================
   Nova EJA - Backend (servidor)
   ============================================================ */

import app from "./src/app.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Nova EJA backend rodando na porta " + PORT);
  console.log("Healthcheck: http://localhost:" + PORT + "/health");
});
