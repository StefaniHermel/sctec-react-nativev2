// ===================== IMPORTS =====================

// useState: ferramenta do React que cria "estados" (a memória do componente).
// Quando um estado muda, a tela é redesenhada automaticamente.
import { useState } from "react";

// StatusBar: controla a barra de status do celular (a faixa de cima, com hora,
// bateria e sinal). Ela vem do pacote "expo-status-bar", que o template já instala.
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

export default function App() {
  // ---------- ESTADOS ----------

  // "form" guarda os quatro campos num único objeto.
  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    senha: "",
  });

  // Controla o Switch "Mostrar senha": false = senha escondida, true = senha visível.
  const [mostrarSenha, setMostrarSenha] = useState(false);

  // Guarda o texto que aparece embaixo do botão depois de cadastrar.
  const [resultado, setResultado] = useState("");

  // NOVO: guarda as mensagens de erro de cada campo.
  // Começa como objeto vazio {} (nenhum erro). Depois fica assim, por exemplo:
  // { email: "Digite um e-mail válido.", senha: "A senha precisa de 6 caracteres." }
  const [erros, setErros] = useState({});

  // ---------- FUNÇÕES ----------

  // Atualiza UM campo do formulário sem apagar os outros.
  function atualizar(campo, valor) {
    // ...form copia os campos atuais; [campo]: valor troca só o campo escolhido.
    setForm({ ...form, [campo]: valor });

    // NOVO: assim que a pessoa volta a digitar num campo, o erro dele some.
    // Guardamos "undefined" (e não texto vazio) para o campo ficar sem erro.
    setErros({ ...erros, [campo]: undefined });
  }

  // NOVO: confere cada campo e devolve um objeto só com os campos que têm erro.
  // Se devolver um objeto vazio {}, o formulário está todo correto.
  function validar() {
    const novosErros = {};

    // NOME: .trim() tira os espaços das pontas, para "   " não valer como nome.
    if (form.nome.trim().length < 3) {
      novosErros.nome = "Digite seu nome (mínimo 3 letras).";
    }

    // E-MAIL: o padrão (regex) confere o formato texto@texto.texto
    // ^[^\s@]+  -> começo: qualquer coisa que não seja espaço nem @
    // @         -> precisa ter um @
    // [^\s@]+   -> depois do @, mais texto sem espaço nem @
    // \.        -> precisa ter um ponto
    // [^\s@]+$  -> e mais texto até o final (ex.: com, com.br)
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim());
    if (!emailValido) {
      novosErros.email = "Digite um e-mail válido. Ex.: ana@email.com";
    }

    // TELEFONE: DDD + número tem 10 dígitos (fixo) ou 11 (celular).
    // O limite de 11 já vem do maxLength, então só conferimos o mínimo.
    if (form.telefone.length < 10) {
      novosErros.telefone = "Digite o telefone com DDD (10 ou 11 números).";
    }

    // SENHA: mínimo de 6 caracteres.
    if (form.senha.length < 6) {
      novosErros.senha = "A senha precisa ter pelo menos 6 caracteres.";
    }

    return novosErros;
  }

  // Roda quando o botão CADASTRAR é pressionado.
  function cadastrar() {
    // 1) Confere o formulário e guarda os erros no estado (para aparecerem na tela).
    const novosErros = validar();
    setErros(novosErros);

    // 2) Object.keys(...) lista os campos com erro. Se tem algum, para aqui.
    //    O "return" encerra a função: o resultado NÃO é mostrado.
    if (Object.keys(novosErros).length > 0) {
      setResultado(""); // limpa um resultado antigo, se existir
      return;
    }

    // 3) Chegou aqui = tudo certo. Mostra o resumo (sem a senha, como pede o slide).
    setResultado(`✅ ${form.nome.trim()} | ${form.email.trim()} | ${form.telefone}`);
  }

  // ---------- TELA (o que aparece) ----------

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.conteudo}
      keyboardShouldPersistTaps="handled"
    >
      {/* StatusBar: "dark" = ícones escuros (bom para fundo claro).
          Não aparece no navegador, só no celular. */}
      <StatusBar style="dark" />

      {/* Card branco que agrupa o formulário */}
      <View style={styles.card}>
        <Text style={styles.titulo}>📝 Criar conta</Text>

        {/* CAMPO NOME */}
        <TextInput
          // NOVO: style com lista [ ]. O segundo estilo (borda vermelha) só vale
          // se existir erro. Sem erro, erros.nome é undefined e nada muda.
          style={[styles.input, erros.nome && styles.inputErro]}
          placeholder="Nome"
          autoCapitalize="words"
          value={form.nome}
          onChangeText={(texto) => atualizar("nome", texto)}
        />
        {/* NOVO: mensagem de erro. Só aparece se existir erro neste campo.
            Importante: aqui o valor é "undefined" (não ""), porque texto solto
            fora de um <Text> causa erro no React Native. */}
        {erros.nome && <Text style={styles.textoErro}>{erros.nome}</Text>}

        {/* CAMPO E-MAIL */}
        <TextInput
          style={[styles.input, erros.email && styles.inputErro]}
          placeholder="E-mail"
          keyboardType="email-address"
          autoCapitalize="none"
          value={form.email}
          onChangeText={(texto) => atualizar("email", texto)}
        />
        {erros.email && <Text style={styles.textoErro}>{erros.email}</Text>}

        {/* CAMPO TELEFONE */}
        <TextInput
          style={[styles.input, erros.telefone && styles.inputErro]}
          placeholder="Telefone"
          keyboardType="phone-pad"
          maxLength={11}
          value={form.telefone}
          // NOVO: .replace(/\D/g, "") apaga tudo que NÃO for número (\D = não dígito).
          // No celular o teclado já é numérico, mas no navegador dá para digitar
          // letras. Assim o campo só aceita números nos dois casos.
          onChangeText={(texto) => atualizar("telefone", texto.replace(/\D/g, ""))}
        />
        {erros.telefone && <Text style={styles.textoErro}>{erros.telefone}</Text>}

        {/* CAMPO SENHA */}
        <TextInput
          style={[styles.input, erros.senha && styles.inputErro]}
          placeholder="Senha"
          // O "!" inverte: mostrarSenha false -> senha escondida.
          secureTextEntry={!mostrarSenha}
          autoCapitalize="none"
          value={form.senha}
          onChangeText={(texto) => atualizar("senha", texto)}
        />
        {erros.senha && <Text style={styles.textoErro}>{erros.senha}</Text>}

        {/* DESAFIO EXTRA: linha com o Switch e o texto lado a lado */}
        <View style={styles.linhaSwitch}>
          <Switch value={mostrarSenha} onValueChange={setMostrarSenha} />
          <Text style={styles.textoSwitch}>Mostrar senha</Text>
        </View>

        {/* BOTÃO: onPress chama cadastrar, que agora valida antes de mostrar o resultado */}
        <Pressable style={styles.botao} onPress={cadastrar}>
          <Text style={styles.textoBotao}>CADASTRAR</Text>
        </Pressable>

        {/* RENDERIZAÇÃO CONDICIONAL: só aparece se "resultado" não estiver vazio. */}
        {resultado !== "" && <Text style={styles.resultado}>{resultado}</Text>}
      </View>
    </ScrollView>
  );
}

// ===================== ESTILOS =====================

const styles = StyleSheet.create({
  // Fundo da tela inteira (o "recipiente" do ScrollView)
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },

  // Conteúdo que rola: centraliza o card e dá o espaço nas bordas
  conteudo: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },

  // Caixa branca do formulário
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    elevation: 3,
  },

  // Título "Criar conta"
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },

  // Aparência dos quatro campos de digitação
  input: {
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 6,
    padding: 10,
    marginBottom: 12,
  },

  // NOVO: borda vermelha quando o campo tem erro.
  // Vem depois do "input" na lista, então sobrescreve só a cor da borda.
  inputErro: {
    borderColor: "#d32f2f",
  },

  // NOVO: mensagem de erro em vermelho, logo abaixo do campo.
  // marginTop negativo "puxa" a mensagem para perto do campo
  // (o campo tem marginBottom: 12, então o -8 deixa uns 4 de espaço).
  textoErro: {
    color: "#d32f2f",
    fontSize: 12,
    marginTop: -8,
    marginBottom: 12,
  },

  // Linha do Switch: itens lado a lado
  linhaSwitch: {
    flexDirection: "row",
    alignItems: "center",
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
    alignItems: "center",
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