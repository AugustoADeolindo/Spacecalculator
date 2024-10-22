const buttons = document.getElementsByClassName('componentes')
const visor = document.getElementById('visor')

const arrayButtons = Array.from(buttons)

let inputAtual = ''
let operador = ''
let inputAntigo = ''

arrayButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        const value = event.target.dataset.num
        
        if (value === "CE"){ //Limpa o visor
            inputAtual = ''
            inputAntigo = ''
            operador = ''
        } else if (value === "<-") { // Exclui um valor do visor por vez
            inputAtual = inputAtual.slice(0, -1)
        } else if (value === "="){ // Realiza o calculo através da função calcular
            calcular()
        } else if ( value === "+" | value === "-" | value === "*" | value === "/" | value === "%"){ // Define o operador da conta
            operador = value
            inputAntigo = inputAtual
            inputAtual = ''
        }else{
            inputAtual += value 
        }

        visor.value = inputAtual
    })
})


function calcular(){
    const resultado = eval(inputAntigo + operador + inputAtual) // O eval permite a realização da conta, sem ele as strings seriam apenas concatenadas
    inputAtual = resultado
    inputAntigo = ''
    operador = ''
}