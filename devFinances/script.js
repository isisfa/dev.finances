const Modal = {
  open() {
    document.querySelector(".modal-overlay").classList.add("active");
  },
  close() {
    document.querySelector(".modal-overlay").classList.remove("active");
  },
};

//table transactions
const transactions = [
  {
    id: 1,
    description: "Energy",
    amount: -50000,
    date: "23/01/2021",
  },
  {
    id: 2,
    description: "Website",
    amount: 500000,
    date: "23/01/2021",
  },
  {
    id: 3,
    description: "Internet",
    amount: -20000,
    date: "23/01/2021",
  },
  {
    id: 4,
    description: "App",
    amount: 200000,
    date: "23/01/2021",
  },
];

//balance
const Transaction = {

  incomes() {
    let income = 0;
    //pegar todas as transacoes
    //para cada transacao
    transactions.forEach(function (transaction) {
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
    transactions.forEach(function (transaction) {
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

//Substituir os dados do HTML para JS
const DOM = {
  transactionsContainer: document.querySelector("#data-table tbody"),

  addTransaction(transaction, index) {
    const tr = document.createElement("tr");
    tr.innerHTML = DOM.innerHTMLTransaction(transaction);

    DOM.transactionsContainer.appendChild(tr);
  },

  innerHTMLTransaction(transaction) {
    const CSSclass = transaction.amount > 0 ? "income" : "expense";

    const amount = Utils.formatCurrency(transaction.amount);

    const html = `
        <td class="description">${transaction.description}</td>
        <td class=${CSSclass}>${amount}</td>
        <td class="date">${transaction.date}</td>
        <td>
            <img src="assets/minus.svg" alt="">
        </td>`;
    return html;
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
};

const Utils = {
  //formatar a moeda para negativo ou positivo
  formatCurrency(value) {
    const signal = Number(value) < 0 ? "-" : "";

    //trocar qualquer caracter que não foi um numero
    value = String(value).replace(/\D/g, "");

    value = Number(value) / 100;

    value = value.toLocaleString("pt-PT", {
      style: "currency",
      currency: "EUR",
    });

    return signal + value;
  },
};

//selecionar todos os objetos da tabela
transactions.forEach(function (transaction) {
  DOM.addTransaction(transaction);
});

DOM.updateBalance();
