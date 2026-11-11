import { Router } from "express";
import { supabase } from "../config/supabase.js";
import { MATRIZ_FUNDAMENTAL, MATRIZ_MEDIO } from "../services/prompts.js";
import PDFDocument from "pdfkit"; // Importação do PDFKit

const router = Router();

// 1. Listar todos os alunos
router.get("/alunos", async (req, res, next) => {
  try {
    const { data: alunos, error: errA } = await supabase
      .from("alunos")
      .select("*")
      .order("nome_completo");

    if (errA) throw errA;

    const { data: formularios, error: errF } = await supabase
      .from("formularios")
      .select("aluno_id, turma, segmento, id")
      .order("id", { ascending: false });

    if (errF) throw errF;

    const alunosFormatados = alunos.map(aluno => {
      const formDoAluno = formularios.find(f => f.aluno_id === aluno.id);
      return {
        id: aluno.id,
        nome_completo: aluno.nome_completo,
        cpf: aluno.cpf,
        acesso_bloqueado: aluno.acesso_bloqueado,
        turma: formDoAluno ? formDoAluno.turma : "Sem turma",
        segmento: formDoAluno ? formDoAluno.segmento : "Não informado"
      };
    });

    res.json({ ok: true, alunos: alunosFormatados });
  } catch (e) { next(e); }
});

// 2. Bloquear/Desbloquear aluno
router.put("/alunos/:id/bloquear", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { bloqueado } = req.body;
    const { data, error } = await supabase
      .from("alunos")
      .update({ acesso_bloqueado: bloqueado })
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    res.json({ ok: true, aluno: data });
  } catch (e) { next(e); }
});

// 3. Buscar relatório (JSON - usado pelo frontend para outros fins)
router.get("/alunos/:id/relatorio.pdf", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { data: form, error: errF } = await supabase
      .from("formularios")
      .select("*")
      .eq("aluno_id", id)
      .order("id", { ascending: false })
      .limit(1)
      .maybeSingle();
      
    if (errF) throw errF;
    if (!form) return res.json({ ok: true, mensagens: [], formulario: null, matriz: null });

    const { data: mensagens, error: errM } = await supabase
      .from("mensagens_chat")
      .select("*")
      .eq("formulario_id", form.id)
      .order("id");
      
    if (errM) throw errM;

    const isMedio = form.segmento && form.segmento.toLowerCase().includes("médio");
    const matriz = isMedio ? MATRIZ_MEDIO : MATRIZ_FUNDAMENTAL;

    res.json({ ok: true, mensagens: mensagens || [], formulario: form, matriz: matriz });
  } catch (e) { next(e); }
});

// 4. NOVA ROTA: Gerar PDF diretamente no Backend
router.get("/alunos/:id/relatorio.pdf", async (req, res, next) => {
  try {
    const { id } = req.params;
    
    // Busca o formulário mais recente
    const { data: form, error: errF } = await supabase
      .from("formularios")
      .select("*")
      .eq("aluno_id", id)
      .order("id", { ascending: false })
      .limit(1)
      .maybeSingle();
      
    if (errF) throw errF;
    if (!form) return res.status(404).json({ ok: false, mensagem: "Formulário não encontrado" });

    // Busca as mensagens
    const { data: mensagens, error: errM } = await supabase
      .from("mensagens_chat")
      .select("*")
      .eq("formulario_id", form.id)
      .order("id");
      
    if (errM) throw errM;

    // Busca o aluno
    const { data: aluno, error: errA } = await supabase
      .from("alunos")
      .select("*")
      .eq("id", form.aluno_id)
      .single();
      
    if (errA) throw errA;

    // Cria o documento PDF
    const doc = new PDFDocument({ margin: 50 });
    
    // Configura a resposta para download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=Relatorio_RDS_${aluno.nome_completo.replace(/\s+/g, '_')}.pdf`);
    
    doc.pipe(res);

    // --- CAPA AZUL ---
    doc.rect(0, 0, doc.page.width, doc.page.height).fill('#003b73');
    doc.fillColor('white').fontSize(20).text('SESI - SERVIÇO SOCIAL DA INDÚSTRIA', { align: 'center' });
    doc.moveDown(2);
    doc.fontSize(30).text('Relatório RDS', { align: 'center' });
    doc.fontSize(24).text('Reconhecimento de Saberes', { align: 'center' });
    doc.moveDown(2);
    doc.fontSize(18).text(aluno.nome_completo, { align: 'center' });
    doc.fontSize(14).text(`CPF: ${aluno.cpf}`, { align: 'center' });
    doc.fontSize(14).text(`Etapa: ${form.segmento}`, { align: 'center' });
    doc.fontSize(12).text(`Data: ${new Date().toLocaleDateString('pt-BR')}`, { align: 'center' });
    
    doc.addPage();

    // --- CONTEÚDO ---
    doc.fillColor('black').fontSize(18).text('Relatório de Reconhecimento', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(`Nome: ${aluno.nome_completo}`);
    doc.text(`CPF: ${aluno.cpf}`);
    doc.text(`Etapa: ${form.segmento}`);
    doc.text(`Status: Concluído`);
    doc.moveDown();

    // Habilidades Reconhecidas
    const habilidadesMap = new Map();
    mensagens.forEach(msg => {
      if (msg.habilidade_id) {
        try {
          const hab = JSON.parse(msg.habilidade_id);
          if (hab && hab.area) {
            const codigoHab = hab.habilidade || hab.codigo || "Habilidade Identificada";
            const chave = `${hab.area}-${codigoHab}`;
            if (!habilidadesMap.has(chave)) {
              habilidadesMap.set(chave, { area: hab.area, codigo: codigoHab, justificativa: hab.justificativa || "Reconhecida." });
            }
          }
        } catch (e) {}
      }
    });

    const habilidades = Array.from(habilidadesMap.values());
    if (habilidades.length > 0) {
      doc.fontSize(14).text('Habilidades Reconhecidas pela IA:', { underline: true });
      doc.moveDown(0.5);
      habilidades.forEach(h => {
        doc.fontSize(10).text(`Área: ${h.area} | Habilidade: ${h.codigo}`);
        doc.fontSize(10).fillColor('#555').text(`Justificativa: ${h.justificativa}`);
        doc.moveDown(0.5);
      });
      doc.fillColor('black');
    }

    doc.addPage();

    // Relatos por Bloco
    doc.fontSize(14).text('Relatos de Experiência por Bloco:', { underline: true });
    doc.moveDown();

    const blocos = {};
    mensagens.forEach(msg => {
      if (!blocos[msg.aba]) blocos[msg.aba] = [];
      blocos[msg.aba].push(msg);
    });

    const titulosBlocos = {
      1: "1. História de Vida", 2: "2. Tempo Livre", 3: "3. Atividades Sociais",
      4: "4. Experiência Profissional", 5: "5. Linguagens", 6: "6. Matemática",
      7: "7. Ciências da Natureza", 8: "8. Ciências Humanas"
    };

    for (let i = 1; i <= 8; i++) {
      if (blocos[i] && blocos[i].length > 0) {
        doc.fontSize(12).text(titulosBlocos[i], { underline: true });
        doc.moveDown(0.5);

        let ultimaPerguntaIA = "";
        blocos[i].forEach(msg => {
          const textoLimpo = msg.texto.replace(/\[MATRIZ:.*?\]|\[FIM_BLOCO\]/g, "").trim();
          if (msg.remetente === 'ia') {
            ultimaPerguntaIA = textoLimpo;
          } else if (msg.remetente === 'aluno' && textoLimpo) {
            if (ultimaPerguntaIA) {
              doc.fontSize(10).fillColor('#0057b8').text(`Tutor IA: ${ultimaPerguntaIA}`);
            }
            doc.fontSize(10).fillColor('black').text(`Aluno: ${textoLimpo}`);
            doc.moveDown(0.5);
            ultimaPerguntaIA = "";
          }
        });
        doc.moveDown();
      }
    }

    doc.end();

  } catch (e) { next(e); }
});

// 5. Deletar aluno
router.delete("/alunos/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { data: formularios } = await supabase.from("formularios").select("id").eq("aluno_id", id);
    if (formularios && formularios.length > 0) {
      const idsFormularios = formularios.map(f => f.id);
      await supabase.from("mensagens_chat").delete().in("formulario_id", idsFormularios);
    }
    await supabase.from("formularios").delete().eq("aluno_id", id);
    const { error } = await supabase.from("alunos").delete().eq("id", id);
    if (error) throw error;
    res.json({ ok: true, mensagem: "Aluno e registros deletados com sucesso." });
  } catch (e) { next(e); }
});

export default router;
