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

// Add ਅਤੇ Update ਦੋਵੇਂ ਇਸੇ ਬਟਨ ਰਾਹੀਂ ਹੋਣਗੇ
addbtn.addEventListener("click", () => {
  const enterinput = textinput.value.trim();
  const enteramount = amountinput.value.trim();

  if (enterinput === "" || isNaN(enteramount) || Number(enteramount) <= 0) {
    alert("Please Enter valid value");
    return;
  }

  if (editid !== null) {
    // 1. UPDATE ਵਾਲਾ ਹਿੱਸਾ: ਜੇਕਰ editid ਮੌਜੂਦ ਹੈ ਤਾਂ ਲਿਸਟ ਵਿੱਚੋਂ ਉਹ ਆਈਟਮ ਅੱਪਡੇਟ ਕਰੋ
    expense = expense.map((item) => {
      if (item.id === editid) {
        return {
          ...item,
          title: enterinput,
          amount: Number(enteramount),
        };
      }
      return item;
    });

    // ਅੱਪਡੇਟ ਕਰਨ ਤੋਂ ਬਾਅਦ ਵਾਪਸ ਆਮ ਸਥਿਤੀ ਵਿੱਚ ਲਿਆਓ
    editid = null;
    addbtn.innerText = "Add";
  } else {
    // 2. ADD ਵਾਲਾ ਹਿੱਸਾ: ਨਵਾਂ ਖ਼ਰਚਾ ਜੋੜੋ
    let addexpense = {
      id: Date.now(),
      title: enterinput,
      amount: Number(enteramount),
    };
    expense.push(addexpense);
  }

  // ਇਨਪੁਟ ਖ਼ਾਲੀ ਕਰੋ ਅਤੇ ਦੁਬਾਰਾ ਰੈਂਡਰ ਕਰੋ
  textinput.value = "";
  amountinput.value = "";
  renderExpenses();
});

function renderExpenses() {
  displaylist.innerHTML = "";
  let total = 0;

  expense.forEach((item) => {
    const list = document.createElement("li");
    list.innerText = `${item.title} - $${item.amount} `;
    total = total + item.amount;

    const editbtn = document.createElement("button");
    editbtn.innerText = "Edit";
    list.appendChild(editbtn);

    const delbtn = document.createElement("button");
    delbtn.innerText = "Del";
    list.appendChild(delbtn);

    displaylist.appendChild(list);

    // Delete Event
    delbtn.addEventListener("click", () => {
      expense = expense.filter((exp) => exp.id !== item.id);
      if (editid === item.id) {
        editid = null;
        addbtn.innerText = "Add";
        textinput.value = "";
        amountinput.value = "";
      }
      renderExpenses();
    });

    // Edit Event
    editbtn.addEventListener("click", () => {
      textinput.value = item.title;
      amountinput.value = item.amount;
      textinput.focus();
      addbtn.innerText = "Update";
      editid = item.id;
    });
  });

  displaytotalamount.innerText = `Total Amount :- $${total}`;
}


clearbutton.addEventListener("click", () => {
  expense = [];
  editid = null;
  addbtn.innerText = "Add";
  textinput.value = "";
  amountinput.value = "";
  renderExpenses();
});