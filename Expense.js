const textinput = document.getElementById("input");
const amountinput = document.getElementById("amount");
const addbtn = document.getElementById("addbtn");
const displaylist = document.getElementById("list");
const displaytotalamount = document.getElementById("totalamount");
const clearbutton = document.getElementById("clearbtn");
textinput.addEventListener("input", () => {
  textinput.value = textinput.value.replace(/[0-9]/g, "");
});
let expense = [];
let editid = null;
addbtn.addEventListener("click", () => {
  const enterinput = textinput.value.trim();
  const enteramount = amountinput.value.trim();
  if (enterinput === "" || isNaN(enteramount) || enteramount <= 0) {
    alert("Please Enter any value");
    return;
  }
  let addexpense = {
    id: Date.now(),
    title: enterinput,
    amount: Number(enteramount),
  };
  expense.push(addexpense);
  textinput.value = "";
  amountinput.value = "";
  renderExpenses();
});
function renderExpenses() {
  displaylist.innerHTML = "";
  let total = 0;
  expense.forEach((item) => {
    const list = document.createElement("li");
    list.innerText = `${item.title}$${item.amount}`;
    total = total + item.amount;
    const delbtn = document.createElement("button");
    const editbtn = document.createElement("button");
    editbtn.innerText = "Edit";
    list.appendChild(editbtn);
    delbtn.innerText = "Del";
    list.appendChild(delbtn);
    displaylist.appendChild(list);
    delbtn.addEventListener("click", () => {
      expense = expense.filter((exp) => exp.id !== item.id);
      renderExpenses();
      addbtn.innerText ="Add";
    });
    editbtn.addEventListener('click',()=>{
      textinput.value = item.title;
      amountinput.value = item.amount;
      textinput.focus();
      addbtn.innerText = "Update";
    editid = item.id;
    })
  });
  displaytotalamount.innerText = `Total Amount :- $${total}`;
  clearbutton.addEventListener("click", () => {
    expense = [];
    textinput.value = "";
    amountinput.value = "";
    renderExpenses();
  });
}
