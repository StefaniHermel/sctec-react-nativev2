async function buscarUsuarios() {
  const response = await fetch("https://dummyjson.com/users");
  const dados = await response.json();

  return dados.users;
}

async function main() {
  const usuarios = await buscarUsuarios();

  // ==========================
  // Exercício 1
  // Percorrer todos os usuários e exibir Nome, Idade e E-mail
  // ==========================

  
  usuarios.forEach(usuario => {
    console.log(`Nome: ${usuario.firstName} ${usuario.lastName}`);
    console.log(`Idade: ${usuario.age} anos`);
    console.log(`E-mail: ${usuario.email}`);
    console.log("----------------------------");
  });

  // ==========================
  // Exercício 2
  // Criar um novo array com o nome completo de cada usuário
  // ==========================

 
  const nomesCompletos = usuarios.map(usuario => {
    return `${usuario.firstName} ${usuario.lastName}`;
  });

  console.log(nomesCompletos);

 

 // exercicio 3 

  const maioresDe30anos = usuarios.filter(usuario => {
    return usuario.age >= 30;
  });
console.log(maioresDe30anos);

//exercicio 4
  
 const encontrarUsuario = usuarios.find(usuario => {
 return usuario.firstName === "Emily" });
console.log(encontrarUsuario);

//exercicio 5
const existeMenor = usuarios.some(usuario => usuario.age < 18);
  
  console.log(existeMenor ? "Existe usuário menor de idade." : "Não existe usuário menor de idade.");
  const todosEmailsPreenchidos = usuarios.every(usuario => usuario.email !== "");
 
  console.log(todosEmailsPreenchidos ? "Todos os e-mails estão preenchidos." 
    : "Nem todos os e-mails estão preenchidos.");

    //exercicio 6
  }
main();