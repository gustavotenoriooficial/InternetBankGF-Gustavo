const usuarioLogado = pegarUsuarioLogado()
var saldo = usuarioLogado.conta.saldo
const bancoAtual = pegarInformacoesDoBanco()
document.getElementById("nome").innerHTML = usuarioLogado.conta.usuario.nome
document.getElementById("saldo").innerHTML = saldo


var valorDigitado
var agenciaDigitada
var agenciaEncontrada
var contaDigitada
var contaEncontrada
var errosList = []

function sair() {
  localStorage.removeItem("usuario_logado")
  window.location.href = "../index.html"
}

function validarSaldo() {
  valorDigitado = parseFloat(document.getElementById("valor").value)
  if (valorDigitado > saldo) {
    document.getElementById("valorError").innerHTML = "Saldo insuficiente, tente novamente"
    errosList.push("saldo")
  } else {
    errosList = errosList.filter(erro => erro != "saldo")
    document.getElementById("valorError").innerHTML = ""
  }
}

function validarAgencia() {
  agenciaDigitada = document.getElementById("agencia").value
  agenciaEncontrada = bancoAtual.agencias.find(agencia => agencia.numero == agenciaDigitada)
  if (agenciaEncontrada == null) {
    document.getElementById("agenciaError").innerHTML = "Agencia não encontrada, tente novamente"
    errosList.push("agencia")
  } else {
    errosList = errosList.filter(erro => erro != "agencia")
    document.getElementById("agenciaError").innerHTML = ""
  }
}

function validarConta() {
  contaDigitada = document.getElementById("conta").value
  contaEncontrada = agenciaEncontrada?.contas.find(conta => contaDigitada == conta.numero)
  if (contaEncontrada == null) {
    document.getElementById("contaError").innerHTML = "Conta não encontrada, tente novamente"
    errosList.push("conta")
  } else {
    errosList = errosList.filter(erro => erro != "conta")
    document.getElementById("contaError").innerHTML = ""
  }
}

function transferir() {
  try{
    if (errosList.length == 0 && agenciaDigitada && contaDigitada && valorDigitado > 0) {
      bancoAtual.agencias.find(agencia => agencia.numero == usuarioLogado.agencia.numero)
        .contas.find(conta => conta.numero == usuarioLogado.conta.numero).saldo -= valorDigitado
  
      bancoAtual.agencias.find(agencia => agencia.numero == agenciaDigitada)
        .contas.find(conta => conta.numero == contaDigitada).saldo += valorDigitado
  
      salvarDadosNoLocalStorage("internet-bank-gf", bancoAtual)
      saldo -= valorDigitado
      document.getElementById("saldo").innerHTML = saldo
      usuarioLogado.conta.saldo = saldo
      salvarDadosNoLocalStorage("usuario_logado",usuarioLogado )
    }
    alert("Transferido com sucesso!")
  }catch(error){
    console.log(error)
    alert(error)
  }
}
