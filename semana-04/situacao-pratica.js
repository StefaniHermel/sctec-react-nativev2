const usuario = {
  nome: "Jorge",
  idade: 24,
  email: "jorge@email.com",
  cidade: "Florianopolis",
  profissao: "Desenvolvedor"

};
console.log(Object.keys(usuario));
console.log(Object.values(usuario));
Object.keys(usuario).forEach(chave => {
    console.log(`A chave ${chave} tem o valor ${usuario[chave]}`);
});
