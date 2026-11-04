class Animal {
  constructor(nome, idade, peso) {
    this.nome = nome;
    this.idade = idade;
    this.peso = peso;
  }

  //não é necessário utilizar a palavra-chave function, pois o JavaScript entende que tudo o que é declarado ali corresponde a um atributo ou a um método da classe
  //  ou
  dormir() {
    console.log(`${this.nome} está dormindo.`);
  }
}

const cachorro = new Animal("Bob", 5, 5);

cachorro.dormir();