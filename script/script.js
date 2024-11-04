// Selecionar o visor
const visor = document.getElementById('visor');

// Variáveis para armazenar valores e a operação
let valorAtual = '';
let valorAnterior = '';
let operador = '';

// Função para atualizar o visor
function atualizarVisor(valor) {
    visor.value = valor;
}

// Função para processar clique nos botões de número
function adicionarNumero(numero) {
    valorAtual += numero;
    atualizarVisor(valorAtual);
}

// Função para definir a operação
function definirOperacao(op) {
    if (valorAtual === '') return;  // Evitar definir operação sem número
    if (valorAnterior !== '') {
        calcular();  // Realizar cálculo se já houver uma operação
    }
    operador = op;
    valorAnterior = valorAtual;
    valorAtual = '';
}

// Função para calcular o resultado
function calcular() {
    let resultado;
    const numeroAnterior = parseFloat(valorAnterior);
    const numeroAtual = parseFloat(valorAtual);

    if (isNaN(numeroAnterior) || isNaN(numeroAtual)) return;

    switch (operador) {
        case 'adicao':
            resultado = numeroAnterior + numeroAtual;
            break;
        case 'subtracao':
            resultado = numeroAnterior - numeroAtual;
            break;
        case 'vezes':
            resultado = numeroAnterior * numeroAtual;
            break;
        case 'divisao':
            resultado = numeroAnterior / numeroAtual;
            break;
        case 'porcentagem':
            resultado = numeroAnterior * (numeroAtual / 100);
            break;
        default:
            return;
    }

    valorAtual = resultado;
    operador = '';
    valorAnterior = '';
    atualizarVisor(valorAtual);
}

// Função para apagar o último dígito
function apagarDigito() {
    valorAtual = valorAtual.slice(0, -1);
    atualizarVisor(valorAtual);
}

// Função para alternar sinal positivo/negativo
function alternarSinal() {
    if (valorAtual.startsWith('-')) {
        valorAtual = valorAtual.slice(1);
    } else {
        valorAtual = '-' + valorAtual;
    }
    atualizarVisor(valorAtual);
}

// Função para limpar o visor e os valores
function limpar() {
    valorAtual = '';
    valorAnterior = '';
    operador = '';
    atualizarVisor('');
}

// Adicionar eventos aos botões
document.querySelectorAll('.num').forEach(button => {
    button.addEventListener('click', () => adicionarNumero(button.dataset.num));
});

document.querySelectorAll('.ops').forEach(button => {
    const op = button.dataset.ops;

    button.addEventListener('click', () => {
        switch (op) {
            case 'apaga-digito':
                apagarDigito();
                break;
            case 'porcentagem':
                definirOperacao(op);
                calcular();
                break;
            case 'adicao':
            case 'subtracao':
            case 'vezes':
            case 'divisao':
                definirOperacao(op);
                break;
            case 'resultado':
                calcular();
                break;
            default:
                break;
        }
    });
});

document.getElementById('clear').addEventListener('click', limpar);

// Evento de teclado para números e operadores
document.addEventListener('keydown', (event) => {
    const key = event.key;

    if (!isNaN(key)) {  // Se a tecla for um número
        adicionarNumero(key);
    } else if (key === '+') {
        definirOperacao('adicao');
    } else if (key === '-') {
        definirOperacao('subtracao');
    } else if (key === '*') {
        definirOperacao('vezes');
    } else if (key === '/') {
        definirOperacao('divisao');
    } else if (key === 'Enter' || key === '=') {  // Enter ou igual para calcular
        calcular();
    } else if (key === 'Backspace') {  // Apagar último dígito
        apagarDigito();
    } else if (key === 'Escape') {  // Limpar tudo
        limpar();
    }
});
