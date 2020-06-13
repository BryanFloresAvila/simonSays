const nameDom = document.getElementById("nameDom");
const nivelDom = document.getElementById("nivelDom");
const onPopup = document.getElementById("onPopup");
const init = document.getElementById("init");
const form = document.getElementById("form");
const closePopup = document.getElementById("closePopup");
const name = document.getElementById("name");
const gameboard = document.getElementById("gameboard");
const item1 = document.getElementById("item1");
const item2 = document.getElementById("item2");
const item3 = document.getElementById("item3");
const item4 = document.getElementById("item4");
const codeColor = {
  0: item1,
  1: item2,
  2: item3,
  3: item4,
};
const LAST_LEVEL = 10;
let arrayCode;
let nivel = 1;
let clicks = 0;
let goods = 0;
// THIS FUNCTION RETURNS A NEW ARRAY WITH RANDOMLY SELECTED COLORS
const changeColor = (level) => {
  let arraycolors = [];
  for (let i = 0; i < level; i++) {
    setTimeout(() => {
      const code = Math.round(Math.random() * 3);
      arraycolors.push(code);
      codeColor[code].classList.toggle("seleccionado");
      setTimeout(() => codeColor[code].classList.toggle("seleccionado"), 400); // PROCESS INDEPENDENT
    }, 1000 * i); //  COLOR CHANGE EACH SECOND
  }
  return arraycolors;
};
gameboard.addEventListener("click", () => {
  if (goods == nivel) {
    if (nivel != LAST_LEVEL) {
      console.log("GANASTE EL NIVEL:" + nivel);
      nivel++;
      nivelDom.innerText=nivel;
      goods = 0;
      clicks = 0;
      estadoGloblal = true;
      deleteClickEvent();
      startGame(nivel);
    } else {
     
      
      swal("Simon says", "You win!", "success").then(() => {
        nivel = 1;  
        goods = 0;
        clicks = 0;
        deleteClickEvent();
        startGame(nivel);
      });
    }
  }
});
const addClickEvent = () => {
  for (let i = 0; i < 4; i++) {
    codeColor[i].addEventListener("click", chooseColor);
  }
};
const deleteClickEvent = () => {
  for (let i = 0; i < 4; i++) {
    codeColor[i].removeEventListener("click", chooseColor);
  }
};
function chooseColor(e) {
  clicks++;
  e.srcElement.classList.toggle("seleccionado");
  setTimeout(() => e.srcElement.classList.toggle("seleccionado"), 300); // PROCESS INDEPENDENT
  const id = sacarId(e.srcElement.attributes[1].nodeValue);
  if (arrayCode[clicks - 1] == id) {
    goods++;
  } else {
    swal("Simon says", "You lose!", "error").then(() => {
      nivel = 1;
      goods = 0;
      clicks = 0;
      deleteClickEvent();
      startGame(nivel);
    });
  }
}
function sacarId(e) {
  return e.slice(-1) - 1;
}
const startGame = (level) => {
  nivelDom.innerText=nivel;
  setTimeout(() => {
    arrayCode = changeColor(nivel);
  },1000 );

  setTimeout(() => {
    console.log(arrayCode);
    addClickEvent();
  }, level * 1000);
};
new Promise((response, reject) => {
  onPopup.setAttribute("href", "#popup1");
  onPopup.click();
  init.addEventListener('click',()=>{ 
    if(name.value.trim() === ""){
      name.value="Sin nombre";
    }
    response();
    closePopup.click();

  }); 
  
})
  .then(() => {
    nameDom.innerText=name.value;
    nivelDom.innerText=nivel;
    startGame(nivel);
  })
 
