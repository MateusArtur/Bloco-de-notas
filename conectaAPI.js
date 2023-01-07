async function todasAnotacoes() {
    const conexao = await fetch("http://localhost:3000/anotacoes")
    const conexaoConvertida = await conexao.json()
    
    return conexaoConvertida
}

async function criaAnotacao(id, titulo, corpo){
    const conexao = await fetch("http://localhost:3000/anotacoes", {
        method: "POST",
        headers: {
            "Content-type": "application/json" 
        },
        body: JSON.stringify({
            id: id,
            titulo: titulo,
            corpo: corpo
        })
    })
    const conexaoConvertida = conexao.json()
    return conexaoConvertida
}

export const conectaAPI = {
    todasAnotacoes,
    criaAnotacao
}