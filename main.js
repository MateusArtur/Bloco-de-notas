import { conectaAPI } from "./conectaAPI.js"
//variaveis
const listaDeAnotacao = document.querySelectorAll(".anotacao")
const elementoPai = document.querySelector(".blocos-anotacoes")
var contador = 0


//Deixar o botão adicionar anotação clicavel
function clicaNoBotao() {
    const botaoAdd = document.getElementById('botao-adiciona')
    botaoAdd.addEventListener("click", (evento) => {
        if(evento){
            contador += 1
            criaElementoNota(contador)
            botaoAdd.classList.add("esconde-item")
            if(listaDeAnotacao != 0){
                listaDeAnotacao.forEach( (elemento) => {
                    elemento.classList.add("esconde-item")
                })
            }
            
        }
    })         
}


/*Quando clicar no botao abrir um formulario com dois inputs, 
um text e outro textarea e armazenar os valores dos iput em variavel*/
//Criar um elemento Div com a class anotacao
function criaElementoNota(contador){
    elementoPai.innerHTML += `
    <div id="${contador}" class="visualizar-anotacao">
        <input type="text" class="titulo"></input>
        <textarea class="area-texto"></textarea>
        <button class="salvar" id="salvar">Salvar</button>
    </div>
    `
    salva()
}

function salva(){
    const botaoSalvar = document.querySelectorAll("#salvar")
    const volta = document.querySelector(".visualizar-anotacao")
    const botaoAdd = document.getElementById('botao-adiciona')

    for (let i = 0; i < botaoSalvar.length; i++) {
        botaoSalvar[i].addEventListener("click", () => {
            volta.classList.add("esconde-item")
            direcionadorAnotacao(contador)
            botaoAdd.classList.remove("esconde-item")
        })  
    }
}

//Inserir os valores capturados do input no h2 e paragrafo da anotação
function direcionadorAnotacao(contador) {
    var titulo = document.querySelector(".titulo").value
    var corpo = document.querySelector("textarea").value
    var id = document.getElementById(contador.value)
    enviaAnotacao(id, titulo, corpo)
}

async function enviaAnotacao(id, titulo, corpo) {
    await conectaAPI.criaAnotacao(id, titulo, corpo)
}

async function buscaDados() {
    const anotacoesAPI = await conectaAPI.todasAnotacoes();
    anotacoesAPI.forEach(elemento => {
        const id = elemento.id
        const titulo = elemento.titulo 
        const corpo = elemento.corpo
        
        elementoPai.innerHTML += `
            <div  id=${id} class="anotacao">
                <h2>${titulo}</h2>
                <p>${corpo}</p>
            </div>
            `
    })
}


//Agora queremos fazer algo com a anotação]

/*Ao clicar na anotação teremos três opções, 
   - Visualizar
   - Editar
   - Adicionar a uma pasta
   - Excluir 
*/

//Vamos visualizar, primeiramente

/*quando clicar na anotação aparecerá um menu com a opção visualizar, e ao clicar sobre ela irá esconder
 o item de adicionar anotação com a class esconde-item e troca a class da anotacao por visualizar-anotacao*/



 //para retornar a class normal da anotação adicionar um botao fechar na parte debaixo da anotação
 //Ao clicar nesse botao, a class visualizar-anotacao será substituida pela class anotacao
 //tambem será trocado a classs do botao de adicionar, voltará a class botao-adiciona-nota


 //Agora vamos adicionar a uma pasta
//Primeiro criaremos um array das pastas

 /*Se clicado no botao de adicionar a uma pasta, será verificado se já existe alguma pasta
se existir, aparecerão os nomes em formato de botao clicavel no form, se clicado no botão
será buscado o array desejado dento do array de arrays, e  será adicionado o elemento em 
uma posicao desse array desejado.
    Se não tiver a pasta que deseja adicionar, terá um botão de adicionar pasta, esse abribrá um input
perguntando o nome da pasta, ao colocar e salvar, apasta aparecerá na lista de pastas, e seguirá a 
mesma lógica de adicionar ao array desejado*/

//Agora vamos excluir a anotacao

//No menu, ao clicar em excluir, será consultado o elemento por meio de variavel e usando o remove será excluido


//caso deseja cancelar a ação, se clicar em qualquer lugar da tela diferente do elemento ele será desselecionado



//Chamando funções
clicaNoBotao()
buscaDados()