/*
Dados para cálculo do IMC - Índice de Massa Corporal
imc = peso / (altura * altura)

Abaixo de 17 - muito abaixo do peso
Entre 17 e 18,49 - abaixo do peso
Entre 18.5 e 24.99 - peso normal
Entre 25 e 29,99 - acima do peso
*/

let imc;
let resultado;
const btnHomem = document.querySelector('#btnHomem')
const btnMulher = document.querySelector('#btnMulher')
const campoSexo = document.querySelector('#sexo')

// Definir sexo ao clicar nos botões
    btnHomem.addEventListener('click', ()=> {
        btnHomem.classList.add('selectHomem')
        btnMulher.classList.remove('selectMulher')
        campoSexo.value = 'homem'
    })

    btnMulher.addEventListener('click', ()=> {
        btnMulher.classList.add('selectMulher')
        btnHomem.classList.remove('selectHomem')
        campoSexo.value = 'mulher'
    })

const calcular = (event) => {
    event.preventDefault()   

    let pesoStrg = document.querySelector('#peso').value
    let alturaStrg = document.querySelector('#altura').value
    const sexo = campoSexo.value
    
    // Trocar vírgula por ponto na entrada do usuário
    pesoStrg = pesoStrg.replace(',', '.') 
    alturaStrg = alturaStrg.replace(',', '.') 

    // Converter para número
    const peso = parseFloat(pesoStrg)
    const altura = parseFloat(alturaStrg)    

    //Correção se altura for fornecida em centímetros
    if(altura > 3) {
        document.querySelector('#valorIMC').innerHTML = `Altura deve ser informada em metros. Ex: para 1 metro e 67 centímetros, digite 1.67 ou 1,67.`
        return
    }

    // Validação input peso e altura
    if (!peso || !altura) {
        document.querySelector('#valorIMC').innerHTML = `Por favor, insira valores válidos para peso e altura.`
        return
    }    

    if(!sexo) {
        document.querySelector('#valorIMC').innerHTML = `Por favor, selecione seu sexo, clicando em "Homem" ou "Mulher" `
    }
    
    let imc = peso / (altura*altura)
    imc = imc.toFixed(2)

    // Salvar no localStorage
    localStorage.setItem('ultimoIMC', imc)

    let mensagem = `Seu Índice de Massa Corporal (IMC) é ${imc}.  `

    if(imc < 17) {
        mensagem += sexo === 'homem' ? `Você está muito abaixo do peso recomendado para homens. É recomendado buscar orientação nutricional`: 
        `Você está muito abaixo do peso recomendado para mulheres. É recomendado buscar orientação nutricional.`

    } else if(imc >= 17 && imc <= 18.49) {
        mensagem += sexo === 'homem' ? `Você está abaixo do peso recomendado para homens. Consulte um especialista.`: 
        `Você está abaixo do peso recomendado para mulheres. Consulte um especialista`

    } else if(imc >= 18.5 && imc <= 24.99) {
        mensagem += sexo === 'homem' ? `Você está dentro do peso ideal recomendado. Continue com bons hábitos e mantenha-se ativo!`: 
        `Você está está dentro do peso ideal recomendado. Continue com bons hábitos e mantenha-se ativa!`

    } else if (imc >= 25) {
        mensagem += sexo === 'homem' ? `Você está acima do peso recomendado para homens. É ideal procurar um especialista.`: 
        `Você está acima do peso recomendado para mulheres. É ideal procurar um especialista.`                
    }    
    document.querySelector('#valorIMC').innerHTML = mensagem
}

document.querySelector('#formularioIMC').addEventListener('submit', calcular)

//Limpar campos
document.querySelector('#limparCampos').addEventListener('click', ()=> {
    document.querySelector('#peso').value = ''
    document.querySelector('#altura').value = ''
    document.querySelector('#valorIMC').innerHTML = ''
    campoSexo.value = ''
    btnHomem.classList.remove('selectHomem')
    btnMulher.classList.remove('selectMulher')  
})

window.addEventListener('DOMContentLoaded', () => {
    const ultimo = localStorage.getItem('ultimoIMC')
    if(ultimo) {
    document.querySelector('#ultimoResultado').innerHTML = `Último valor de IMC calculado: ${ultimo}`
}
})


