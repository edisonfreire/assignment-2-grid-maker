// Declare global variables
let numRows = 0;
let numCols = 0;
let colorSelected;

// Add a row
function addR() {
    const table = document.getElementById("grid");
    const newRow = document.createElement("tr");

    // Handle the case when no columns exist (initially)
    if (numCols === 0) {
        const newCell = document.createElement("td");
        newCell.style.backgroundColor = "white"; // Default cell color
        newCell.onclick = function () {
            this.style.backgroundColor = colorSelected;
        };
        newRow.appendChild(newCell);
        numCols = 1; // Set numCols to 1 after creating the first cell
    } else {
        // Add as many cells as there are columns
        for (let i = 0; i < numCols; i++) {
            const newCell = document.createElement("td");
            newCell.style.backgroundColor = "white"; // Default cell color
            newCell.onclick = function () {
                this.style.backgroundColor = colorSelected;
            };
            newRow.appendChild(newCell);
        }
    }

    table.appendChild(newRow);
    numRows++;
}

// Add a column
function addC() {
    alert("Clicked Add Col"); // Replace this line with your code.
}

// Remove a row
function removeR() {
    alert("Clicked Remove Row"); // Replace this line with your code.
}

// Remove a column
function removeC() {
    alert("Clicked Remove Col"); // Replace this line with your code.
}

// Set global variable for selected color
function selectColor() {
    colorSelected = document.getElementById("selectedColorId").value;
    console.log(colorSelected);
}

// Fill all uncolored cells
function fillU() {
    alert("Clicked Fill All Uncolored"); // Replace this line with your code.
}

// Fill all cells
function fillAll() {
    alert("Clicked Fill All"); // Replace this line with your code.
}

// Clear all cells
function clearAll() {
    alert("Clicked Clear All"); // Replace this line with your code.
}