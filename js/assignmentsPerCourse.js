let assignments = [];
let assTitle = document.getElementById("assTitle");
let assDescription =document.getElementById("assDescription");
let assSubDateTime = document.getElementById("assSubDateTime");
let assOralMark = document.getElementById("assOralMark");
let assTotalMark = document.getElementById("assTotalMark");
let courseTitle = document.getElementById("courseTitle");

let btnSubmit = document.getElementById("submit");
btnSubmit.addEventListener('click', submit);
let btnReset = document.getElementById('reset');
btnReset.addEventListener('click', reset);

let btnUpdate = document.getElementById('update');
btnUpdate.addEventListener('click', update);

let divAssignments = document.getElementById('assignments');
// functional constructor - This means that we use this function in order to create objects
// of type Assignment
function Assignment(title, description, subDateTime, oralMark, totalMark,courseTitle) {
    this.title = title;
    this.description = description;
    this.subDateTime = subDateTime;
    this.oralMark = oralMark;
    this.totalMark = totalMark;
    this.courseTitle = courseTitle;
}

function assignmentToString(assignment) {
    return (`${assignment.title} / ${assignment.description} / ${assignment.subDateTime} / ${assignment.oralMark} / ${assignment.totalMark} / ${assignment.courseTitle}`);    
}



function submit (event) {
    console.log("submit function");
    event.preventDefault();   
    
    //VALIDATIONS
    let isValid = validateForm();
    if (isValid == false) {
        return false; //stops the execution of submit
    }

    console.log("submit decription = " + assDescription.value);
    let myAssignment = new Assignment (assTitle.value, assDescription.value, assSubDateTime.value,assOralMark.value,assTotalMark.value,courseTitle.value);
    assignments.push(myAssignment);
    // create an HTML Element
    //create an Edit button
    let btnEdit = document.createElement('button');
    btnEdit.textContent = 'Edit';
    btnEdit.assignmentIndex = assignments.length - 1;
    btnEdit.addEventListener('click', edit);
    
    //somehow relate(bind) the button to an element of the array
    //append this HTML elemnt to document    
    createParagraphElement(myAssignment, btnEdit);
    btnReset.click();

}
function reset() {
    console.log('form is reset');
    btnSubmit.textContent = 'Add';
}

function edit(event) {
    event.preventDefault();
    console.log('Edit function');
    
    assTitle.value = assignments[this.assignmentIndex].title;
    assDescription.value = assignments[this.assignmentIndex].description;
    assSubDateTime.value = assignments[this.assignmentIndex].subDateTime;
    assOralMark.value = assignments[this.assignmentIndex].oralMark;
    assTotalMark.value = assignments[this.assignmentIndex].totalMark;
    courseTitle.value = assignments[this.assignmentIndex].courseTitle;
  
    btnSubmit.hidden = true;
    btnUpdate.hidden = false;
    btnUpdate.assignmentIndex = this.assignmentIndex;   
    
}

function update(event) {
    console.log('update function');
    event.preventDefault();  
    
    // VALIDATIONS
    let isValid = validateForm();
    if (isValid == false) {
        return false; //stops the execution of update
    }
    
    assignments[this.assignmentIndex] =new Assignment(assTitle.value, assDescription.value,assSubDateTime.value,assOralMark.value,assTotalMark.value,courseTitle.value);
    divAssignments.innerHTML = '';
    for (let i=0; i< assignments.length; i++){
        let btnEdit = document.createElement('button');
        btnEdit.textContent = 'Edit';
        btnEdit.assignmentIndex = i;
        btnEdit.addEventListener('click', edit);
        createParagraphElement(assignments[i], btnEdit);
    }
    btnUpdate.hidden=true;
    btnSubmit.hidden=false;
    btnReset.click();
}

function createParagraphElement(assignment, editButton) {
    console.log('create paragraph element');
    let paragraph = document.createElement('p');
    paragraph.innerText = assignmentToString(assignment);
    let spanSpace = document.createElement('span');
    spanSpace.innerHTML = ' - ';
    paragraph.append(spanSpace,editButton);
    divAssignments.append(paragraph);    
}

function validateForm () {
    //event.preventDefault();
    if (document.getElementById("assTitle").value == "") {
        alert('?? ???????????? ?????? ???????????? ???? ?????????? ??????????');
        return false;
        //window.history.back();
    }
    if (document.getElementById("assDescription").value == "") {
        alert('?? ?????????????????? ?????? ?????????????????? ?????? ???????????? ???? ?????????? ????????');
        return false;
        //window.history.back();
    }
    let subDate = document.getElementById('assSubDateTime').value;
       
    if (subDate == '') {
        alert("H ???????????????????? ?????? ???????????? ???? ?????????? ????????");
        return false;
    }
    let today = new Date().getTime();
    let mydate = new Date(subDate).getTime();
    console.log(`today = ${today} subscription date = ${mydate}`);
    if (mydate <= today) {
        alert("?? ???????????????????? ?????? ???????????? ???? ???????????????????? ?????? ????????????????");
        return false;
    }
    if (document.getElementById("assOralMark").value == "" || document.getElementById("assOralMark").value < 0 || document.getElementById("assOralMark").value > 100) {
        alert("?? ?????????????????? ???????????????????? ?????????? ???????????? 0 ?????? 100");
        return false;
    }
    if (document.getElementById("assTotalMark").value == "" ||document.getElementById("assTotalMark").value < 0 || document.getElementById("assTotalMark").value > 100) {
        alert("?? ???????????????? ???????????????????? ?????????? ???????????? 0 ?????? 100");
        return false;
    }
    if (document.getElementById("courseTitle").value == "") {
        alert('?? ???????????? ?????? ?????????????????? ?????? ???????????? ???? ?????????? ??????????');
        return false;
        //window.history.back();
    }

}