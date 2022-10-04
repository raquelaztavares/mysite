let numSelected = null;
let tileSelected = null;



let errors = 0;

let board = [
    "21-6--3-8",
    "-4--9-2--",
    "6--5217-4",
    "37---8---",
    "---1-----",
    "---7621--",
    "---25-86-",
    "---3-94--",
    "-82-16539"
]

let solution = [
    "219674358",
    "547893216",
    "638521794",
    "371948625",
    "826135947",
    "954762183",
    "493257861",
    "165389472",
    "782416539"

]

window.onload = function() {
    setGame();
}

function setGame() {
    // Digits 1-9
    for (let i = 1; i <= 9; i++) {
        //<div id="1" class="number">1</div>
        let number = document.createElement("div");
        number.id = i
        number.innerText = i;
        number.addEventListener("click", selectNumber);
        number.classList.add("number");
        document.getElementById("digits").appendChild(number);
    }

    // Board 9x9
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            if (board[r][c] != "-") {
                tile.innerText = board[r][c];
                tile.classList.add("tile-start");
            }
            if (r == 2 || r == 5) {
                tile.classList.add("horizontal-line");
            }
            if (c == 2 || c == 5) {
                tile.classList.add("vertical-line");
            }
            tile.addEventListener("click", selectTile);
            tile.classList.add("tile");
            document.getElementById("board").append(tile);
        }
    }
}

function selectNumber(){
    if (numSelected != null) {
        numSelected.classList.remove("number-selected");
    }
    numSelected = this;
    numSelected.classList.add("number-selected");
}

function selectTile() {
    if (numSelected) {
        if (this.innerText != "") {
            return;
        }

        // "0-0" "0-1" .. "3-1"
        let coords = this.id.split("-"); //["0", "0"]
        let r = parseInt(coords[0]);
        let c = parseInt(coords[1]);

        if (solution[r][c] == numSelected.id) {
            this.innerText = numSelected.id;
        }
        else {
            errors += 1;
            document.getElementById("errors").innerText = errors;
        }
    }
}

function hideError() {
  document.querySelector(".error").style.visibility = "hidden"
}

document.querySelectorAll("form > input").forEach(input => {
  input.addEventListener("input", hideError)
})

document.querySelector("form").addEventListener("submit", evt => {
  evt.preventDefault()
  hideError()
  const [first, last] = evt.target
  if (!first.value || !last.value) {
    document.querySelector(".error").style.visibility = "visible"
    return
  }
  alert(`Thank you ${first.value} ${last.value} for submitting the form!`)
})
