class ContaBancaria {
  titular = "";
  saldo = "";
  constructor(titular, saldo) {
    this.titular = titular;
    this.saldo = saldo;
  }
  depositar(valor) {
    this.saldo += valor;
  }

  sacar(valor) {
    this.saldo -= valor;
  }
}

const contaAna = new ContaBancaria("Ana", 100);
const contaBruno = new ContaBancaria("Bruno", 500);

contaAna.depositar(50);
contaAna.sacar(30);
contaBruno.depositar(200);
contaBruno.sacar(100);

console.log(contaAna);
console.log(contaBruno);

