salvarInformacoesDoBanco()
const banco = pegarInformacoesDoBanco()

const usuariLogado = pegarUsuarioLogado()

if(usuariLogado){
  window.location.href = "AreaDoCliente/index.html"
}


function criarConta() {
  window.location.href = "Cadastro/index.html"
}

function acessar() {
  var agenciaDigitada = document.getElementById("agencia").value
  var contaDigitada = document.getElementById("conta").value
  var senhaDigitada = document.getElementById("senha").value
  var agenciaEncontrada
  var contaEncontrada
  var erros = []

  agenciaEncontrada = banco.agencias.find(agencia => agenciaDigitada == agencia.numero)

  if (agenciaEncontrada == null) {
    erros.push({
      id: "agenciaError",
      message: "agencia não encontrada, digite novamente"
    })
  }

  contaEncontrada = agenciaEncontrada?.contas.find(conta => contaDigitada == conta.numero)

  if (contaEncontrada == null) {
    erros.push({
      id: "contaError",
      message: "conta não encontrada, digite novamente"
    })
  }

  if (senhaDigitada != contaEncontrada?.senha) {
    erros.push({
      id: "senhaError",
      message: "senha incorreta, digite uma senha valida"
    })
  }

  if (erros.length > 0) {
    erros.forEach(erro => {
      document.getElementById(erro.id).innerHTML = erro.message
      document.getElementById(erro.id.substring(0, erro.id.length - 5 )).classList.add("input-error")
    })
  } else {
    salvarDadosNoLocalStorage("usuario_logado", 
    {
      agencia: agenciaEncontrada,
      conta: contaEncontrada
    })
    window.location.href = "AreaDoCliente/index.html"
  }
}


