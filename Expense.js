
const textinput = document.getElementById('input');
const numberinput = document.getElementById('amount');
const addbtn = document.getElementById('addbtn');
const displaylist = document.getElementById('list');
const displaytotalamount = document.getElementById('totalamount');
const clearbutton = document.getElementById('clearbtn');
let totalamount = 0;
addbtn.addEventListener('click',()=>{
  const displayinput = textinput.value.trim();
  const displayamount = numberinput.value.trim();
  if(displayinput === "" || displayamount === ""){
    alert("Please enter value")
    return;
  }
  const list = document.createElement('li');

  list.innerText = `${displayinput} $${displayamount}`;

    const deletebtn = document.createElement('button');
  deletebtn.textContent ="Del";
  list.appendChild(deletebtn);
  displaylist.appendChild(list);
  textinput.value="";
  numberinput.value ="";
  textinput.focus();
  deletebtn.addEventListener('click',()=>{
    totalamount = totalamount - Number(displayamount);
    displaytotalamount.textContent = totalamount;
list.remove();

  })
totalamount = totalamount + Number(displayamount);
displaytotalamount.textContent = `Total amount :- $${totalamount}`;
const editbtn = document.createElement('button');
editbtn.textContent = "Edit";
list.appendChild(editbtn);
displaylist.appendChild(list);
editbtn.addEventListener('click',()=>{
  textinput.value = displayinput;
  numberinput.value = displayamount;
  list.remove();
  totalamount = totalamount - Number(displayamount);
  displaytotalamount.textContent = `Total amount :- $${totalamount}`;
})
})
clearbutton.addEventListener('click',()=>{
  textinput.value ="";
  numberinput.value ="";
  totalamount =0;
  displaylist.innerHTML ="";
  displaytotalamount.textContent = `Total Amount :- $0`;
})