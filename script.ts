const gens: string[][] = [
    ["A", "At", "a"], 
    ["B", "b"], 
    ["C", "chd", "chl", "ch", "c"],
    ["D", "d"],
    ["E", "Es", "En", "ej", "e"],
    ["M", "m"],
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
        box.appendChild(divElementMale);
        box.appendChild(divElementFemale);
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

    constructor(gen:string, amount = 1) {
        this.gen = gen;
        this.amount = amount;
    }

    public get getAmount() : number {
        return this.amount;
    }

    public incrementAmount(): void {
        this.amount += 1;
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
    // Create combos
    console.log("Creating combos");
    let output: string[]= [];
    createPairs("", combinedGens, 0, output);
    const amount: number = output.length;
    // Count and order
    console.log("Counting and ordering combos");
    const orderedCombos: FullGen[] = countAndOrderCombos(output);
    // Display combos
    console.log("Displaying");
    const resultsDiv: HTMLElement = document.getElementById("results");
    let results: ChildNode[] = [];
    orderedCombos.forEach(combo => {
        let parentNode: HTMLDivElement = document.createElement("div");
        // Gene
        let geneNode: HTMLParagraphElement = document.createElement("p");
        geneNode.setAttribute("class", "geneText");
        geneNode.appendChild(document.createTextNode(combo.gen));
        parentNode.appendChild(geneNode);
        // Percentage
        let percentageNode: HTMLParagraphElement = document.createElement("p");
        percentageNode.setAttribute("class", "percentageText");
        percentageNode.appendChild(document.createTextNode(Math.round(100*(combo.getAmount/amount)) + "%"));
        parentNode.appendChild(percentageNode);
        results.push(parentNode);
    });
    resultsDiv.replaceChildren(...results);
    // Change grid layout
    const childAmount: number = resultsDiv.childNodes.length;
    let columnAmount: number = 0;
    if (childAmount%4 == 0) {
        columnAmount = 4;
    } else if (childAmount%3 == 0) {
        columnAmount = 3;
    } else if (childAmount%2 == 0) {
        columnAmount = 2;
    } else {
        columnAmount = 1;
    }
    let columnStringAmount: string = "";
    for (let i = 0; i < columnAmount; i++) {
        columnStringAmount += " auto"
    }
    console.log("current columns: " + resultsDiv.style.gridTemplateColumns);
    resultsDiv.style.gridTemplateColumns = columnStringAmount;
    console.log("chaning to columns: " + columnStringAmount + " new thing: " + resultsDiv.style.gridTemplateColumns);

}

function createPairs(inputString: string, allGens: string[][], i: number, output: string[]) {
    for (let j = 0; j < allGens[i].length; j++) {
        if (i == allGens.length - 1) {
            output.push(inputString + allGens[i][j]);
            continue;
        }
        createPairs(inputString + allGens[i][j] + " ", allGens, i + 1, output);
    }
}

function countAndOrderCombos(combos: string[]): FullGen[] {
    let fullGens: FullGen[] = [];
    // Count
    for (let i = 0; i < combos.length; i++) {
        const combo = combos[i];
        if (fullGens.length <= 0) {
            fullGens.push(new FullGen(combo));
            continue;
        }
        let contains: boolean = false;
        fullGens.forEach(fullGen => {
            if (fullGen.gen == combo) {
                fullGen.incrementAmount();
                contains = true;
            }
        });
        if (!contains) {
            console.log("Pushing new Fullgen(" + combo + ")");
            fullGens.push(new FullGen(combo));
        }
    }
    // Order
    fullGens.sort((a,b) => a.getAmount - b.getAmount);
    return fullGens;
}