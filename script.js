let genM;
let genF;

const chances = new Map();

function generateChancesAndGraph() {
    genM = document.getElementById("genM").value;
    genF = document.getElementById("genF").value;
    let form = document.getElementById("genForm");
    // Create arrays
    const genMArray = [];
    const genFArray = [];
    for(let i = 0; i < 8; i++) {
        genMArray.push(genM.substring(i, (i+1)));
        genFArray.push(genF.substring(i, (i+1)));
    }
    document.getElementById("results").innerHTML = genMArray.pop(", ") + "; " + genFArray.pop(", ");
}

function calculateChances() {
    for(let i = 0; i < 4; i++) {

    }
}