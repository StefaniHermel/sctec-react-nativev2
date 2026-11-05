// ===================== IMPORTS =====================

// useState: ferramenta do React que cria "estados" (a memória do componente).
// Quando um estado muda, a tela é redesenhada automaticamente.
import { useState } from "react";

// StatusBar: controla a barra de status do celular (a faixa de cima, com hora,
// bateria e sinal). Vem do pacote "expo-status-bar", que o template já instala.
import { StatusBar } from "expo-status-bar";

// Componentes do React Native. Eles substituem as tags do HTML:
// View = <div> | Text = <p> | TextInput = <input> | Pressable = <button>
// Switch = interruptor liga/desliga | ScrollView = tela com rolagem
// StyleSheet = cria os estilos (parecido com CSS)
import {
  View,
  Text,
  TextInput,
  Switch,
  Pressable,
  ScrollView,
  StyleSheet,
} from "react-native";

// ===================== COMPONENTE =====================

// Todo componente é uma função que devolve (return) o que aparece na tela.
// "export default" permite que o Expo use esta função como tela principal.
export default function App() {
  // ---------- ESTADOS ----------

  // "form" guarda os quatro campos num único objeto (item 2 do exercício).
  // "setForm" é a única forma correta de alterar o "form".
  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    senha: "",
  });

  // Controla o Switch "Mostrar senha": false = senha escondida, true = senha visível.
  const [mostrarSenha, setMostrarSenha] = useState(false);

  // Guarda o texto que aparece embaixo do botão depois de cadastrar.
  // Começa vazio, então nada aparece no início.
  const [resultado, setResultado] = useState("");

  // Guarda a mensagem de erro. "" (vazio) significa que não há erro.
  const [erro, setErro] = useState("");

  // Guarda QUAL campo está com erro: "nome", "email", "telefone" ou "senha".
  // "" (vazio) significa que nenhum campo está com erro.
  // É ele que decide qual campo ganha a borda vermelha.
  const [campoErro, setCampoErro] = useState("");

  // ---------- FUNÇÕES ----------

  // Atualiza UM campo do formulário sem apagar os outros.
  // "campo" é o nome do campo ("nome", "email"...) e "valor" é o texto digitado.
  function atualizar(campo, valor) {
    // ...form  -> copia todos os campos atuais (se não copiar, os outros somem)
    // [campo]: valor -> troca só o campo escolhido (chave dinâmica)
    setForm({ ...form, [campo]: valor });

    // Ao voltar a digitar, a mensagem de erro e a borda vermelha somem.
    setErro("");
    setCampoErro("");
  }

  // Roda quando o botão CADASTRAR é pressionado.
  function cadastrar() {
    // Limpa o resultado antigo antes de conferir de novo.
    setResultado("");

    // O if confere os campos EM ORDEM. Quando um deles falha, mostra a mensagem,
    // marca QUAL campo falhou e o resto do else if nem é lido.

    // .trim() tira os espaços das pontas, para "   " não valer como nome.
    if (form.nome.trim().length < 3) {
      setErro("Digite seu nome (mínimo 3 letras).");
      setCampoErro("nome");

      // .includes("@") confere se o texto tem um @.
      // O "!" na frente inverte, então a condição é "NÃO tem @".
    } else if (!form.email.includes("@")) {
      setErro("Digite um e-mail válido.");
      setCampoErro("email");

      // Telefone com DDD tem 10 (fixo) ou 11 (celular) números.
      // O máximo de 11 já vem do maxLength, então só conferimos o mínimo.
    } else if (form.telefone.length < 10) {
      setErro("Digite o telefone com DDD (10 ou 11 números).");
      setCampoErro("telefone");

      // Senha com pelo menos 6 caracteres.
    } else if (form.senha.length < 6) {
      setErro("A senha precisa ter pelo menos 6 caracteres.");
      setCampoErro("senha");

      // O else só roda se NENHUM dos erros acima aconteceu = tudo certo.
    } else {
      setErro("");
      setCampoErro("");

      // 1) PRIMEIRO monta o resultado com o que está no formulário agora.
      //    Template string (entre crases): o ${...} insere o valor da variável no texto.
      //    A senha fica de fora de propósito, como pede o slide.
      setResultado(
        `✅ ${form.nome.trim()} | ${form.email.trim()} | ${form.telefone}`
      );

      // 2) DEPOIS limpa o formulário, voltando ao estado inicial.
      //    Como cada TextInput tem value={form.xxx}, os campos ficam vazios na tela.
      //    A ordem importa: se limpasse antes, o resultado sairia vazio.
      setForm({
        nome: "",
        email: "",
        telefone: "",
        senha: "",
      });

      // 3) Desliga o Switch, para a senha voltar a ficar escondida.
      setMostrarSenha(false);
    }
  }

  // ---------- TELA (o que aparece) ----------

  return (
    // ScrollView: tela com rolagem. Ela abre aqui e só fecha no FINAL do return.
    // style: estilo do "recipiente" (ocupa a tela toda, com o fundo cinza).
    // contentContainerStyle: estilo do CONTEÚDO que fica dentro e rola.
    // keyboardShouldPersistTaps="handled": permite tocar no botão com o teclado
    //   aberto, sem precisar fechar o teclado antes.
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.conteudo}
      keyboardShouldPersistTaps="handled"
    >
      {/* StatusBar: style define a cor dos ícones da barra de cima do celular.
          "dark"  = ícones escuros (bom para fundo claro)
          "light" = ícones claros (bom para fundo escuro)
          Não aparece no navegador, só no celular. */}
      <StatusBar style="dark" />

      {/* Card branco que agrupa o formulário */}
      <View style={styles.card}>
        {/* Todo texto precisa estar dentro de um <Text> */}
        <Text style={styles.titulo}>📝 Criar conta</Text>

        {/* CAMPO NOME */}
        <TextInput
          // style com lista [ ]: o segundo item só vale se a condição for verdadeira.
          // Se campoErro for "nome", aplica a borda vermelha.
          style={[styles.input, campoErro === "nome" && styles.inputErro]}
          placeholder="Nome" // texto cinza que aparece quando o campo está vazio
          autoCapitalize="words" // letra maiúscula no início de cada palavra
          value={form.nome} // o campo mostra o que está guardado no estado
          // A cada letra digitada, guarda o texto no estado.
          // Fluxo: digita -> onChangeText -> atualizar -> setForm -> tela redesenha
          onChangeText={(texto) => atualizar("nome", texto)}
        />

        {/* CAMPO E-MAIL */}
        <TextInput
          style={[styles.input, campoErro === "email" && styles.inputErro]}
          placeholder="E-mail"
          keyboardType="email-address" // teclado com @ e .
          autoCapitalize="none" // e-mail não começa com maiúscula
          value={form.email}
          onChangeText={(texto) => atualizar("email", texto)}
        />

        {/* CAMPO TELEFONE */}
        <TextInput
          style={[styles.input, campoErro === "telefone" && styles.inputErro]}
          placeholder="Telefone"
          keyboardType="phone-pad" // teclado numérico de telefone
          maxLength={11} // máximo de 11 dígitos (DDD + número). Número usa chaves {}
          value={form.telefone}
          // .replace(/\D/g, "") apaga tudo que NÃO for número (\D = não dígito).
          // No celular o teclado já é numérico, mas no navegador dá para digitar
          // letras. Assim o campo só aceita números nos dois casos.
          onChangeText={(texto) => atualizar("telefone", texto.replace(/\D/g, ""))}
        />

        {/* CAMPO SENHA */}
        <TextInput
          style={[styles.input, campoErro === "senha" && styles.inputErro]}
          placeholder="Senha"
          // O "!" inverte o valor:
          // mostrarSenha false -> !false = true  -> senha escondida
          // mostrarSenha true  -> !true  = false -> senha visível
          secureTextEntry={!mostrarSenha}
          autoCapitalize="none"
          value={form.senha}
          onChangeText={(texto) => atualizar("senha", texto)}
        />

        {/* DESAFIO EXTRA: linha com o Switch e o texto lado a lado */}
        <View style={styles.linhaSwitch}>
          {/* value: se está ligado | onValueChange: recebe true/false quando a pessoa toca.
              Como setMostrarSenha já recebe um valor, dá para passar direto. */}
          <Switch value={mostrarSenha} onValueChange={setMostrarSenha} />
          <Text style={styles.textoSwitch}>Mostrar senha</Text>
        </View>

        {/* MENSAGEM DE ERRO: renderização condicional (condição && elemento).
            Só aparece se "erro" não estiver vazio. */}
        {erro !== "" && <Text style={styles.textoErro}>{erro}</Text>}

        {/* BOTÃO: Pressable é um botão personalizável.
            onPress é o equivalente do onClick do HTML. */}
        <Pressable style={styles.botao} onPress={cadastrar}>
          <Text style={styles.textoBotao}>CADASTRAR</Text>
        </Pressable>

        {/* RESULTADO: só aparece se "resultado" não estiver vazio.
            Ele fica num estado separado do "form", por isso continua na tela
            mesmo depois que o formulário é limpo. */}
        {resultado !== "" && <Text style={styles.resultado}>{resultado}</Text>}
      </View>
      {/* ↑ fecha o card (View) */}
    </ScrollView>
    // ↑ fecha a tela (ScrollView). Regra: a última tag aberta é a primeira a fechar.
  );
}

// ===================== ESTILOS =====================

// Parecido com CSS, mas: nomes em camelCase (backgroundColor, não background-color),
// números sem "px" e sem herança (o estilo de uma View não passa para o Text dentro dela).
// Todo View usa flexbox por padrão, com os itens um embaixo do outro (coluna).
const styles = StyleSheet.create({
  // Fundo da tela inteira (o "recipiente" do ScrollView)
  container: {
    flex: 1, // ocupa toda a altura disponível
    backgroundColor: "#f2f2f2", // cinza claro
  },

  // Conteúdo que rola: centraliza o card e dá o espaço nas bordas.
  // No ScrollView, justifyContent e padding ficam aqui (contentContainerStyle).
  conteudo: {
    flexGrow: 1, // ocupa pelo menos a tela toda, e cresce se o conteúdo for maior
    justifyContent: "center", // centraliza na vertical quando sobra espaço
    padding: 20, // espaço interno nas bordas
  },

  // Caixa branca do formulário
  card: {
    backgroundColor: "#fff",
    borderRadius: 12, // cantos arredondados
    padding: 20,
    elevation: 3, // sombra (Android)
  },

  // Título "Criar conta"
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16, // espaço embaixo
  },

  // Aparência dos quatro campos de digitação
  input: {
    borderWidth: 1, // espessura da borda
    borderColor: "#999",
    borderRadius: 6,
    padding: 10,
    marginBottom: 12,
  },

  // Borda vermelha para o campo com erro.
  // Na lista style={[styles.input, styles.inputErro]}, o último vence:
  // só a cor e a espessura da borda mudam, o resto do "input" continua igual.
  inputErro: {
    borderColor: "#d32f2f",
    borderWidth: 2,
  },

  // Linha do Switch: itens lado a lado
  linhaSwitch: {
    flexDirection: "row", // muda de coluna para linha
    alignItems: "center", // alinha o Switch e o texto na vertical
    marginBottom: 12,
  },

  // Espaço entre o Switch e o texto "Mostrar senha"
  textoSwitch: {
    marginLeft: 8,
  },

  // Mensagem de erro em vermelho, acima do botão
  textoErro: {
    color: "#d32f2f",
    fontSize: 13,
    marginBottom: 12,
  },

  // Botão azul
  botao: {
    backgroundColor: "#1e88e5",
    padding: 12,
    borderRadius: 6,
    alignItems: "center", // centraliza o texto do botão na horizontal
  },

  // Texto branco e em negrito dentro do botão
  textoBotao: {
    color: "#fff",
    fontWeight: "bold",
  },

  // Texto do resultado embaixo do botão
  resultado: {
    marginTop: 16,
    fontSize: 14,
  },
});