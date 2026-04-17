const gameBoard = document.getElementById('gameBoard');
const colors = {
  "red"     : "hsl(0, 100%, 60%)", 
  "orange"  : "hsl(30, 100%, 60%)",
  "yellow"  : "hsl(45, 75%, 60%)",
  "lime"    : "hsl(75, 100%, 40%)",
  "green"   : "hsl(140, 100%, 30%)",
  "cyan"    : "hsl(180, 100%, 30%)",
  "blue"    : "hsl(210, 100%, 60%)",
  "indigo"  : "hsl(240, 100%, 60%)",
  "purple"  : "hsl(270, 100%, 60%)",
  "pink"    : "hsl(300, 100%, 60%)",
  "magenta" : "hsl(330, 100%, 60%)",
  "white"   : "hsl(0, 0%, 90%)",
  "black"   : "hsl(0, 0%, 0%)"
}
function createGrid(size) {
  gameBoard.innerHTML = null;
  for (let row = 0; row < size; row++) {
    const rowElement = document.createElement('div');
    gameBoard.append(rowElement);
    rowElement.classList.add('row');
    for (let col = 0; col < size; col++) {
      const button = document.createElement('button');
      let index = (size * row + col);
      button.textContent = index;
      button.onclick = function() {createBlock(button);}
      rowElement.append(button);
    }
  }
}

//Click down marks the starting button, lifting will set a block
function createBlock(button) {
  let colorsLength = Object.keys(colors).length;
  let randomIndex = Math.floor(Math.random() * colorsLength);
  let randomColor = Object.keys(colors)[randomIndex];

  button.style.backgroundColor = randomColor;
  if (randomColor == "white" || randomColor == "lime") {
    button.style.color = colors["black"];
  } else {
    button.style.color = colors["white"];
  }
  console.log(Object.values(colors)[randomIndex], randomColor);
}

createGrid(5);