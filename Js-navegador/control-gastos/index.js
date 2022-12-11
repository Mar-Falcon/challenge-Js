let transactionListing = [];

const form = document.querySelector("#form");

form.addEventListener("submit", (e) => { 
	e.preventDefault();
  	saveEnteredValues();  
  	calculateSavings();
  	createTransactionLog();
  	saveTransactionList();
});

const saveEnteredValues = () => {
  let transaction = {};
  let inputValue = document.getElementById("amount");
  let inputConcept = document.getElementById("concept");
  transaction.value = inputValue.value;
  transaction.concept = inputConcept.value;
  transactionListing.push(transaction);
  cleanForm();
};

const cleanForm = () =>{
  form.reset();
}

const calculateSavings = () => {
  let expenses = 0;
  let income = 0;
  let total = 0;
  for (let item of transactionListing) {
    total += Number(parseFloat(item.value).toFixed(2));
    if (item.value < 0) {
      expenses += -Number(parseFloat(item.value).toFixed(2));
    } else {
      income += Number(parseFloat(item.value).toFixed(2));
    }
  }
  document.getElementById("saving").textContent = total.toFixed(2);
  document.getElementById("expenses").textContent = expenses.toFixed(2);
  document.getElementById("income").textContent = income.toFixed(2);
};

const deleteTransaction = (itemIndex) =>{
  transactionListing.splice(itemIndex, 1);
  return createTransactionLog() + calculateSavings() + saveTransactionList()
};

const createTransactionLog = () => {
  let recordedTransaction = "";
  for (let item of transactionListing) {
    if (item.value) {
      recordedTransaction += 
      '<button class="close" onclick="deleteTransaction('+transactionListing.indexOf(item)+')">x</button>'+
        "<li>" +		
        item.concept +  
	"<span/>" +	
	item.value +	
	"</li>" ;	
    }
  }
  document.getElementById("record").innerHTML = recordedTransaction;
};

const saveTransactionList = () => {
  localStorage.setItem("records", JSON.stringify(transactionListing));
};

const recoverTransactionList = () => {
  let dataList = localStorage.getItem("records");
  if (dataList !== null) transactionListing = JSON.parse(dataList);
};

window.onload = () => {
	recoverTransactionList();	
	calculateSavings();
};
