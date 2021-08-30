function salvarInformacoesDoBanco() {
  const bancoAtual = pegarInformacoesDoBanco()
  if (!bancoAtual) {
    //criando as informaçoes do banco, utilizando as classes como modelo
    const usuario = new Usuario("Administração Banco GF", "123.456.789-10", "gf-admin@gmail.com", 38)
    const contas = [new Conta(0001, 1234, 100000000, usuario)]
    const agencias = [new Agencia(0001, contas)]
    const banco = new Banco("Internet Bank - GF", agencias)
    // salvando as informaçoes no localstorage
    salvarDadosNoLocalStorage("internet-bank-gf", banco)
  }
}

function salvarDadosNoLocalStorage(key, valor) {
  localStorage.setItem(key, JSON.stringify(valor))
}

function pegarInformacoesDoBanco() {
  try{
    const bancoEncontrado = JSON.parse(localStorage.getItem("internet-bank-gf"))
    return new Banco(bancoEncontrado.nome, bancoEncontrado.agencias);
  }catch(erro){
    console.log(erro)
    return null
  }
}

function criarAgencia(conta) {
  const bancoAtual = pegarInformacoesDoBanco()
  const novaAgencia = {
    numero: bancoAtual.agencias.length + 1,
    contas: [formatarConta(conta, 0001)]
  }
  bancoAtual.agencias.push(novaAgencia)
  salvarDadosNoLocalStorage("internet-bank-gf", bancoAtual)

  return{
    menssagem: "Cadastrado com sucesso!",
    conta: formatarConta(conta, 0001),
    agencia: novaAgencia
  }
}

function formatarConta(conta, numeroDaConta) {
  const novoUsuario = new Usuario(conta.nomeDigitado, conta.cpfDigitado, conta.emailDigitado, conta.idadeDigitada)
  const novaConta = new Conta(numeroDaConta, conta.senhaDigitada, 0, novoUsuario)
  return novaConta
}

function salvarConta(conta) {
  try {
    const bancoAtual = pegarInformacoesDoBanco()
    const ultimaAgencia = bancoAtual.agencias[bancoAtual.agencias.length - 1]
    listaDeContas = ultimaAgencia.contas

    if (listaDeContas.length == 9999) {
      return criarAgencia(conta)
    } else {
      bancoAtual.agencias[bancoAtual.agencias.length - 1].contas.push(formatarConta(conta, listaDeContas.length + 1))
      salvarDadosNoLocalStorage("internet-bank-gf", bancoAtual)
    }

    return {
      messagem: "Cadastrado com sucesso!",
      agencia: bancoAtual.agencias[bancoAtual.agencias.length - 1],
      conta: formatarConta(conta, listaDeContas.length)
    }
  } catch (error) {
    console.log(error)
    return "Ocorreu um erro ao finalizar o cadastro: " + error
  }
}

function pegarUsuarioLogado() {
  return JSON.parse(localStorage.getItem("usuario_logado")) 
}