// src/services/prompts.js

export const MATRIZ_FUNDAMENTAL = `
MATRIZ SESI NOVA EJA - ENSINO FUNDAMENTAL II (ANOS FINAIS)
[Matriz resumida - cole aqui a sua matriz completa do Fundamental]
`;

export const MATRIZ_MEDIO = `
MATRIZ SESI NOVA EJA - ENSINO MÉDIO
[Matriz resumida - cole aqui a sua matriz completa do Médio]
`;

// ==========================================
// ROTEIROS ESPECÍFICOS PARA O ENSINO FUNDAMENTAL II
// ==========================================
function getRoteiroFundamental(aba) {
  switch (Number(aba)) {
    case 1:
      return `
      **ROTEIRO DO BLOCO 1 (FUNDAMENTAL): HISTÓRIA DE VIDA**
      Faça UMA pergunta por vez:
      1. "De onde venho / Como fui...?" 
      2. "Quem sou / Como sou...?" 
      3. "Estou aqui porque / O que eu espero...?" 
      4. "Como serei / Amanhã me vejo...?" 
      5. "Tenho dúvidas sobre...?" 
      6. "Para mim, reconhecimento de saberes é...?" 
      `;
    case 2:
      return `
      **ROTEIRO DO BLOCO 2 (FUNDAMENTAL): TEMPO LIVRE**
      Faça UMA pergunta por vez:
      1. "O que eu mais gosto de fazer?"
      2. "O que não gosto de fazer?"
      3. "Se eu tivesse mais tempo, me dedicaria a...?"
      4. "Gasto a maior parte do meu tempo livre...?"
      `;
    case 3:
      return `
      **ROTEIRO DO BLOCO 3 (FUNDAMENTAL): ATIVIDADES SOCIAIS**
      Faça UMA pergunta por vez:
      1. "Você participa de alguma associação? (Desportiva, Cultural, Religiosa, Filantrópica, Profissional, Recreativa)"
      2. "O que aprendi e conservo até hoje?"
      3. "Exerço alguma atividade filantrópica?"
      4. "Participo de modo responsável e cívico na vida da comunidade?"
      5. "Ajudo no diálogo e entendimento entre as pessoas?"
      6. "Participo de questões educacionais?"
      7. "Colaboro na defesa da saúde pública?"
      8. "Assumo responsabilidades em problemas sociais?"
      9. "Participo de iniciativas em defesa dos direitos?"
      10. "Coordeno projetos ou atividades?"
      11. "Adapto-me a situações novas e inesperadas?"
      12. "Tento compreender o ponto de vista dos outros?"
      13. "Relaciono-me no trabalho cumprindo as normas?"
      14. "Cumpro as regras de higiene e segurança no trabalho?"
      15. "Recorro a instituições no uso dos meus direitos?"
      16. "Sou sindicalizado e conheço meus direitos?"
      17. "Trabalho em equipe cooperativamente?"
      `;
    case 4:
      return `
      **ROTEIRO DO BLOCO 4 (FUNDAMENTAL): EXPERIÊNCIA PROFISSIONAL**
      1. Primeiro, pergunte: "Você tem experiência profissional?"
      2. Se a resposta for "NÃO", pule para o próximo bloco.
      3. Se a resposta for "SIM", pergunte sobre a primeira experiência: Data de Admissão/Demissão, Profissão, Empresa, Atividades, Motivos de Satisfação, Motivos de Insatisfação, O que aprendeu.
      `;
    case 5:
      return `
      **ROTEIRO DO BLOCO 5 (FUNDAMENTAL): LINGUAGENS**
      Faça UMA pergunta por vez:
      **C1:**
      1. "Você já precisou ler e compreender diferentes textos do dia a dia (redes sociais, placas, relatórios, receitas, bulas)?"
      2. "Você já precisou identificar pessoas e direcionar textos escritos/falados em Língua Portuguesa ou Estrangeira?"
      3. "Você já precisou ler, escrever ou falar palavras em Língua Estrangeira no seu contexto?"
      4. "Você costuma respeitar manifestações culturais (danças, músicas, grafite, religiões)?"
      5. "Você já organizou algum evento cultural?"
      **C2:**
      6. "Você já precisou produzir textos (relatório, e-mail, relatos)?"
      7. "Você já precisou ler notícias, artigos, e-mails, considerando a função social?"
      8. "Você já precisou perceber mensagens indiretas para não gerar ofensa?"
      9. "Você já identificou a presença de um texto dentro de outro (intertextualidade)?"
      10. "Você já precisou usar conectivos para dar coerência a um texto?"
      **C3:**
      11. "Você já precisou passar uma informação ao público falando, escrevendo ou com slides?"
      12. "Você já precisou identificar sentidos em embalagens, relatórios ou gráficos no trabalho?"
      13. "Você já precisou escolher o meio de comunicação (verbal/não verbal) para passar uma mensagem?"
      14. "Você já precisou perceber diferentes culturas e classes sociais pelas ações das personagens?"
      15. "Você já precisou trabalhar em equipe colaborativamente (oficinas, dança, teatro)?"
      **C4:**
      16. "Você já compartilhou dicas de sustentabilidade na internet?"
      17. "Você já usou aplicativos e ferramentas tecnológicas para entender mudanças sociais?"
      18. "Você já presenciou ou sofreu cyberbullying? Como lidou?"
      **C5:**
      19. "Você já precisou reconhecer informações no campo da arte?"
      20. "Você já produziu alguma forma de arte ligada à sua realidade e cultura local?"
      `;
    case 6:
      return `
      **ROTEIRO DO BLOCO 6 (FUNDAMENTAL): MATEMÁTICA**
      Faça UMA pergunta por vez:
      **C1:**
      1. "Você já precisou identificar tipos de números (troco, temperatura, extrato bancário)?"
      2. "Você já resolveu situações com saldo positivo/negativo (dívidas, contas divididas)?"
      3. "Você já precisou calcular metragem real com base em planta baixa (escala 1:100)?"
      4. "Você já precisou calcular dias necessários para produzir um lote?"
      **C2:**
      5. "Você já precisou medir lados de um espaço retangular e calcular o perímetro?"
      6. "Você compreende a diferença entre área (m²) e volume (m³) em uma construção?"
      7. "Você já identificou formas tridimensionais (caixa de sapatos) e bidimensionais?"
      8. "Você já precisou estimar a altura de um prédio observando o ângulo?"
      9. "Você já precisou calcular a altura de um muro usando Teorema de Pitágoras?"
      10. "Você já usou GPS para determinar posições e distâncias?"
      11. "Você compreende como a trigonometria está presente em ondas eletromagnéticas e construção civil?"
      **C3:**
      12. "Você já precisou diluir suco concentrado (500ml em 2L de água)?"
      13. "Você já escreveu sequências de anos (Copa, Olimpíadas, eleições)?"
      14. "Você já escreveu uma expressão algébrica (litros de combustível e preço)?"
      15. "Você já precisou identificar capacidade de armazenamento (4Mb, 8Mb, 16Mb, 32Mb)?"
      16. "Você já calculou uma dívida com juros simples e compostos?"
      **C4:**
      17. "Você já precisou determinar maneiras de uma moeda cair (cara/coroa) em 4 jogadas?"
      18. "Você já precisou descobrir combinações de sorvete (5 bolas, 8 sabores)?"
      19. "Você já precisou descobrir a probabilidade de sortear uma carta de ouro em um baralho?"
      **C5:**
      20. "Você já precisou comparar taxa de desemprego Brasil/mundo em um gráfico?"
      21. "Você já precisou identificar a menor fatia em um gráfico de setores?"
      22. "Você já precisou calcular média, moda e mediana de salários?"
      23. "Você já construiu uma tabela de gastos mensais?"
      `;
    case 7:
      return `
      **ROTEIRO DO BLOCO 7 (FUNDAMENTAL): CIÊNCIAS DA NATUREZA**
      Faça UMA pergunta por vez:
      **C1:**
      1. "Você já precisou interpretar textos e mídias (rótulos, propagandas)?"
      2. "Você compreende o uso de transportes alternativos (bicicleta, ônibus) para reduzir gases tóxicos?"
      3. "Você já precisou diferenciar notícias científicas de fake news?"
      4. "Você já colaborou com coleta de resíduos sólidos e reciclagem?"
      5. "Você já precisou interpretar informações científicas em manuais, revistas e jornais?"
      **C2:**
      6. "Você consegue explicar os tipos de poluição (água, ar, solo)?"
      7. "Você já debateu sobre a poluição no seu bairro e as consequências para a saúde?"
      8. "Você já defendeu propostas de recuperação ambiental (diminuição de agrotóxicos)?"
      9. "Você executa ações de preservação (consumo consciente) na sua comunidade?"
      **C3:**
      10. "Você apoia campanhas de vacinação (poliomielite, febre amarela)?"
      11. "Você relaciona condições de saúde com falta de prevenção no trabalho (LER/DORT)?"
      12. "Você percebe doenças genéticas ou adquiridas por hábitos (diabetes)?"
      13. "Você demonstra como hábitos saudáveis influenciam a qualidade de vida?"
      **C4:**
      14. "Você identifica a importância da tecnologia nos processos industriais?"
      15. "Você relaciona o consumo descontrolado de matérias-primas com o impacto ambiental?"
      16. "Você avalia como as descobertas científicas melhoraram a qualidade de vida?"
      17. "Você entende a importância do controle de qualidade e EPI na indústria?"
      18. "Você identifica necessidades da comunidade que a indústria pode resolver?"
      **C5:**
      19. "Você descreve como uma indústria pode diminuir impactos (poluição do solo)?"
      20. "Você associa avanços tecnológicos ao bem-estar social (novos medicamentos)?"
      `;
    case 8:
      return `
      **ROTEIRO DO BLOCO 8 (FUNDAMENTAL): CIÊNCIAS HUMANAS**
      Faça UMA pergunta por vez:
      **C1:**
      1. "Você compreende que fotografias e documentos pessoais contam histórias?"
      2. "Você compreende que as tecnologias influenciam o comportamento e o consumo?"
      3. "Você descreve a herança cultural africana, indígena e europeia no Brasil?"
      4. "Você identifica por que a população se concentra no litoral e os motivos de migração?"
      5. "Você reconhece os patrimônios históricos do seu município e as ações de preservação?"
      **C2:**
      6. "Você identifica as relações de trabalho (patrão/empregado) e os sindicatos?"
      7. "Você identifica as mudanças nos direitos trabalhistas do passado para hoje?"
      8. "Você explica como celular e computador são ferramentas de trabalho (home office)?"
      9. "Você descreve o aumento da participação feminina no trabalho e o problema do trabalho infantil?"
      **C3:**
      10. "Você diferencia os serviços básicos (saúde, educação) entre centro e periferia?"
      11. "Você explica as mudanças com a chegada de uma empresa/escola em um bairro?"
      12. "Você reconhece a violência na internet (cyberbullying) e a violência física?"
      13. "Você percebe discriminação e preconceito (racismo, machismo) no dia a dia?"
      **C4:**
      14. "Você localiza no mapa o país, estado e cidade onde mora?"
      15. "Você identifica recursos naturais da sua região e como clima/solo afetam a agricultura?"
      16. "Você conhece as vantagens/desvantagens da gasolina e propõe energias alternativas?"
      17. "Você compreende que o crescimento residencial aumenta o consumo de água e lixo?"
      18. "Você diferencia a degradação ambiental no campo e na cidade, propondo sustentabilidade?"
      `;
    default:
      return "Faça perguntas abertas e acolhedoras.";
  }
}

// ==========================================
// ROTEIROS ESPECÍFICOS PARA O ENSINO MÉDIO
// ==========================================
function getRoteiroMedio(aba) {
  switch (Number(aba)) {
    case 1:
      return `
      **ROTEIRO DO BLOCO 1 (MÉDIO): HISTÓRIA DE VIDA**
      Faça UMA pergunta por vez:
      1. "De onde venho / Como fui...?" 
      2. "Quem sou / Como sou...?" 
      3. "Estou aqui porque / O que eu espero...?" 
      4. "Como serei / Amanhã me vejo...?" 
      5. "Tenho dúvidas sobre...?" 
      6. "Para mim, reconhecimento de saberes é...?" 
      `;
    case 2:
      return `
      **ROTEIRO DO BLOCO 2 (MÉDIO): TEMPO LIVRE**
      Faça UMA pergunta por vez:
      1. "O que eu mais gosto de fazer?"
      2. "O que não gosto de fazer?"
      3. "Se eu tivesse mais tempo, me dedicaria a...?"
      4. "Gasto a maior parte do meu tempo livre...?"
      `;
    case 3:
      return `
      **ROTEIRO DO BLOCO 3 (MÉDIO): ATIVIDADES SOCIAIS**
      Faça UMA pergunta por vez:
      1. "Você participa de alguma associação? (Desportiva, Cultural, Religiosa, Filantrópica, Profissional, Recreativa)"
      2. "O que aprendi e conservo até hoje?"
      3. "Exerço alguma atividade filantrópica?"
      4. "Participo de modo responsável e cívico na vida da comunidade?"
      5. "Ajudo no diálogo e entendimento entre as pessoas?"
      6. "Participo de questões educacionais?"
      7. "Colaboro na defesa da saúde pública?"
      8. "Assumo responsabilidades em problemas sociais?"
      9. "Participo de iniciativas em defesa dos direitos?"
      10. "Coordeno projetos ou atividades?"
      11. "Adapto-me a situações novas e inesperadas?"
      12. "Tento compreender o ponto de vista dos outros?"
      13. "Relaciono-me no trabalho cumprindo as normas?"
      14. "Cumpro as regras de higiene e segurança no trabalho?"
      15. "Recorro a instituições no uso dos meus direitos?"
      16. "Sou sindicalizado e conheço meus direitos?"
      17. "Trabalho em equipe cooperativamente?"
      `;
    case 4:
      return `
      **ROTEIRO DO BLOCO 4 (MÉDIO): EXPERIÊNCIA PROFISSIONAL**
      1. Primeiro, pergunte: "Você tem experiência profissional?"
      2. Se a resposta for "NÃO", pule para o próximo bloco.
      3. Se a resposta for "SIM", pergunte sobre a primeira experiência: Data de Admissão/Demissão, Profissão, Empresa, Atividades, Motivos de Satisfação, Motivos de Insatisfação, O que aprendeu.
      `;
    case 5:
      return `
      **ROTEIRO DO BLOCO 5 (MÉDIO): LINGUAGENS**
      Faça UMA pergunta por vez:
      **C1:**
      1. "Você já precisou ler e compreender diferentes textos do dia a dia (redes sociais, placas, relatórios, receitas, bulas)?"
      2. "Você já precisou identificar pessoas e direcionar textos escritos/falados em Língua Portuguesa ou Estrangeira?"
      3. "Você já precisou ler, escrever ou falar palavras em Língua Estrangeira no seu contexto?"
      4. "Você costuma respeitar manifestações culturais (danças, músicas, grafite, religiões)?"
      5. "Você já organizou algum evento cultural?"
      **C2:**
      6. "Você já precisou produzir textos (relatório, e-mail, relatos)?"
      7. "Você já precisou ler notícias, artigos, e-mails, considerando a função social?"
      8. "Você já precisou perceber mensagens indiretas para não gerar ofensa?"
      9. "Você já identificou a presença de um texto dentro de outro (intertextualidade)?"
      10. "Você já precisou usar conectivos para dar coerência a um texto?"
      **C3:**
      11. "Você já precisou passar uma informação ao público falando, escrevendo ou com slides?"
      12. "Você já precisou identificar sentidos em embalagens, relatórios ou gráficos no trabalho?"
      13. "Você já precisou escolher o meio de comunicação (verbal/não verbal) para passar uma mensagem?"
      14. "Você já precisou perceber diferentes culturas e classes sociais pelas ações das personagens?"
      15. "Você já precisou trabalhar em equipe colaborativamente (oficinas, dança, teatro)?"
      **C4:**
      16. "Você já compartilhou dicas de sustentabilidade na internet?"
      17. "Você já usou aplicativos e ferramentas tecnológicas para entender mudanças sociais?"
      18. "Você já presenciou ou sofreu cyberbullying? Como lidou?"
      **C5:**
      19. "Você já precisou reconhecer informações no campo da arte?"
      20. "Você já produziu alguma forma de arte ligada à sua realidade e cultura local?"
      `;
    case 6:
      return `
      **ROTEIRO DO BLOCO 6 (MÉDIO): MATEMÁTICA**
      Faça UMA pergunta por vez:
      **C1:**
      1. "Você já precisou identificar tipos de números (troco, temperatura, extrato bancário)?"
      2. "Você já resolveu situações com saldo positivo/negativo (dívidas, contas divididas)?"
      3. "Você já precisou calcular metragem real com base em planta baixa (escala 1:100)?"
      4. "Você já precisou calcular dias necessários para produzir um lote?"
      **C2:**
      5. "Você já precisou medir lados de um espaço retangular e calcular o perímetro?"
      6. "Você compreende a diferença entre área (m²) e volume (m³) em uma construção?"
      7. "Você já identificou formas tridimensionais (caixa de sapatos) e bidimensionais?"
      8. "Você já precisou estimar a altura de um prédio observando o ângulo?"
      9. "Você já precisou calcular a altura de um muro usando Teorema de Pitágoras?"
      10. "Você já usou GPS para determinar posições e distâncias?"
      11. "Você compreende como a trigonometria está presente em ondas eletromagnéticas e construção civil?"
      **C3:**
      12. "Você já precisou diluir suco concentrado (500ml em 2L de água)?"
      13. "Você já escreveu sequências de anos (Copa, Olimpíadas, eleições)?"
      14. "Você já escreveu uma expressão algébrica (litros de combustível e preço)?"
      15. "Você já precisou identificar capacidade de armazenamento (4Mb, 8Mb, 16Mb, 32Mb)?"
      16. "Você já calculou uma dívida com juros simples e compostos?"
      **C4:**
      17. "Você já precisou determinar maneiras de uma moeda cair (cara/coroa) em 4 jogadas?"
      18. "Você já precisou descobrir combinações de sorvete (5 bolas, 8 sabores)?"
      19. "Você já precisou descobrir a probabilidade de sortear uma carta de ouro em um baralho?"
      **C5:**
      20. "Você já precisou comparar taxa de desemprego Brasil/mundo em um gráfico?"
      21. "Você já precisou identificar a menor fatia em um gráfico de setores?"
      22. "Você já precisou calcular média, moda e mediana de salários?"
      23. "Você já construiu uma tabela de gastos mensais?"
      `;
    case 7:
      return `
      **ROTEIRO DO BLOCO 7 (MÉDIO): CIÊNCIAS DA NATUREZA**
      Faça UMA pergunta por vez:
      **C1:**
      1. "Você já precisou interpretar textos e mídias (rótulos, propagandas)?"
      2. "Você compreende o uso de transportes alternativos (bicicleta, ônibus) para reduzir gases tóxicos?"
      3. "Você já precisou diferenciar notícias científicas de fake news?"
      4. "Você já colaborou com coleta de resíduos sólidos e reciclagem?"
      5. "Você já precisou interpretar informações científicas em manuais, revistas e jornais?"
      **C2:**
      6. "Você consegue explicar os tipos de poluição (água, ar, solo)?"
      7. "Você já debateu sobre a poluição no seu bairro e as consequências para a saúde?"
      8. "Você já defendeu propostas de recuperação ambiental (diminuição de agrotóxicos)?"
      9. "Você executa ações de preservação (consumo consciente) na sua comunidade?"
      **C3:**
      10. "Você apoia campanhas de vacinação (poliomielite, febre amarela)?"
      11. "Você relaciona condições de saúde com falta de prevenção no trabalho (LER/DORT)?"
      12. "Você percebe doenças genéticas ou adquiridas por hábitos (diabetes)?"
      13. "Você demonstra como hábitos saudáveis influenciam a qualidade de vida?"
      **C4:**
      14. "Você identifica a importância da tecnologia nos processos industriais?"
      15. "Você relaciona o consumo descontrolado de matérias-primas com o impacto ambiental?"
      16. "Você avalia como as descobertas científicas melhoraram a qualidade de vida?"
      17. "Você entende a importância do controle de qualidade e EPI na indústria?"
      18. "Você identifica necessidades da comunidade que a indústria pode resolver?"
      **C5:**
      19. "Você descreve como uma indústria pode diminuir impactos (poluição do solo)?"
      20. "Você associa avanços tecnológicos ao bem-estar social (novos medicamentos)?"
      `;
    case 8:
      return `
      **ROTEIRO DO BLOCO 8 (MÉDIO): CIÊNCIAS HUMANAS**
      Faça UMA pergunta por vez:
      **C1:**
      1. "Você compreende que fotografias e documentos pessoais contam histórias?"
      2. "Você compreende que as tecnologias influenciam o comportamento e o consumo?"
      3. "Você descreve a herança cultural africana, indígena e europeia no Brasil?"
      4. "Você identifica por que a população se concentra no litoral e os motivos de migração?"
      5. "Você reconhece os patrimônios históricos do seu município e as ações de preservação?"
      **C2:**
      6. "Você identifica as relações de trabalho (patrão/empregado) e os sindicatos?"
      7. "Você identifica as mudanças nos direitos trabalhistas do passado para hoje?"
      8. "Você explica como celular e computador são ferramentas de trabalho (home office)?"
      9. "Você descreve o aumento da participação feminina no trabalho e o problema do trabalho infantil?"
      **C3:**
      10. "Você diferencia os serviços básicos (saúde, educação) entre centro e periferia?"
      11. "Você explica as mudanças com a chegada de uma empresa/escola em um bairro?"
      12. "Você reconhece a violência na internet (cyberbullying) e a violência física?"
      13. "Você percebe discriminação e preconceito (racismo, machismo) no dia a dia?"
      **C4:**
      14. "Você localiza no mapa o país, estado e cidade onde mora?"
      15. "Você identifica recursos naturais da sua região e como clima/solo afetam a agricultura?"
      16. "Você conhece as vantagens/desvantagens da gasolina e propõe energias alternativas?"
      17. "Você compreende que o crescimento residencial aumenta o consumo de água e lixo?"
      18. "Você diferencia a degradação ambiental no campo e na cidade, propondo sustentabilidade?"
      `;
    default:
      return "Faça perguntas abertas e acolhedoras.";
  }
}

export function getPromptSistema(segmento, aba) {
  const isMedio = segmento && segmento.toLowerCase().includes("médio");
  const matrizAtual = isMedio ? MATRIZ_MEDIO : MATRIZ_FUNDAMENTAL;
  const nomeSegmento = isMedio ? "Ensino Médio" : "Ensino Fundamental II (Anos Finais)";

  const roteiroBloco = isMedio ? getRoteiroMedio(aba) : getRoteiroFundamental(aba);

  return `
Você é o Tutor IA da Nova EJA (Reconhecimento de Saberes do SESI). 
O aluno está no Bloco ${aba} (de um total de 8 blocos). O segmento dele é: ${nomeSegmento}.

**DIRETRIZES DE APROFUNDAMENTO (SIGA O ROTEIRO ABAIXO À RISCA):**
${roteiroBloco}

**REGRAS CRÍTICAS DE CONDUÇÃO (SIGA À RISCA):**
1. POSTURA PROFISSIONAL E NEUTRA: Seja educado, mas não bajule o aluno. NÃO faça elogios excessivos. NÃO dê conselhos ou sugestões. Sua única função é fazer as perguntas e registrar as respostas.
2. APROFUNDAMENTO: Se o aluno der uma resposta curta, faça uma pergunta de acompanhamento para obter mais detalhes. 
3. TEMPO NO BLOCO: Faça TODAS as perguntas do roteiro (uma por vez) antes de permitir que o aluno encerre o bloco.
4. PROIBIÇÃO: A tag [FIM_BLOCO] SÓ pode ser emitida se o aluno disser textualmente que "não tem mais nada a acrescentar", "é só isso", "acabou", "pode passar" ou "quero ir para o próximo bloco".
5. EXTRAÇÃO: Sempre que o aluno relatar algo concreto, analise o verbo da habilidade SESI e emita a tag [MATRIZ: {"area": "...", "habilidade": "...", "justificativa": "Citar o trecho exato do relato do aluno"}]. 
6. NÃO INVENTE CÓDIGOS DA BNCC. Use APENAS os códigos (H1, H2, etc.) e os textos da Matriz SESI fornecida.
7. FECHAMENTO OBRIGATÓRIO: No Bloco 8, se o aluno disser que não tem mais nada, VOCÊ DEVE se despedir e emitir a tag [FIM_BLOCO].
8. NÃO PEÇA PARA O ALUNO CRIAR, FAZER OU PLANEJAR NADA. A sua única função é EXTRAIR o que ele já viveu.

AQUI ESTÁ A MATRIZ OFICIAL SESI QUE VOCÊ DEVE USAR:
${matrizAtual}
  `;
}
