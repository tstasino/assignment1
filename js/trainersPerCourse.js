let trainersPerCourse = [];
let firstName = document.getElementById("firstName");
let lastName =document.getElementById("lastName");
let subject = document.getElementById("subject");
let courseTitle = document.getElementById("courseTitle");

let btnSubmit = document.getElementById("submit");
btnSubmit.addEventListener('click', submit);
let btnReset = document.getElementById('reset');
btnReset.addEventListener('click', reset);

let btnUpdate = document.getElementById('update');
btnUpdate.addEventListener('click', update);

let divTrainersPerCourse = document.getElementById('trainersPerCourse');
// functional constructor - This means that we use this function in order to create objects
// of type Trainer
function TrainerPerCourse(firstName, lastName, subject, title) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.subject = subject;
    this.title = title;
}

function trainerPerCourseToString(trainerPerCourse) {
    return (`${trainerPerCourse.firstName} / ${trainerPerCourse.lastName} / ${trainerPerCourse.subject} / ${trainerPerCourse.title}`);    
}



function submit (event) {
    console.log("submit function");
    event.preventDefault();   
    
    //VALIDATIONS
    let isValid = validateForm();
    if (isValid == false) {
        return false; //stops the execution of submit
    }

    
    let myTrainerPerCourse = new TrainerPerCourse (firstName.value, lastName.value, subject.value,courseTitle.value);
    trainersPerCourse.push(myTrainerPerCourse);
    // create an HTML Element
    //create an Edit button
    let btnEdit = document.createElement('button');
    btnEdit.textContent = 'Edit';
    btnEdit.trainersPerCourseIndex = trainersPerCourse.length - 1;
    btnEdit.addEventListener('click', edit);
    
    //somehow relate(bind) the button to an element of the array
    //append this HTML elemnt to document    
    createParagraphElement(myTrainerPerCourse, btnEdit);
    btnReset.click();

}
function reset() {
    console.log('form is reset');
    btnSubmit.textContent = 'Add';
}

function edit(event) {
    event.preventDefault();
    console.log('Edit function');
    
    firstName.value = trainersPerCourse[this.trainersPerCourseIndex].firstName;
    lastName.value = trainersPerCourse[this.trainersPerCourseIndex].lastName;
    subject.value = trainersPerCourse[this.trainersPerCourseIndex].subject;
    courseTitle.value = trainersPerCourse[this.trainersPerCourseIndex].title;
    
    btnSubmit.hidden = true;
    btnUpdate.hidden = false;
    btnUpdate.trainersPerCourseIndex = this.trainersPerCourseIndex;   
    
}

function update(event) {
    console.log('update function');
    event.preventDefault();  
    
    // VALIDATIONS
    let isValid = validateForm();
    if (isValid == false) {
        return false; //stops the execution of update
    }
    
    trainersPerCourse[this.trainersPerCourseIndex] =new TrainerPerCourse(firstName.value, lastName.value,subject.value,courseTitle.value);
    divTrainersPerCourse.innerHTML = '';
    for (let i=0; i< trainersPerCourse.length; i++){
        let btnEdit = document.createElement('button');
        btnEdit.textContent = 'Edit';
        btnEdit.trainersPerCourseIndex = i;
        btnEdit.addEventListener('click', edit);
        createParagraphElement(trainersPerCourse[i], btnEdit);
    }
    btnUpdate.hidden=true;
    btnSubmit.hidden=false;
    btnReset.click();
}

function createParagraphElement(trainer, editButton) {
    console.log('create paragraph element');
    let paragraph = document.createElement('p');
    paragraph.innerText = trainerPerCourseToString(trainer);
    let spanSpace = document.createElement('span');
    spanSpace.innerHTML = ' - ';
    paragraph.append(spanSpace,editButton);
    divTrainersPerCourse.append(paragraph);    
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
    if (document.getElementById("courseTitle").value == "") {
        alert('ο τίτλος του μαθήματος δεν μπορεί να έιναι κενός');
        return false;
        //window.history.back();
    }

}