const gens: string[][] = [
    ["A", "At", "a"], 
    ["B", "b"], 
    ["C", "chd", "chl", "ch", "c"],
    ["D", "d"],
    ["E", "Es", "ej", "e"],
    ["V", "v"],
    ["W", "w"]
];

function loadPage() {
    let box = document.getElementById("forms");
    if (box != null) {
        // FEMALE
        let divElementFemale: HTMLDivElement = document.createElement("div");
        divElementFemale.setAttribute("id", "femaleGens");
        // Add text
        let female: HTMLLabelElement = document.createElement("label");
        female.appendChild(document.createTextNode("FEMALE"));
        divElementFemale.appendChild(female);
        divElementFemale.appendChild(document.createElement("br"));
        // Generate selects
        generateSelects(divElementFemale);
        // MALE
        let divElementMale: HTMLDivElement = document.createElement("div");
        divElementMale.setAttribute("id", "maleGens");
        // Add text
        let male: HTMLLabelElement = document.createElement("label");
        male.appendChild(document.createTextNode("MALE"));
        divElementMale.appendChild(male);
        divElementMale.appendChild(document.createElement("br"));
        // Generate selects
        generateSelects(divElementMale);
        // Append to main div
        box.appendChild(divElementFemale);
        box.appendChild(divElementMale);
    }
    
}

function generateSelects(divElement: HTMLDivElement): void {
    gens.forEach(group => {
        let usedGens: string[] = [];
        let selectObject = document.createElement("select");
        group.forEach(firstGen => {
            group.forEach(secondGen => {
                if (usedGens.includes(secondGen)) {
                    return;
                }
                let genCombo: string = firstGen + " " + secondGen;
                let optionObject: HTMLOptionElement = document.createElement("option");
                optionObject.setAttribute("value", genCombo);
                optionObject.appendChild(document.createTextNode(genCombo));
                selectObject.appendChild(optionObject);
            });
            usedGens.push(firstGen);
        });
        divElement.appendChild(selectObject);
        divElement.appendChild(document.createElement("br"));
    });
}

class FullGen {
    gen: string;
    amount: number;

    constructor(gen:string, amount = 0) {
        this.gen = gen;
        this.amount = amount;
    }

    public get getAmount() : number {
        return this.amount;
    }
    
}

function generate(): void {
    let genM: string[] = [];
    let genF: string[] = [];
    let maleGens = document.getElementById("maleGens");
    let femaleGens = document.getElementById("femaleGens");
    if (maleGens == null || femaleGens == null) {
        console.log("Male Gens or Female Gens are null");
        return;
    }
    // Create arrays for 
    maleGens.childNodes.forEach(selectNode => {
        if (selectNode instanceof HTMLSelectElement) {
            genM.push(selectNode.value);
        }
    });
    femaleGens.childNodes.forEach(selectNode => {
        if (selectNode instanceof HTMLSelectElement) {
            genF.push(selectNode.value);
        }
    });
    // Create individual combos
    let combinedGens: string[][] = [];
    for (let i = 0; i < genM.length; i++) {
        const splitMGens:string[] = genM[i].split(" ");
        const splitFGens:string[] = genF[i].split(" ");
        let combinedIndyGens: string[] = [];
        splitMGens.forEach(maleGen => {
            splitFGens.forEach(femaleGen => {
                combinedIndyGens.push(maleGen+femaleGen);
            });
        });
        combinedGens.push(combinedIndyGens);
    }
    // Create individual chances
    if (combinedGens.length == 0) {
        console.log("combinedGens are null");
        return;
    }
    console.log("Starting value thing");
    let output: string[]= [];
    createPairs("", combinedGens, 0, output);
}

function createPairs(inputString: string, allGens: string[][], i: number, output: string[]) {
    for (let j = 0; j < allGens[i].length; j++) {
        if (i == allGens.length - 1) {
            output.push(inputString + allGens[i][j]);
            continue;
        }
        createPairs(inputString + allGens[i][j], allGens, i + 1, output);
    }
}