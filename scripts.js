//Seleciona os elemntos do form
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")

// Seleciona os elementos da lista
const expenseList = document.querySelector("ul")
const expenseQuantity = document.querySelector("aside header p span")
const expenseTotal = document.querySelector("aside header h2")

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
    //Chama a função para adicionar uma nova despesa
    expenseAdd(newExpense)
}

//Adiciona um novo item na lista
function expenseAdd(newExpense){
    try {
        //cria o elemento de li para adicionar na lista (ul)
        const expenseItem = document.createElement("li")
        expenseItem.classList.add("expense")

        //Cria o elemneto de imagem
        const expenseIcon = document.createElement("img")
        expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`)
        expenseIcon.setAttribute("alt", newExpense.category_name)

        //Cria a info da despesa
        const expenseInfo = document.createElement("div")
        expenseInfo.classList.add("expense-info")

        //Cria o nome da despesa
        expenseName = document.createElement("strong")
        expenseName.textContent = newExpense.expense

        //Cria a categoria da despesa
        expenseCategory = document.createElement("span")
        expenseCategory.textContent = newExpense.category_name

        //Cria o valor da despesa
        const expenseAmount = document.createElement("span")
        expenseAmount.classList.add("expense-amount")
        expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount.toUpperCase().replace("R$", "")}`

        //Adciona icone de remover
        const removeIcon = document.createElement("img")
        removeIcon.classList.add("remove-icon")
        removeIcon.setAttribute("src", "img/remove.svg")
        removeIcon.setAttribute("alt", "remover")
        

        //Adiciona o name e category na div expenseInfo
        expenseInfo.append(expenseName, expenseCategory)

        // Adiciona as informações no item
        expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon)
        expenseList.append(expenseItem)

        //atualiza os totais
        updateTotals()

    } catch (error) {
        alert("Não foi posssível atualizar a lista de despesa!")
        console.log(error)
    }
}

//Atualizar os totais
function updateTotals(){
    try {
        //Recupera todos os itens da lista
        const items = expenseList.children
        //Atualiza a quantidade de itens da lista
        expenseQuantity.textContent = `${items.length} ${items.length > 1 ? "despesas" : "despesa"}`

        //Variavel para incrementar o total
        let total = 0
        for(let item=0; item < items.length; item++){
            const itemAmount = items[item].querySelector(".expense-amount")
            //Removendo caracteres não numericos e substituir a virgula pelo ponto
            let value = itemAmount.textContent.replace(/[^\d,]/g, "").replace(",", ".")
         
            //Converte o valor para float
            value = parseFloat(value)
          
            //Verificar se é um número válido
            if(isNaN(value)){
                return alert("Não foi possível calcular o total!")
            }

            //Incrementar o valor total
            total += Number(value)
        }

        //Criar a span para adicioanr o R$ formatado
        const simbolBRL = document.createElement("small")
        simbolBRL.textContent = "R$"

        //Formata o valor e remove o R$ que serea exibido pela small
        total = formatCurrencyBRL(total).toUpperCase().replace("R$", "")

        //Limpa o conteudo do elemento
        expenseTotal.innerHTML = ""

        //Adiciona o simbolo e o valor formatado
        expenseTotal.append(simbolBRL, total)

    } catch (error) {
        alert("Não foi possível atualizar os totais!")
        console.log(error)
    }
}

//Evento que captura clique nos itens da lista
expenseList.addEventListener("click", function(event){
    //Verificar se o elemento clicado é o icone de remover

    if(event.target.classList.contains("remove-icon")){
        //Obtem a LI pai do elemento clicado
        const item = event.target.closest(".expense")

        //Remove o item da lista
        item.remove()
    }
    //Atualiza os totais
    updateTotals()
})