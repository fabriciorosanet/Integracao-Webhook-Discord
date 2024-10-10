function sendToDiscord(webhookUrl, message, threadName) {
  if (!message || message.trim() === "") {
    Logger.log("Mensagem vazia. Não foi possível enviar ao Discord.");
    return;
  }

  var payload = JSON.stringify({
    content: message,
    thread_name: threadName // Adiciona o nome do tópico
  });

  var options = {
    method: 'post',
    contentType: 'application/json',
    payload: payload
  };

  try {
    var response = UrlFetchApp.fetch(webhookUrl, options);
    Logger.log(response.getContentText()); 
  } catch (e) {
    Logger.log("Erro ao enviar mensagem: " + e.toString());
  }
}  

// Webhooks
var webhooks = {

  //Passe seu webhook aqui
 
};

// Mensagem
var message = "@here\n" +
              "Olá, turma!\n\n" +
              "Viemos informar sobre a composição das notas para os cursos da Postech. A avaliação é composta pelos seguintes elementos:\n\n" +
              "CAPÍTULO III – DOS CRITÉRIOS DE AVALIAÇÃO E DE APROVAÇÃO\n\n" +
              "Artigo 10º - O desempenho do(a) estudante para avaliação e aprovação dar-se-á por meio de avaliação on-line e avaliação presencial.\n\n" +
              "§ 1º - A pontuação compor-se-á do seguinte critério:\n" +
              "I. Das atividades on-line em cada fase com valor de 0 a 90 pontos\n" +
              "i. Tech Challenge – Fases 1 a 4\n" +
              "ii. Hackathon – Fase 5 (o formato pode variar dependendo do curso: Datathon, Capture the Flag etc.)\n" +
              "II. Da avaliação presencial individual e obrigatória a ser agendada em qualquer um dos polos FIAP com valor de 0 a 10 pontos.\n\n" +
              "§ 2º - O cálculo da Nota Final (NF) levará em consideração o somatório dos dois processos avaliativos:\n\n" +
              "Atividades on-line (90) + Atividade presencial (10) = 100 pontos.\n\n" +
              "Dessa forma, o Tech Challenge vale 60 pontos e o Hackathon 30 pontos (lembrando que vocês terão apenas 1 Hackathon, cuja nota será válida para todas as disciplinas).\n\n" +
              "Equipe Comunidade Postech!";



// Nome do tópico (thread_name)
var threadName = "Composição da Nota"; // Defina o nome do tópico

// Webhooks selecionados
var selectedWebhooks = ["10SOAT", "8DTAT", "7NETT", "7CRTT","7CBTT","7ADJT","4MLET","4FSDT","4DVLT","4IADT","3DPMT","2FRNT"]; // Lista de webhooks selecionados

// Enviar mensagem para os webhooks selecionados
selectedWebhooks.forEach(function(nome) {
  if (webhooks[nome]) {
    sendToDiscord(webhooks[nome], message, threadName);
  } else {
    Logger.log("Webhook não encontrado para o nome: " + nome);
  }
});

//Clasp push para subir o código local - para a cloud do Google