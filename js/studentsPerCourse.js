let students = [];
let firstName = document.getElementById("firstName");
let lastName =document.getElementById("lastName");
let dateOfBirth = document.getElementById("dateOfBirth");
let tuitionFees = document.getElementById("tuitionFees");
let courseTitle = document.getElementById("courseTitle");

let btnSubmit = document.getElementById("submit");
btnSubmit.addEventListener('click', submit);
let btnReset = document.getElementById('reset');
btnReset.addEventListener('click', reset);

let btnUpdate = document.getElementById('update');
btnUpdate.addEventListener('click', update);

let divStudents = document.getElementById('students');
// functional constructor - This means that we use this function in order to create objects
// of type Student
function Student (firstName, lastName, dateOfBirth, tuitionFees,courseTitle) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.dateOfBirth = dateOfBirth;
    this.tuitionFees = tuitionFees;
    this.courseTitle = courseTitle;
}

function studentToString(student) {
    return (`${student.firstName} / ${student.lastName} / ${student.dateOfBirth} / ${student.tuitionFees} / ${student.courseTitle}`);    
}



function submit (event) {
    console.log("submit function");
    event.preventDefault();   
    
    //VALIDATIONS
    let isValid = validateForm();
    if (isValid == false) {
        return false; //stops the execution of submit
    }

    
    let myStudent = new Student (firstName.value, lastName.value, dateOfBirth.value,tuitionFees.value,courseTitle.value);
    students.push(myStudent);
    // create an HTML Element
    //create an Edit button
    let btnEdit = document.createElement('button');
    btnEdit.textContent = 'Edit';
    btnEdit.studentIndex = students.length - 1;
    btnEdit.addEventListener('click', edit);
    
    //somehow relate(bind) the button to an element of the array
    //append this HTML elemnt to document    
    createParagraphElement(myStudent, btnEdit);
    btnReset.click();

}
function reset() {
    console.log('form is reset');
    btnSubmit.textContent = 'Add';
}

function edit(event) {
    event.preventDefault();
    console.log('Edit function');
    
    firstName.value = students[this.studentIndex].firstName;
    lastName.value = students[this.studentIndex].lastName;
    dateOfBirth.value = students[this.studentIndex].dateOfBirth;
    tuitionFees.value = students[this.studentIndex].tuitionFees;
    courseTitle.value = students[this.studentIndex].courseTitle;
      
    btnSubmit.hidden = true;
    btnUpdate.hidden = false;
    btnUpdate.studentIndex = this.studentIndex;   
    
}

function update(event) {
    console.log('update function');
    event.preventDefault();  
    
    // VALIDATIONS
    let isValid = validateForm();
    if (isValid == false) {
        return false; //stops the execution of update
    }
    
    students[this.studentIndex] =new Student(firstName.value, lastName.value, dateOfBirth.value, tuitionFees.value,courseTitle.value);
    divStudents.innerHTML = '';
    for (let i=0; i< students.length; i++){
        let btnEdit = document.createElement('button');
        btnEdit.textContent = 'Edit';
        btnEdit.studentIndex = i;
        btnEdit.addEventListener('click', edit);
        createParagraphElement(students[i], btnEdit);
    }
    btnUpdate.hidden=true;
    btnSubmit.hidden=false;
    btnReset.click();
}

function createParagraphElement(student, editButton) {
    console.log('create paragraph element');
    let paragraph = document.createElement('p');
    paragraph.innerText = studentToString(student);
    let spanSpace = document.createElement('span');
    spanSpace.innerHTML = ' - ';
    paragraph.append(spanSpace,editButton);
    divStudents.append(paragraph);    
}

function validateForm () {
    //event.preventDefault();
    if (document.getElementById("firstName").value == "") {
        alert('???? ?????????? ?????? ???????????? ???? ?????????? ????????');
        return false;
        //window.history.back();
    }
    if (document.getElementById("lastName").value == "") {
        alert('To ?????????????? ?????? ???????????? ???? ?????????? ????????');
        return false;
        //window.history.back();
    }
    let dateOfBirth = document.getElementById('dateOfBirth').value;
    
    if (dateOfBirth == '') {
        alert("H ???????????????????? ???????????????? ?????? ???????????? ???? ?????????? ????????");
        return false;
    }
    let tuitionFees = document.getElementById('tuitionFees').value;
    if (isNaN(tuitionFees) || tuitionFees < 0 || tuitionFees == 0) {
        alert("?????????? ???????????? ???????? ?????? ???? ????????????????");
        return false;
    }
    if (document.getElementById("courseTitle").value == "") {
        alert('?? ???????????? ?????? ?????????????????? ?????? ???????????? ???? ?????????? ??????????');
        return false;
        //window.history.back();
    }

}