// ===================== IMPORTS =====================

// useState: ferramenta do React que cria "estados" (a memória do componente).
// Quando um estado muda, a tela é redesenhada automaticamente.
import { useState } from "react";

// Componentes do React Native. Eles substituem as tags do HTML:
// View = <div> | Text = <p> | TextInput = <input> | Pressable = <button>
// Switch = interruptor liga/desliga | StyleSheet = cria os estilos (parecido com CSS)
import {
  View,
  Text,
  TextInput,
  Switch,
  Pressable,
  StyleSheet,
} from "react-native";

// ===================== COMPONENTE =====================

// Todo componente é uma função que devolve (return) o que aparece na tela.
// "export default" permite que o Expo use esta função como tela principal.
export default function App() {
  // ---------- ESTADOS ----------

  // "form" guarda os quatro campos num único objeto (item 2 do exercício).
  // "setForm" é a única forma correta de alterar o "form".
  // Os valores iniciais são textos vazios.
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

  // ---------- FUNÇÕES ----------

  // Atualiza UM campo do formulário sem apagar os outros.
  // "campo" é o nome do campo ("nome", "email"...) e "valor" é o texto digitado.
  function atualizar(campo, valor) {
    // ...form  -> copia todos os campos atuais (se não copiar, os outros somem)
    // [campo]: valor -> troca só o campo escolhido (chave dinâmica)
    // Ex.: atualizar("email", "a") vira { nome: "Ana", email: "a", ... }
    setForm({ ...form, [campo]: valor });
  }

  // Roda quando o botão CADASTRAR é pressionado.
  function cadastrar() {
    // Template string (entre crases): o ${...} insere o valor da variável no texto.
    // A senha fica de fora de propósito, como pede o slide.
    setResultado(`✅ ${form.nome} | ${form.email} | ${form.telefone}`);
  }

  // ---------- TELA (o que aparece) ----------

  return (
    // View de fora: ocupa a tela toda e centraliza o card.
    <View style={styles.container}>
      {/* Card branco que agrupa o formulário */}
      <View style={styles.card}>
        {/* Todo texto precisa estar dentro de um <Text> */}
        <Text style={styles.titulo}>📝 Criar conta</Text>

        {/* CAMPO NOME */}
        <TextInput
          style={styles.input}
          placeholder="Nome" // texto cinza que aparece quando o campo está vazio
          autoCapitalize="words" // letra maiúscula no início de cada palavra
          value={form.nome} // o campo mostra o que está guardado no estado
          // A cada letra digitada, guarda o texto no estado.
          // Fluxo: digita -> onChangeText -> atualizar -> setForm -> tela redesenha
          onChangeText={(texto) => atualizar("nome", texto)}
        />

        {/* CAMPO E-MAIL */}
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          keyboardType="email-address" // teclado com @ e .
          autoCapitalize="none" // e-mail não começa com maiúscula
          value={form.email}
          onChangeText={(texto) => atualizar("email", texto)}
        />

        {/* CAMPO TELEFONE */}
        <TextInput
          style={styles.input}
          placeholder="Telefone"
          keyboardType="phone-pad" // teclado numérico de telefone
          maxLength={11} // máximo de 11 dígitos (DDD + número). Número usa chaves {}
          value={form.telefone}
          onChangeText={(texto) => atualizar("telefone", texto)}
        />

        {/* CAMPO SENHA */}
        <TextInput
          style={styles.input}
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

        {/* BOTÃO: Pressable é um botão personalizável.
            onPress é o equivalente do onClick do HTML. */}
        <Pressable style={styles.botao} onPress={cadastrar}>
          <Text style={styles.textoBotao}>CADASTRAR</Text>
        </Pressable>

        {/* RENDERIZAÇÃO CONDICIONAL: condição && elemento.
            O texto só aparece se "resultado" não estiver vazio. */}
        {resultado !== "" && <Text style={styles.resultado}>{resultado}</Text>}
      </View>
    </View>
  );
}

// ===================== ESTILOS =====================

// Parecido com CSS, mas: nomes em camelCase (backgroundColor, não background-color),
// números sem "px" e sem herança (o estilo de uma View não passa para o Text dentro dela).
// Todo View usa flexbox por padrão, com os itens um embaixo do outro (coluna).
const styles = StyleSheet.create({
  // Fundo da tela inteira
  container: {
    flex: 1, // ocupa toda a altura disponível
    backgroundColor: "#f2f2f2", // cinza claro
    justifyContent: "center", // centraliza na vertical
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