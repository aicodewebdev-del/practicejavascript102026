const inputstudent = document.getElementById("studentname");
const subjectname = document.getElementById("subject");
const studentmarks = document.getElementById("studentmarks");
const displaylist = document.getElementById("list");
const btnadd = document.getElementById("addbtn");

let displaydata = [];
let editId = null;

btnadd.addEventListener("click", () => {
  let displayname = inputstudent.value.trim();
  let displaysubject = subjectname.value.trim();
  let displaymarks = studentmarks.value.trim();

  if (displayname === "" || displaysubject === "" || displaymarks === "") {
    alert("please fill all fields");
    return;
  }

 
  if (editId !== null) {
    displaydata = displaydata.map((record) => {
      if (record.id === editId) {
        return {
          ...record,
          name: displayname,
          subject: displaysubject,
          marks: displaymarks,
        };
      }
      return record;
    });

    editId = null;
    btnadd.textContent = "Add";
  } 
  
  else {
    let record = {
      id: Date.now(),
      name: displayname,
      subject: displaysubject,
      marks: displaymarks,
    };
    displaydata.push(record);
  }

  
  inputstudent.value = "";
  subjectname.value = "";
  studentmarks.value = "";

  displaylist.innerHTML = "";
  displaydata.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <p>Name:- ${item.name}</p>
      <p>Subject:- ${item.subject}</p>
      <p>Marks:- ${item.marks}</p>
    `;

    const editbtn = document.createElement("button");
    const deletebtn = document.createElement("button");
    editbtn.textContent = "Edit";
    deletebtn.textContent = "Del";

    deletebtn.addEventListener("click", () => {
      displaydata = displaydata.filter((record) => record.id !== item.id);
      li.remove();
    });

    editbtn.addEventListener("click", () => {
      inputstudent.value = item.name;
      subjectname.value = item.subject;
      studentmarks.value = item.marks;
      editId = item.id;
      btnadd.textContent = "Update";
    });

    li.appendChild(editbtn);
    li.appendChild(deletebtn);
    displaylist.appendChild(li);
  });
});