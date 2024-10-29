
let person1 = "Person 1";
let person2 = "Person 2";
let timeData = { person1: 0, person2: 0 }; 

document.getElementById('saveNames').addEventListener('click', () => {
    person1 = document.getElementById('person1').value || "Person 1";
    person2 = document.getElementById('person2').value || "Person 2";
    alert(`Names saved: ${person1} and ${person2}`);
});

document.getElementById('addTask').addEventListener('click', () => {
    const task = document.getElementById('taskSelect').value;
    const time = parseInt(document.getElementById('taskTime').value);
    const person = document.getElementById('personSelect').value;
    const date = new Date().toLocaleDateString();

    if (!time) {
        alert("Please enter the time spent on the task.");
        return;
    }

    if (person === "person1") {
        timeData.person1 += time;
    } else {
        timeData.person2 += time;
    }

    const taskList = document.getElementById('taskList');
    const listItem = document.createElement('li');
    const personName = person === "person1" ? person1 : person2;
    listItem.textContent = `${date}: ${task} (${time} minutes) - ${personName}`;
    taskList.appendChild(listItem);

    updateComparison();
});

 function updateComparison() {
    const person1Time = timeData.person1;
    const person2Time = timeData.person2;
    let comparisonText = "";

    if (person1Time > person2Time) {
        const difference = person1Time - person2Time;
        comparisonText = `${person2} needs to add ${difference} more minutes to match ${person1}.`;
    } else if (person2Time > person1Time) {
        const difference = person2Time - person1Time;
        comparisonText = `${person1} needs to add ${difference} more minutes to match ${person2}.`;
    } else {
        comparisonText = "Both have contributed equally in terms of time!";
    }

   
    document.getElementById('comparison').textContent = comparisonText;
}
