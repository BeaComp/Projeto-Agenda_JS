var buttonAddEvento = document.getElementById('addEvento')
var buttonCancelaEvento = document.getElementById('cancelaEvento')
var novoEvento = document.getElementById('novoEvento')
var formNovoEvento = document.getElementById('formNovoEvento')
var inputNomeEvento = document.getElementById('nomeEvento')
var inputDataEvento = document.getElementById('dataEvento')
var divErro = document.getElementById('mensagemErro')
var tabEventos = document.getElementById('tabelaEventos')

var listaEventos = []

//Exemplo de evento
var eventoExemplo = {
    nome: 'Evento Exemplo',
    data: new Date()
}

listaEventos.push(eventoExemplo)

function removerEvento(event){
    var posicao = event.target.getAttribute('data-evento')
    listaEventos.splice(posicao, 1) //vai deletar o elemento
    atualizarTabelaEventos()
}

function atualizarTabelaEventos(){
    if(listaEventos.length === 0){
        tabEventos.innerHTML = '<tr><td colspan="3">Nenhum evento</td></tr>'
        return
    }

    tabEventos.innerText = '' //limpa antes de inserir os elementos

    //Inserindo os elementos na tabela
    for (const i in listaEventos) {
        var evento = listaEventos[i]
        var linha = document.createElement('tr') //linha
        var celulaNome = document.createElement('td')
        var celulaData = document.createElement('td')
        var celulaAcoes = document.createElement('td')
        var buttonRemover = document.createElement('button')
        buttonRemover.setAttribute('data-evento', i)
        buttonRemover.classList.add('btn')
        buttonRemover.classList.add('btn-danger')
        buttonRemover.classList.add('btn-sm')
        buttonRemover.addEventListener('click', removerEvento)
        celulaNome.innerText = evento.nome
        celulaData.innerText = evento.data
        buttonRemover.innerText = 'Remover'
        linha.appendChild(celulaNome) //colocar no final
        linha.appendChild(celulaData) //colocar no final
        linha.appendChild(celulaAcoes) //colocar no final
        celulaAcoes.appendChild(buttonRemover)
        tabEventos.appendChild(linha)
    }
}

buttonAddEvento.addEventListener('click', function adicionarEvento(event){
    novoEvento.classList.remove('d-none')
})

buttonCancelaEvento.addEventListener('click', ocultar)

function limpar(){
    inputNomeEvento.value = ''
    inputDataEvento.value = ''
    inputNomeEvento.classList.remove('is-invalid')
    inputDataEvento.classList.remove('is-invalid')
    divErro.classList.add('d-none')
    divErro.innerHTML = ''
}

function novoEventoValido(nomeEvento, dataEvento){
    var validacao = true
    var erro = ''
    //O nome do evento está vazio?
    if(nomeEvento.trim().length === 0){
        erro = 'O nome do evento é obrigatória!'
        inputNomeEvento.classList.add('is-invalid')
        validacao = false
    } else{
        inputNomeEvento.classList.remove('is-invalid')
    }

    var dataAtual = (new Date()).getTime()
    var timestampEvento = Date.parse(dataEvento)

   
    if(isNaN(timestampEvento) || timestampEvento < dataAtual){ //verifica se a data não está no passado
       if(erro.length > 0){
            erro += '<br>'
       }

        erro += 'A data do evento é obrigatória e deve estar no futuro!'
        inputDataEvento.classList.add('is-invalid')
        validacao = false
    } else{
        inputDataEvento.classList.remove('is-invalid')
    }
    
    if(!validacao){
        divErro.classList.remove('d-none')
        divErro.innerHTML = erro
    }

    return validacao
}

function ocultar(){
    novoEvento.classList.add('d-none')
    limpar()
}

formNovoEvento.addEventListener('submit', function salvarEvento(event){
    event.preventDefault() //evita que seja enviado para o formulário ao servidor
    var nomeEvento = inputNomeEvento.value
    var dataEvento = inputDataEvento.value //formato data
    
    if(novoEventoValido(nomeEvento, dataEvento)){
        console.log('Evento válido')
        listaEventos.push({
            nome: nomeEvento,
            data: new Date(dataEvento)
        })
        atualizarTabelaEventos()
        ocultar()
    } else{
        console.log('Evento Inválido')
    }
})

window.addEventListener('load', atualizarTabelaEventos)

