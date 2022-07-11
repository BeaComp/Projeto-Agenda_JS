var buttonAddEvento = document.getElementById('addEvento')
var buttonCancelaEvento = document.getElementById('cancelaEvento')
var novoEvento = document.getElementById('novoEvento')
var formNovoEvento = document.getElementById('formNovoEvento')

buttonAddEvento.addEventListener('click', function adicionarEvento(event){
    novoEvento.classList.remove('d-none')
})

buttonCancelaEvento.addEventListener('click', function cancelarEvento(){
    novoEvento.classList.add('d-none')
})

formNovoEvento.addEventListener('submit', function salvarEvento(event){
    event.preventDefault() //evita que seja enviado para o formulário ao servidor
})
