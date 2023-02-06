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
    let fullGens: FullGen[] = [];
    console.log("Starting value thing");
    const cartesian: Function = (...arrays: any) => {
        arrays.reduce((accumulator:any, currentValue:any) => 
        accumulator.flatMap((d:any) => {
            //console.log(d);
            currentValue.map((e:any) => [d, e].flat());
        }));
        console.log(arrays);
    };
    const output: string[][] = cartesian(combinedGens);
    output.forEach(value => console.log(value));
}

function createPairs(inputString: string, allGens: string[][], i: number, output: string[]) {
    for (let j = 0; j < allGens[i].length; j++) {
        if (i == allGens.length - 1) {
            output.push(inputString + allGens[i][j]);
            console.log("Pushed: " + inputString + allGens[i][j]);
            continue;
        }
        createPairs(inputString + allGens[i][j], allGens, i, output);
    }
}

function createPairs1(inputString: string, genCombos: string[]): string[] {
    let createdDNA: string[] = [];
    genCombos.forEach(genCombo => {
        createdDNA.push(inputString + genCombo);
    });
    return createdDNA;
}

function idkf(yes:string[][]): any {
    let combos: string[] = [];
    for (let i = 0; i < yes[0].length; i++) {
        const element1 = yes[0][i];
        for (let j = 0; j < yes[1].length; j++) {
            const element2 = yes[1][j];
            for (let k = 0; k < yes[2].length; k++) {
                const element3 = yes[2][k];
                combos.push(element1+element2+element3);
            }
        }
    }
}

function createDNA(genCombos: string[][]): string[] {
    let createdDNACombos: string[] = [];

    return createdDNACombos;
}