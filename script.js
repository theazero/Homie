// Toggle dark mode
document.getElementById("darkModeSwitch").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});

// Variables
let person1 = "Person 1";
let person2 = "Person 2";
let timeData = { person1: 0, person2: 0 };

// Save Names
document.getElementById('saveNames').addEventListener('click', () => {
    person1 = document.getElementById('person1').value || "Person 1";
    person2 = document.getElementById('person2').value || "Person 2";
    document.getElementById('saveNames').style.display = "none";
    document.getElementById('personSelect').options[0].text = person1;
    document.getElementById('personSelect').options[1].text = person2;
});

// Add Task with Enter Key
document.addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
        document.getElementById('addTask').click();
    }
});

// Add Task
document.getElementById('addTask').addEventListener('click', () => {
    const task = document.getElementById('taskSelect').value;
    const time = parseInt(document.getElementById('taskTime').value);
    const person = document.getElementById('personSelect').value;
    const date = new Date().toLocaleDateString();

    if (!time) {
        alert("Please enter the time spent on the task.");
        return;
    }

    timeData[person] += time;

    const taskList = document.getElementById('taskList');
    const listItem = document.createElement('li');
    const personName = person === "person1" ? person1 : person2;
    listItem.textContent = `${date}: ${task} (${time} minutes) - ${personName}`;
    taskList.appendChild(listItem);

    updateComparison();
});

// Update Comparison
function updateComparison() {
    const { person1: person1Time, person2: person2Time } = timeData;
    let comparisonText = "";

    if (person1Time > person2Time) {
        comparisonText = `${person2} needs to add ${person1Time - person2Time} more minutes to match ${person1}.`;
    } else if (person2Time > person1Time) {
        comparisonText = `${person1} needs to add ${person2Time - person1Time} more minutes to match ${person2}.`;
    } else {
        comparisonText = "Both have contributed equally in terms of time!";
    }

    document.getElementById('comparison').textContent = comparisonText;
}
