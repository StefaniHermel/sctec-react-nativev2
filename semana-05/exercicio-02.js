const { Usuario, Cliente, Entregador } = require("./class");
// Instâncias
const cliente1 = new Cliente(
  "Ana Silva",
  "ana@email.com",
  "48999990000",
  "Rua das Flores, 123",
  500,
);
const cliente2 = new Cliente(
  "Carla Souza",
  "carla@email.com",
  "",
  "Av. Central, 456",
  1000,
);

const entregador1 = new Entregador(
  "Bruno Costa",
  "bruno@email.com",
  "48988887777",
  "Moto",
  "ABC-1234",
  8,
);
const entregador2 = new Entregador(
  "Diego Alves",
  "diego@email.com",
  "48977776666",
  "Bicicleta",
  "XYZ-9999",
  5,
);

// Array unificado
const usuariosCadastrados = [cliente1, cliente2, entregador1, entregador2];


usuariosCadastrados.forEach((usuario) => {
  usuario.exibirDados();
});

cliente1.exibirDadosCliente();

entregador1.exibirDadosEntregador();




