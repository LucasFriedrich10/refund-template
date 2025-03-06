//Seleciona os elemntos do form
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")



//Captura o evento de input para formatar o valor
amount.oninput = () => {
    //Obtem o valor atual do input e remove as letras
    let value = amount.value.replace(/\D/g, "")

    //Transformar o valor em centavos
    value = Number(value) / 100

    //atualiza o valor do input
    amount.value = formatCurrencyBRL(value)
    
}

function formatCurrencyBRL(value){
    //Formata o valor para Reais
    value = value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    })

    return value
}

//Captura o evento de submir para obter os valores
form.onsubmit = (event) =>{
    //Previne o reload
    event.preventDefault()

    //Objeto com os detalhes da nova despesa
    const newExpense = {
        id: new Date().getTime(),
        expense: expense.value,
        category_id: category.value,
        category_name: category.options[category.selectedIndex].text,
        amount: amount.value,
        created_at: new Date()
    }
    
}