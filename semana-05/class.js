class Usuario {
  constructor(nome, email, telefone) {
    this.nome = nome;
    this.email = email;
    this.telefone = telefone;

    if(telefone=== "" || !telefone) {
      this.telefone = "Telefone não informado";
    }else{
      this.telefone = telefone;
    }
  }

  exibirDados() {
    console.log(`Nome: ${this.nome}`);
    console.log(`Email: ${this.email}`);
    console.log(`Telefone: ${this.telefone}`);
  }
}

class Cliente extends Usuario {
  constructor(nome, email, telefone, endereco, limiteCredito) {
    super(nome, email, telefone);
    this.endereco = endereco;
    this.limiteCredito = limiteCredito;
  }

  calcularDesconto(valorCompra) {
    if (valorCompra > 100) {
      return valorCompra * 0.10;
    } else {
      return 0;
    }
  }

  exibirDadosCliente() {
    this.exibirDados();
    console.log(`Endereço: ${this.endereco}`);
    console.log(`Limite de Crédito: ${this.limiteCredito}`);
  }
}

class Entregador extends Usuario {
  constructor(nome, email, telefone, veiculo, placa, valorPorEntrega) {
    super(nome, email, telefone);
    this.veiculo = veiculo;
    this.placa = placa;
    this.valorPorEntrega = valorPorEntrega;
  }

  calcularGanhoDia(qtdeEntregas) {
    return qtdeEntregas * this.valorPorEntrega;
  }

  exibirDadosEntregador() {
    this.exibirDados();
    console.log(`Veículo: ${this.veiculo}`);
    console.log(`Placa: ${this.placa}`);
    console.log(`Ganho do dia (5 entregas): R$${this.calcularGanhoDia(5)}`);

      }
}
module.exports = { Usuario, Cliente, Entregador };