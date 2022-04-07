let trainers = [];
let firstName = document.getElementById("firstName");
let lastName =document.getElementById("lastName");
let subject = document.getElementById("subject");

let btnSubmit = document.getElementById("submit");
btnSubmit.addEventListener('click', submit);
let btnReset = document.getElementById('reset');
btnReset.addEventListener('click', reset);

let btnUpdate = document.getElementById('update');
btnUpdate.addEventListener('click', update);

let divTrainers = document.getElementById('trainers');
// functional constructor - This means that we use this function in order to create objects
// of type Trainer
function Trainer(firstName, lastName, subject) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.subject = subject;
}

function trainerToString(trainer) {
    return (`${trainer.firstName} / ${trainer.lastName} / ${trainer.subject}`);    
}



function submit (event) {
    console.log("submit function");
    event.preventDefault();   
    
    //VALIDATIONS
    let isValid = validateForm();
    if (isValid == false) {
        return false; //stops the execution of submit
    }

    
    let myTrainer = new Trainer (firstName.value, lastName.value, subject.value);
    trainers.push(myTrainer);
    // create an HTML Element
    //create an Edit button
    let btnEdit = document.createElement('button');
    btnEdit.textContent = 'Edit';
    btnEdit.trainerIndex = trainers.length - 1;
    btnEdit.addEventListener('click', edit);
    
    //somehow relate(bind) the button to an element of the array
    //append this HTML elemnt to document    
    createParagraphElement(myTrainer, btnEdit);
    btnReset.click();

}
function reset() {
    console.log('form is reset');
    btnSubmit.textContent = 'Add';
}

function edit(event) {
    event.preventDefault();
    console.log('Edit function');
    
    firstName.value = trainers[this.trainerIndex].firstName;
    lastName.value = trainers[this.trainerIndex].lastName;
    subject.value = trainers[this.trainerIndex].subject;
    
    btnSubmit.hidden = true;
    btnUpdate.hidden = false;
    btnUpdate.trainerIndex = this.trainerIndex;   
    
}

function update(event) {
    console.log('update function');
    event.preventDefault();  
    
    // VALIDATIONS
    let isValid = validateForm();
    if (isValid == false) {
        return false; //stops the execution of update
    }
    
    trainers[this.trainerIndex] =new Trainer(firstName.value, lastName.value,subject.value);
    divTrainers.innerHTML = '';
    for (let i=0; i< trainers.length; i++){
        let btnEdit = document.createElement('button');
        btnEdit.textContent = 'Edit';
        btnEdit.trainerIndex = i;
        btnEdit.addEventListener('click', edit);
        createParagraphElement(trainers[i], btnEdit);
    }
    btnUpdate.hidden=true;
    btnSubmit.hidden=false;
    btnReset.click();
}

function createParagraphElement(trainer, editButton) {
    console.log('create paragraph element');
    let paragraph = document.createElement('p');
    paragraph.innerText = trainerToString(trainer);
    let spanSpace = document.createElement('span');
    spanSpace.innerHTML = ' - ';
    paragraph.append(spanSpace,editButton);
    divTrainers.append(paragraph);    
}

function validateForm () {
    //event.preventDefault();
    if (document.getElementById("firstName").value == "") {
        alert('Το όνομα δεν μπορεί να έιναι κενό');
        return false;
        //window.history.back();
    }
    if (document.getElementById("lastName").value == "") {
        alert('To επώνυμο δεν μπορεί να έιναι κενό');
        return false;
        //window.history.back();
    }

    if (document.getElementById("subject").value == "") {
        alert('Το αντικείμενο δεν μπορεί να έιναι κενό');
        return false;
        //window.history.back();
    }

}