let courses = [];
let courseTitle = document.getElementById("courseTitle");
let courseStream =document.getElementById("courseStream");
let courseType = document.getElementById("courseType");
let courseStartDate = document.getElementById("courseStartDate");
let courseEndDate = document.getElementById("courseEndDate");

let btnSubmit = document.getElementById("submit");
btnSubmit.addEventListener('click', submit);
let btnReset = document.getElementById('reset');
btnReset.addEventListener('click', reset);

let btnUpdate = document.getElementById('update');
btnUpdate.addEventListener('click', update);

let divCourses = document.getElementById('courses');
// functional constructor - This means that we use this function in order to create objects
// of type Course
function Course(title, stream, type, startDate, endDate) {
    this.title = title;
    this.stream = stream;
    this.type = type;
    this.startDate = startDate;
    this.endDate = endDate;
}

function courseToString(course) {
    return (`${course.title} / ${course.stream} / ${course.type} / ${course.startDate} / ${course.endDate}`);    
}



function submit (event) {
    console.log("submit function");
    event.preventDefault();   
    let isValid = validateForm();
    if (isValid == false) {
        return false; //stops the execution of submit
    }
    let myCourse = new Course (courseTitle.value, courseStream.value, courseType.value,courseStartDate.value,courseEndDate.value);
    courses.push(myCourse);
    // create an HTML Element
    //create an Edit button
    let btnEdit = document.createElement('button');
    btnEdit.textContent = 'Edit';
    btnEdit.courseIndex = courses.length - 1;
    btnEdit.addEventListener('click', edit);
    
    //somehow relate(bind) the button to an element of the array
    //append this HTML elemnt to document    
    createParagraphElement(myCourse, btnEdit);
    btnReset.click();

}
function reset() {
    console.log('form is reset');
    btnSubmit.textContent = 'Add';
}

function edit(event) {
    event.preventDefault();
    console.log('Edit function');
    
    courseTitle.value = courses[this.courseIndex].title;
    courseStream.value = courses[this.courseIndex].stream;
    courseType.value = courses[this.courseIndex].type;
    courseStartDate.value = courses[this.courseIndex].startDate;
    courseEndDate.value = courses[this.courseIndex].endDate;
  
    btnSubmit.hidden = true;
    btnUpdate.hidden = false;
    btnUpdate.courseIndex = this.courseIndex;   
    
}

function update(event) {
    console.log('update function');
    event.preventDefault();  
    let isValid = validateForm();
    if (isValid == false) {
        return false; //stops the execution of update
    }
    courses[this.courseIndex] =new Course(courseTitle.value, courseStream.value,courseType.value,courseStartDate.value,courseEndDate.value);
    divCourses.innerHTML = '';
    for (let i=0; i< courses.length; i++){
        let btnEdit = document.createElement('button');
        btnEdit.textContent = 'Edit';
        btnEdit.courseIndex = i;
        btnEdit.addEventListener('click', edit);
        createParagraphElement(courses[i], btnEdit);
    }
    btnUpdate.hidden=true;
    btnSubmit.hidden=false;
    btnReset.click();
}

function createParagraphElement(course, editButton) {
    console.log('create paragraph element');
    let paragraph = document.createElement('p');
    paragraph.innerText = courseToString(course);
    let spanSpace = document.createElement('span');
    spanSpace.innerHTML = ' - ';
    paragraph.append(spanSpace,editButton);
    divCourses.append(paragraph);    
}

function validateForm () {
    //event.preventDefault();
    if (document.getElementById("courseTitle").value == "") {
        alert('ο τίτλος του μαθήματος δεν μπορεί να έιναι κενός');
        return false;
        //window.history.back();
    }
    if (document.getElementById("courseStream").value == "") {
        alert('To λογότυπο του μαθήματος δεν μπορεί να έιναι κενό');
        return false;
        //window.history.back();
    }
    let startDate = document.getElementById('courseStartDate').value;
    let endDate = document.getElementById('courseEndDate').value;
   
    if (startDate == '') {
        alert("H ημερομηνία έναρξης δεν μπορεί να είναι κενή");
        return false;
    }
    if (endDate == '') {
        alert("H ηερομηνία λήξης δεν μπορεί να είναι κενή");
        return false;
    }
    if (endDate < startDate) {
        alert("H ημερομηνία λήξης δεν μπορεί να είναι μικρότερη από την ημ/νια έναρξης");
        return false;
    }

}