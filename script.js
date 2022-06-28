let genM;
let genF;

function generateChancesAndGraph() {
    genM = document.getElementById("genM").value;
    genF = document.getElementById("genF").value;
    let form = document.getElementById("genForm");
    document.getElementById("results").innerHTML = genM + genF;
}