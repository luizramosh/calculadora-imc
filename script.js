/*
Dados para cálculo do IMC - Índice de Massa Corporal

Abaixo de 17 - muito abaixo do peso
Entre 17 e 18,49 - abaixo do peso
Entre 18.5 e 24.99 - peso normal
Entre 25 e 29,99 - acima do peso
*/

// peso / (altura * altura)

let imc;
let resultado;

const calcular = (event) => {
    event.preventDefault()   

    let pesoStrg = document.querySelector('#peso').value
    let alturaStrg = document.querySelector('#altura').value

    // Trocar vírgula por ponto na entrada do usuário
    pesoStrg = pesoStrg.replace(',', '.') 
    alturaStrg = alturaStrg.replace(',', '.') 

    // Converter para número
    const peso = parseFloat(pesoStrg)
    const altura = parseFloat(alturaStrg)
    

    //Correção se altura for fornecida em centímetros

    if(altura > 3) {
        document.querySelector('#valorIMC').innerHTML = `Altura deve ser informada em metros. Ex: para 1 metro e 67 centímetros, digite 1.67 ou 1,67.`
    }

    // Validação input peso e altura
    if (!peso || !altura) {
        document.querySelector('#valorIMC').innerHTML = `Por favor, insira valores válidos para peso e altura.`
        return
    }    
    
    let imc = peso / (altura*altura)
    imc = imc.toFixed(2)
    console.log(imc)
     
    // Muito abaixo do peso ideal recomendado
    if(imc < 17){
        document.querySelector('#valorIMC').innerHTML = `Seu Índice de Massa Corporal (IMC) é ${imc}. Você está muito abaixo do peso recomendado para seu sexo e altura. É recomendado buscar orientação nutricional.`

    // Abaixo do peso
    } else if(imc >= 17 && imc <= 18.49){
        document.querySelector('#valorIMC').innerHTML = `Seu Índice de Massa Corporal (IMC) é ${imc}. Você está abaixo do peso recomendado para seu sexo e altura. É recomendado consultar um especialista. `
    // Peso ideal dentro do recomendado
    } else if(imc >= 18.5 && imc <= 24.99){
        document.querySelector('#valorIMC').innerHTML = `Seu Índice de Massa Corporal (IMC) é ${imc}. Você está dentro do peso ideal recomendado para seu sexo e altura. Continue com bons hábitos e mantenha-se ativo(a)!`
    // Acima do peso
    }else if(imc >= 25){
        document.querySelector('#valorIMC').innerHTML = `Seu Índice de Massa Corporal (IMC) é ${imc}. Você está acima do peso recomendado para seu sexo e altura. É recomendado procurar um especialista.`
    }
    
}

document.querySelector('#formularioIMC').addEventListener('submit', calcular)

