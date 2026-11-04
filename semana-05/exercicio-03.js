class Notificacao {
  constructor(destinatario) {
    this.destinatario = destinatario;
  }

  enviar(mensagem) {
    console.log("Enviando notificação...");
  }
}

class Email extends Notificacao {
  constructor(destinatario) {
    super(destinatario);
  }

  enviar(mensagem) {
    console.log(`Enviando e-mail para ${this.destinatario}`);
    console.log(`Mensagem: ${mensagem}\n`);
  }
}

class SMS extends Notificacao {
  enviar(mensagem) {
    console.log(`Enviando SMS para ${this.destinatario}`);
    console.log(`Mensagem: ${mensagem}\n`);
  }
}

class PushNotification extends Notificacao {
  enviar(mensagem) {
    console.log(`Enviando Push Notification para ${this.destinatario}`);
    console.log(`Mensagem: ${mensagem}\n`);
  }
}

// Criação dos objetos
const email = new Email("João");
const sms = new SMS("Maria");
const push = new PushNotification("Carlos");

const notificacoes = [email, sms, push];

// Enviando a mesma mensagem para todos
notificacoes.forEach((notificacao) => {
  notificacao.enviar("Promoção disponível!");
});