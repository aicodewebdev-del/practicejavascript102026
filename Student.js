const inputstudent = document.getElementById('studentname');
const subjectname = document.getElementById('subject');
const studentmarks = document.getElementById('studentmarks');
const displaylist = document.getElementById('list');
const btnadd = document.getElementById('addbtn');
let displaydata=[];

btnadd.addEventListener('click',()=>{
  let displayname = inputstudent.value.trim();
  let displaysubject = subjectname.value.trim();
  let displaymarks = studentmarks.value.trim();
  function record(){
let data={
        id:Date.now(),
        name:displayname,
        subject:displaysubject,
        marks:displaymarks,
    };
    displaydata.push(data);
    inputstudent.value ="";
    subjectname.value ="";
    studentmarks.value ="";
 displaylist.innerHTML = displaydata.map((item)=>`
<li>
<p>Name:-${item.name}</p>
<p>Subject:-${item.subject}</p>
<p>Marks:-${item.marks}</p>

</li>
 `)
}
record();
});