const banco = pegarInformacoesDoBanco()

var nomeDigitado
var idadeDigitada
var cpfDigitado
var senhaDigitada
var emailDigitado
var confirmacaoSenha
var errosList = []

function efetuarCadastro() {
  if (errosList.length == 0 && nomeDigitado && idadeDigitada
     && cpfDigitado && senhaDigitada && emailDigitado) {
    const novaConta = {
      nomeDigitado,
      idadeDigitada,
      cpfDigitado,
      senhaDigitada,
      emailDigitado
    }
    const resposta = salvarConta(novaConta)
    if(resposta.conta){
      document.getElementById("form").classList.add("hide")
      document.getElementById("sucesso").classList.remove("hide")
      document.getElementById("agenciaDaConta").innerHTML = ("0000" + resposta.agencia.numero).slice(-4) 
      document.getElementById("numeroDaConta").innerHTML = ("0000" + resposta.conta.numero).slice(-4)
    }else{
      alert(resposta)
    }
  }
}

function irParaLogin() {
  window.location.href = "../index.html"
}

function validarNome() {
  nomeDigitado = document.getElementById("nome").value
  if (nomeDigitado.length <= 2) {
    document.getElementById("nomeError").innerHTML = "Nome inválido, digite novamente"
    errosList.push("nome")
  } else {
    errosList = errosList.filter(erro => erro != "nome")
    document.getElementById("nomeError").innerHTML = ""
  }
}

function validarIdade() {
  idadeDigitada = document.getElementById("idade").value
  if (idadeDigitada < 18) {
    document.getElementById("idadeError").innerHTML = "Idade inválido, digite novamente"
    errosList.push("idade")
  } else {
    errosList = errosList.filter(erro => erro != "idade")
    document.getElementById("idadeError").innerHTML = ""
  }
}


function validarCpf() {
  cpfDigitado = document.getElementById("cpf").value
  var contaEncontrada
  banco.agencias.forEach(agencia => {
    agencia.contas.forEach(conta => {
      if (conta.usuario.cpf == cpfDigitado) {
        contaEncontrada = conta
      }
    })
  })
  if (contaEncontrada) {
    document.getElementById("cpfError").innerHTML = "CPF ja cadastrado, digite novamente"
    errosList.push("cpf")
  } else {
    errosList = errosList.filter(erro => erro != "cpf")
    document.getElementById("cpfError").innerHTML = ""
  }
}

function validarEmail() {
  emailDigitado = document.getElementById("email").value
  var contaEncontrada
  banco.agencias.forEach(agencia => {
    agencia.contas.forEach(conta => {
      if (conta.usuario.email == emailDigitado) {
        contaEncontrada = conta
      }
    })
  })

  if (contaEncontrada) {
    document.getElementById("emailError").innerHTML = "Email Inválido, digite novamente"
    errosList.push("email")
  } else {
    errosList = errosList.filter(erro => erro != "email")
    document.getElementById("emailError").innerHTML = ""
  }
}

function validarSenha() {
  senhaDigitada = document.getElementById("senha").value
  confirmacaoSenha = document.getElementById("confirmacaoSenha").value
  if (senhaDigitada !== confirmacaoSenha) {
    document.getElementById("confirmacaoSenhaError").innerHTML = "Senha inválida, digite novamente"
    errosList.push("senha")
  } else {
    errosList = errosList.filter(erro => erro != "senha")
    document.getElementById("confirmacaoSenhaError").innerHTML = ""
  }
}

