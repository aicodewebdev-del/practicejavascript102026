const inputstudent = document.getElementById("studentname");
const subjectname = document.getElementById("subject");
const studentmarks = document.getElementById("studentmarks");
const displaylist = document.getElementById("list");
const btnadd = document.getElementById("addbtn");
let displaydata = [];
let editId = null;
btnadd.addEventListener('click',()=>{
  console.log("click");
  
  let displayname = inputstudent.value.trim();
  let displaysubject = subjectname.value.trim();
  let displaymarks = studentmarks.value.trim();
  if(displayname==="" || displaysubject==="" || displaymarks ===""){
    alert("please fill all filed")
    return;
  }
  if(editId !==null){
    displaydata = displaydata.map((record)=>{
      if(record.id === editId){
        return{
          ...record,
          name:displayname,
          subject: displaysubject,
          marks: displaymarks,
        };
      }
      return record;
    });
    editId = null;
    btnadd.textContent = "Add";
  }else{
    
  }
  function showdata(){
    let record={
      id:Date.now(),
      name:displayname,
      subject:displaysubject,
      marks:displaymarks,
    }
    displaydata.push(record);
  }
  inputstudent.value="";
  subjectname.value="";
  studentmarks.value="";
  showdata();
  displaylist.innerHTML = "";
  displaydata.forEach((item)=>{
   const li = document.createElement("li");
   li.innerHTML = `
   <p>Name:- ${item.name}</p>
   <p>Subject:-${item.subject}</p>
   <p>Marks:-${item.marks}</p>
   `;
   const deletebtn = document.createElement("button");
   const editbtn = document.createElement('button');
   editbtn.textContent = "Edit"
   deletebtn.textContent = "Del";
   deletebtn.addEventListener('click', ()=>{
    displaydata = displaydata.filter((record) => record.id !== item.id);
    li.remove();
   });
   li.appendChild(editbtn);
   li.appendChild(deletebtn);
   displaylist.appendChild(li);
   editbtn.addEventListener('click',()=>{
    inputstudent.value = item.name;
    subjectname.value = item.subject;
    studentmarks.value = item.marks;
    editId = item.id;
    btnadd.textContent = "Update";
   });

});
});
