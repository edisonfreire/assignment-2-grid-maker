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
    const table = document.getElementById("grid");

    if (numRows === 0) {
        addR(); // If no rows exist, add a row first
        return;
    }

    const rows = document.getElementsByTagName("tr");
    for (let i = 0; i < rows.length; i++) {
        const newCell = document.createElement("td");
        newCell.style.backgroundColor = "white"; // Default cell color
        newCell.onclick = function () {
            this.style.backgroundColor = colorSelected;
        };
        rows[i].appendChild(newCell);
    }

    numCols++;
}

// Remove a row
function removeR() {
    const table = document.getElementById("grid");

    if (numRows > 0) {
        table.deleteRow(numRows - 1);
        numRows--;

        if (numRows === 0) {
            numCols = 0; // Reset column count when all rows are removed
        }
    }
}

// Remove a column
function removeC() {
    if (numCols > 0) {
        const rows = document.getElementsByTagName("tr");
        for (let i = 0; i < rows.length; i++) {
            rows[i].deleteCell(numCols - 1);
        }
        numCols--;

        if (numCols === 0) {
            // If all columns are removed, clear all rows as well
            const table = document.getElementById("grid");
            while (table.rows.length > 0) {
                table.deleteRow(0);
            }
            numRows = 0;
        }
    }
}

// Set global variable for selected color
function selectColor() {
    colorSelected = document.getElementById("selectedColorId").value;
    console.log(colorSelected);
}

// Fill all uncolored cells
function fillU() {
    const cells = document.getElementsByTagName("td");
    for (let i = 0; i < cells.length; i++) {
        if (cells[i].style.backgroundColor === "white") {
            cells[i].style.backgroundColor = colorSelected;
        }
    }
}

// Fill all cells
function fillAll() {
    const cells = document.getElementsByTagName("td");
    for (let i = 0; i < cells.length; i++) {
        cells[i].style.backgroundColor = colorSelected;
    }
}

// Clear all cells
function clearAll() {
    const cells = document.getElementsByTagName("td");
    for (let i = 0; i < cells.length; i++) {
        cells[i].style.backgroundColor = "white";
    }
}

// Save the grid state to local storage
function saveGrid() {
    const table = document.getElementById("grid");
    const rows = table.getElementsByTagName("tr");
    const gridState = [];

    for (let i = 0; i < rows.length; i++) {
        const row = [];
        const cells = rows[i].getElementsByTagName("td");
        for (let j = 0; j < cells.length; j++) {
            row.push(cells[j].style.backgroundColor); // Store cell colors
        }
        gridState.push(row); // Store each row as an array
    }

    // Save the gridState and dimensions to localStorage
    localStorage.setItem("gridState", JSON.stringify(gridState));
    localStorage.setItem("numRows", numRows);
    localStorage.setItem("numCols", numCols);

    showStatusMessage("Grid state saved successfully!");
}

// Load the grid state from local storage
function loadGrid() {
    const savedGridState = localStorage.getItem("gridState");
    const savedNumRows = localStorage.getItem("numRows");
    const savedNumCols = localStorage.getItem("numCols");

    if (savedGridState && savedNumRows && savedNumCols) {
        const gridState = JSON.parse(savedGridState);
        numRows = parseInt(savedNumRows);
        numCols = parseInt(savedNumCols);

        // Clear the current grid
        const table = document.getElementById("grid");
        table.innerHTML = "";

        // Rebuild the grid based on the saved state
        for (let i = 0; i < gridState.length; i++) {
            const newRow = document.createElement("tr");
            for (let j = 0; j < gridState[i].length; j++) {
                const newCell = document.createElement("td");
                newCell.style.backgroundColor = gridState[i][j]; // Restore saved color
                newCell.onclick = function () {
                    this.style.backgroundColor = colorSelected;
                };
                newRow.appendChild(newCell);
            }
            table.appendChild(newRow);
        }

        showStatusMessage("Grid state loaded successfully!");
    } else {
        showStatusMessage("No saved grid state found.");
    }
}

// Automatically load grid on page refresh
window.onload = function () {
    loadGrid();
};

// Function to update the UI with a status message
function showStatusMessage(message) {
    const statusMessageDiv = document.getElementById("statusMessage");
    statusMessageDiv.textContent = message;  // Set the message
    statusMessageDiv.style.visibility = "visible";  // Make it visible
    setTimeout(() => {
        statusMessageDiv.style.visibility = "hidden";  // Hide the message after 3 seconds
    }, 3000);
}