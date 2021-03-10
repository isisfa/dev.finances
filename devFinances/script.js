const Modal = {
  open() {
    document.querySelector(".modal-overlay").classList.add("active");
  },
  close() {
    document.querySelector(".modal-overlay").classList.remove("active");
  },
};

//===================FLUXO DE MONTAGEM DA EXECUÇÃO*
const Storage = {
  get () {
    //JSON.parse irá transformar novamente o sring em array
    return JSON.parse(localStorage.getItem("dev.finances:transactions")) || 
    []
  },

  set (transactions) {
    //irá pegar no localStorage pela chave ""
    localStorage.setItem("dev.finances:transactions", 
    JSON.stringify(transactions))
  }
}

const Transaction = {
  all: Storage.get(),
  
  //Atualizando balance
  //Adicionando a tabela
  add(transaction){
    Transaction.all.push(transaction)

    App.reload()
  },
  
  //Removendo da tabela
  remove(index) {
    Transaction.all.splice(index, 1)
    //Para remover da tela
    App.reload()
  },

  incomes() {
    let income = 0;
    //pegar todas as transacoes
    //para cada transacao incrementar a soma
    Transaction.all.forEach(transaction => {
      //se for maior que zero
      if( transaction.amount > 0 ) {
      //somar a uma variavel e retornar uma variavel
        income += transaction.amount;
      }
    })
    return income;
  },

  expenses() {
    let expense = 0;
      //pegar todas as transacoes
      //para cada transacao
      Transaction.all.forEach(transaction => {
      //se for menor que zero
      if( transaction.amount < 0 ) {
      //diminuir de uma variavel e retornar uma variavel
        expense += transaction.amount;
      }
    })
    return expense;
  },

  total() {
    return Transaction.incomes() + Transaction.expenses();
  }
}

const DOM = {
  transactionsContainer: document.querySelector("#data-table tbody"),
  
  
  addTransaction(transaction, index) {
    const tr = document.createElement("tr")
    tr.innerHTML = DOM.innerHTMLTransaction(transaction, index)
    tr.dataset.index = index

    DOM.transactionsContainer.appendChild(tr)
  },

  //Substituir os dados do HTML para JS
  innerHTMLTransaction(transaction, index) {
    const CSSclass = transaction.amount > 0 ? "income" : "expense"

    const amount = Utils.formatCurrency(transaction.amount)

    const html = `
        <td class="description">${transaction.description}</td>
        <td class="${CSSclass}">${amount}</td>
        <td class="date">${transaction.date}</td>
        <td>
            <img onclick="Transaction.remove(${index})" src="assets/minus.svg" alt="">
        </td>`

    return html
  },

  //Atualizar balance
  updateBalance() {
    document.getElementById("incomeDisplay")
    .innerHTML = Utils.formatCurrency(Transaction.incomes());
    document.getElementById("expenseDisplay")
    .innerHTML = Utils.formatCurrency(Transaction.expenses());
    document.getElementById("totalDisplay")
    .innerHTML = Utils.formatCurrency(Transaction.total());
  },

  //Quando haver o reload, limpar os dados anteriores
  clearTransactions() {
    DOM.transactionsContainer.innerHTML = ""
  }
}

const Utils = {
  formatAmount(value) {
    value = Number(value.replace(/\,\./g, "")) * 100

    return value
  },

  formatDate(date) {
    const splittedDate = date.split("-")
    return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`
  },

  formatCurrency(value) {
    const signal = Number(value) < 0 ? "-" : ""

    //trocar qualquer caracter que não foi um numero
    value = String(value).replace(/\D/g, "")

    value = Number(value) / 100

    value = value.toLocaleString('pt-PT', {
      style: "currency",
      currency: "EUR",
    })

    return signal + value;
  },
}

const Form = {
  //Linkando cada campo do form para utilizar
  description: document.querySelector('input#description'),
  amount: document.querySelector('input#amount'),
  date: document.querySelector('input#date'),

  getValues() {
    return {
      description: Form.description.value,
      amount: Form.amount.value,
      date: Form.date.value,
    }
  },

  validateFields() {
    //pegando os dados do return getValues()
    const { description, amount, date } = Form.getValues()
    
    //verificar se os campos estao vazios trim() faz a limpeza dos espaços vazios
    if ( description.trim() === "" || 
        amount.trim() === "" || 
        date.trim() === "") {
          throw new Error ("Please, fill in all fields")
    }
  },

  formatValues() {
    let {description, amount, date} = Form.getValues()

    amount = Utils.formatAmount(amount)
    date = Utils.formatDate(date)

    return {
      description,
      amount,
      date,
    }
  },

  clearFields() {
    Form.description.value = ""
    Form.amount.value = ""
    Form.date.value = ""
  },

  submit(event) {
    event.preventDefault()

    try {
      Form.validateFields()
      
      //formatar dados para salvar
      const transaction = Form.formatValues()
      
      //salvar
      Transaction.add(transaction)
      
      //apagar dados do formulario
      Form.clearFields()

      //fechar modal
      Modal.close()
    } catch (error) {
        alert(error.message)
    }
  },
}

//===================FLUXO DE INICIALIZAÇÃO DA APLICAÇÃO*

const App = {
  init() {
      //selecionar todos os objetos da tabela
    Transaction.all.forEach (DOM.addTransaction)

    DOM.updateBalance()

    Storage.set(Transaction.all)
  },

  reload() {
    DOM.clearTransactions()
    App.init()

  },
}
App.init()