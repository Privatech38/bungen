let genM: string[];
let genF: string[];

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
        // Append to main div
        box.appendChild(divElementFemale);
        box.appendChild(divElementMale);
    }
    
}

function generateSelects(divElement: HTMLDivElement): void {
    gens.forEach(group => {
        let selectObject = document.createElement("select");
        group.forEach(firstGen => {
            group.forEach(secondGen => {
                let genCombo: string = firstGen + " " + secondGen;
                let optionObject: HTMLOptionElement = document.createElement("option");
                optionObject.setAttribute("value", genCombo);
                optionObject.appendChild(document.createTextNode(genCombo));
                selectObject.appendChild(optionObject);
            });
        });
        divElement.appendChild(selectObject);
        divElement.appendChild(document.createElement("br"));
    });
}

function generate(): void {

}