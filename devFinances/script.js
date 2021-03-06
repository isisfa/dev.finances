
const Modal = {
    open(){
        document.querySelector('.modal-overlay').classList.add('active');
    },
    close(){
        document.querySelector('.modal-overlay').classList.remove('active');
    }
}

//table transactions
const transactions = [
    {
    id: 1,
    description: 'Energy',
    amount: -50000,
    date: '23/01/2021',
},
    {
    id: 1,
    description: 'Website',
    amount: -500000,
    date: '23/01/2021',
},
    {
    id: 1,
    description: 'Internet',
    amount: -20000,
    date: '23/01/2021',
},
]

//balance
const Transaction = {
    incomes() {
        //somar as entradas
    },
    expenses() {
        //somar as saídas
    },
    total() {
        //entradas - saídas
    }
}