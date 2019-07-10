class UI{
    constructor(){
        this.budgetFeedback = document.querySelector('.budget-feedback');
        this.expenseFeedback = document.querySelector('.expenses-feedback');
        this.expenseFeedback = document.querySelector('.expenses-feedback');
        this.budgetForm = document.getElementById('budget-form');
        this.expenseForm = document.getElementById('expense-form');
        this.budgetInput = document.getElementById('budget-input');
        this.budgetAmount = document.getElementById('budget-amount');
        this.expenseAmount = document.getElementById('expense-amount');
        this.balanceAmount = document.getElementById('balance-amount');
        this.expenseNameInput = document.getElementById('expense-name-input');
        this.expenseAmountInput = document.getElementById('expense-amount-input');
        this.expenseList = document.getElementById('expense-list');
        this.itemList = [];
        this.itemID = 0;
        
    }

    // submit budget method
    submitbudgetFrom(){
       const value = this.budgetInput.value;
       if(value === '' || value <0){
         this.budgetFeedback.classList.add('showItem');
         this.budgetFeedback.innerHTML ='<p>Value can not be empty of negative </p>';
         const self = this;
         setTimeout(function(){
          self.budgetFeedback.classList.remove('showItem');

         }, 4000);
       }
       else{
           this.budgetAmount.textContent = value;
           this.budgetInput.value = '';
           this.showBalance();
       }
    }
    
    
    // show balance
    showBalance(){
        const expense = this.totalExpense();
        const total = parseInt(this.budgetAmount.textContent) - expense;
        this.balanceAmount.textContent = total;
        if(total <0){
            this.balanceAmount.classList.remove('showGreen', 'showBlack');
            this.balanceAmount.classList.add('showRed');
        }
        else if(total >0){
            this.balanceAmount.classList.remove('showRed', 'showBlack');
            this.balanceAmount.classList.add('showGreen');
        }
        else if(total === 0){
            this.balanceAmount.classList.remove('showGreen', 'showRed');
            this.balanceAmount.classList.add('showBlack');
        }
    }
    
// Submit Expense form

submitExpenseFrom(){
    const expeseValue = this.expenseNameInput.value;
    const amountValue = this.expenseAmountInput.value;

   if(expeseValue === '' || amountValue === '' || amountValue < 0){

    this.expenseFeedback.classList.add('showItem');
    this.expenseFeedback.innerHTML = '<p>Value cannot be emply or nagative</p>';

    const self = this;

    setTimeout(function(){
        self.expenseFeedback.classList.remove('showItem');
    }, 4000);
   }
   else{
       let amount = parseInt(amountValue);
       this.expenseNameInput.value = '';
       this.expenseAmountInput.value ='';

       let expense = {
           id:this.itemID,
           title:expeseValue,
           amount:amount
       }
       this.itemID ++;
       this.itemList.push(expense);
       this.addExpense(expense);
     

    //    show balance
    this.showBalance();
   }
}

// add expense
addExpense(expense){
  const div = document.createElement('div');
  div.classList.add('expense');
  div.innerHTML = `
                <div class="expense-item d-flex justify-content-between align-items-baseline">
                <h6 class="expense-title mb-0 text-uppercase list-item">- ${expense.title}</h6>
                <h5 class="expense-amount mb-0 list-item">${expense.amount}</h5>
                <div class="expense-icons list-item">
                <a href="#" class="edit-icon mx-2" data-id="${expense.id}">
                    <i class="fas fa-edit"></i>
                </a>
                <a href="#" class="delete-icon" data-id="${expense.id}">
                    <i class="fas fa-trash"></i>
                </a>
                </div>
                </div>
                ` ;
    this.expenseList.appendChild(div);             


}

    // total Expense
    totalExpense(){
        let total = 0;
       if(this.itemList.length > 0){
        total = this.itemList.reduce(function(acc, curr){
        
        acc += curr.amount;  
        
        return acc;        
        }, 0);
       }
       this.expenseAmount.textContent = total; 
        return total;
    }
    
    // Edit expense
    editExpense(element){
      let id = parseInt(element.dataset.id);
      let parent = element.parentElement.parentElement.parentElement; 
      
    //   Remove form dom
     this.expenseList.removeChild(parent);

    let expense = this.itemList.filter(function(item){
        return item.id === id;

    });

    // Show value in form
    this.expenseNameInput.value = expense[0].title;
    this.expenseAmountInput.value = expense[0].amount;

    // Remove from the list
    let tempList = this.itemList.filter(function(item){
        return item.id !== id;
    });
    this.itemList = tempList;
    this.showBalance();


    }

    // Delete Expense
    deleteExpense(element){
        let id = parseInt(element.dataset.id);
        let parent = element.parentElement.parentElement.parentElement; 
        
      //   Remove form dom
       this.expenseList.removeChild(parent);

    //    remove form the list
    let tempList = this.itemList.filter(function(item){
        return item.id !== id;
    });
    this.itemList = tempList;
    this.showBalance();
    }
}

// add eventlistener

function  eventlisteners(){
    const budgetForm = document.getElementById('budget-form');
    const expenseForm = document.getElementById('expense-form');
    const expenseList = document.getElementById('expense-list');

    // new instance of UI Class
    const ui = new UI();

    // Budget form submit
    budgetForm.addEventListener('submit', function(event){
        event.preventDefault();
        ui.submitbudgetFrom();


    });

    // Expense form submit
    expenseForm.addEventListener('submit', function(event){
        event.preventDefault();
        ui.submitExpenseFrom();
    
    });

    // expense list Click
    expenseList.addEventListener('click', function(event){

     if(event.target.parentElement.classList.contains('edit-icon')){
          
       ui.editExpense(event.target.parentElement);
     }
     else if(event.target.parentElement.classList.contains('delete-icon')){
        ui.deleteExpense(event.target.parentElement);

    }

    });
}

document.addEventListener('DOMContentLoaded', function(){
    eventlisteners();
});