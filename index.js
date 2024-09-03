// Initial data for both persons
let person1Tasks = [];
let person2Tasks = [];

// Function to add task
function addTask(person, task, time, unit) {
    let timeInMinutes = unit === 'hours' ? time * 60 : time;

    // Add the task to the appropriate person's list
    if (person === 1) {
        person1Tasks.push({ task, time: timeInMinutes });
    } else if (person === 2) {
        person2Tasks.push({ task, time: timeInMinutes });
    } else {
        console.log("Invalid person. Choose 1 or 2.");
    }
}

// Function to calculate total time
function calculateTotalTime(tasks) {
    return tasks.reduce((total, task) => total + task.time, 0);
}

// Function to check equality
function checkEquality() {
    let person1Time = calculateTotalTime(person1Tasks);
    let person2Time = calculateTotalTime(person2Tasks);

    console.log(`Person 1 has done ${person1Time} minutes of tasks.`);
    console.log(`Person 2 has done ${person2Time} minutes of tasks.`);

    if (person1Time > person2Time) {
        console.log(`Person 2 needs to do ${person1Time - person2Time} more minutes to be equal.`);
    } else if (person2Time > person1Time) {
        console.log(`Person 1 needs to do ${person2Time - person1Time} more minutes to be equal.`);
    } else {
        console.log("Both persons have done an equal amount of work.");
    }
}

// Example usage
addTask(1, 'Diska', 30, 'minutes');
addTask(2, 'Dammsuga', 1, 'hours');
addTask(1, 'Tvätta', 45, 'minutes');
addTask(2, 'Laga mat', 90, 'minutes');

checkEquality();
