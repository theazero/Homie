// Variables
let person1 = "Person 1";
let person2 = "Person 2";
let timeData = { person1: 0, person2: 0 };
let completedChores = 0;
let chores = [];
let namesAreSaved = false;

document.getElementById("weekNumber").textContent = getWeekNumber(new Date()).toString().padStart(2, "0");
initCustomSelects();
initModal();

// Save Names
document.getElementById('saveNames').addEventListener('click', () => {
    person1 = document.getElementById('person1').value || "Person 1";
    person2 = document.getElementById('person2').value || "Person 2";
    document.getElementById('saveNames').style.display = "none";
    document.getElementById('personSelect').options[0].text = person1;
    document.getElementById('personSelect').options[1].text = person2;
    refreshCustomSelect('personSelect');
    namesAreSaved = true;
    unlockChoreForm();
    updateComparison();
});

// Add Task with Enter Key
document.addEventListener('keydown', (event) => {
    if (event.key === "Enter" && namesAreSaved) {
        document.getElementById('addTask').click();
    }
});

// Add Task
document.getElementById('addTask').addEventListener('click', () => {
    if (!namesAreSaved) {
        showModal("One thing first", "Save the household names before adding chores.");
        return;
    }

    const taskSelect = document.getElementById('taskSelect');
    const task = taskSelect.value;
    const taskLabel = taskSelect.options[taskSelect.selectedIndex].text;
    const time = parseInt(document.getElementById('taskTime').value, 10);
    const person = document.getElementById('personSelect').value;
    const date = new Date().toLocaleDateString();

    if (!time || time < 1) {
        showModal("Missing minutes", "Add how many minutes this chore took before logging it.");
        return;
    }

    timeData[person] += time;
    completedChores += 1;
    chores.push({ task, taskLabel, time, person, date });

    const taskList = document.getElementById('taskList');
    const listItem = document.createElement('li');
    const personName = person === "person1" ? person1 : person2;
    listItem.textContent = `${date}: ${taskLabel} (${time} minutes) - ${personName}`;
    taskList.appendChild(listItem);

    document.getElementById('taskTime').value = "";
    updateComparison();
});

function unlockChoreForm() {
    const nameForm = document.querySelector('.name-grid');
    const choreForm = document.getElementById('choreForm');
    const formNote = nameForm.querySelector('.form-note');

    formNote.textContent = `${person1} and ${person2}`;
    nameForm.classList.add('is-complete');
    choreForm.classList.remove('is-locked');
    choreForm.classList.add('is-unlocked');
    choreForm.setAttribute('aria-hidden', 'false');
}

function initCustomSelects() {
    document.querySelectorAll('.custom-select').forEach((customSelect) => {
        const select = document.getElementById(customSelect.dataset.select);
        const trigger = document.createElement('button');
        const optionsList = document.createElement('ul');

        trigger.type = "button";
        trigger.className = "custom-select-trigger";
        optionsList.className = "custom-select-options";
        customSelect.appendChild(trigger);
        customSelect.appendChild(optionsList);

        trigger.addEventListener('click', () => {
            closeCustomSelects(customSelect);
            customSelect.classList.toggle('is-open');
        });

        refreshCustomSelect(select.id);
    });

    document.addEventListener('click', (event) => {
        if (!event.target.closest('.custom-select')) {
            closeCustomSelects();
        }
    });
}

function refreshCustomSelect(selectId) {
    const select = document.getElementById(selectId);
    const customSelect = document.querySelector(`[data-select="${selectId}"]`);

    if (!customSelect) {
        return;
    }

    const trigger = customSelect.querySelector('.custom-select-trigger');
    const optionsList = customSelect.querySelector('.custom-select-options');
    const selectedOption = select.options[select.selectedIndex];

    trigger.textContent = selectedOption.text;
    optionsList.innerHTML = "";

    Array.from(select.options).forEach((option) => {
        const optionItem = document.createElement('li');
        const optionButton = document.createElement('button');

        optionButton.type = "button";
        optionButton.className = "custom-select-option";
        optionButton.textContent = option.text;

        if (option.value === select.value) {
            optionButton.classList.add('is-selected');
        }

        optionButton.addEventListener('click', () => {
            select.value = option.value;
            refreshCustomSelect(selectId);
            closeCustomSelects();
        });

        optionItem.appendChild(optionButton);
        optionsList.appendChild(optionItem);
    });
}

function closeCustomSelects(exceptSelect) {
    document.querySelectorAll('.custom-select').forEach((customSelect) => {
        if (customSelect !== exceptSelect) {
            customSelect.classList.remove('is-open');
        }
    });
}

function initModal() {
    document.getElementById('modalClose').addEventListener('click', hideModal);
    document.getElementById('appModal').addEventListener('click', (event) => {
        if (event.target.id === 'appModal') {
            hideModal();
        }
    });
}

function showModal(title, message) {
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalMessage').textContent = message;
    document.getElementById('appModal').hidden = false;
}

function hideModal() {
    document.getElementById('appModal').hidden = true;
}

// Update Comparison
function updateComparison() {
    const { person1: person1Time, person2: person2Time } = timeData;
    const totalTime = person1Time + person2Time;
    const person1Percent = totalTime ? Math.round((person1Time / totalTime) * 100) : 50;
    const person2Percent = totalTime ? 100 - person1Percent : 50;
    const balance = Math.abs(person1Time - person2Time);
    let comparisonText = "";

    if (person1Time > person2Time) {
        comparisonText = `${person2} needs to add ${person1Time - person2Time} more minutes to match ${person1}.`;
    } else if (person2Time > person1Time) {
        comparisonText = `${person1} needs to add ${person2Time - person1Time} more minutes to match ${person2}.`;
    } else {
        comparisonText = "Both have contributed equally in terms of time!";
    }

    document.getElementById('comparison').textContent = comparisonText;
    document.getElementById('totalMinutes').textContent = totalTime;
    document.getElementById('completedCount').textContent = completedChores;
    document.getElementById('balanceDue').textContent = `${balance} min`;
    document.getElementById('person1Percent').textContent = `${person1Percent}%`;
    document.getElementById('person2Percent').textContent = `${person2Percent}%`;
    document.getElementById('person1AllocationLabel').textContent = person1;
    document.getElementById('person2AllocationLabel').textContent = person2;
    document.getElementById('person1GraphLabel').textContent = person1;
    document.getElementById('person2GraphLabel').textContent = person2;
    document.getElementById('person1GraphMinutes').textContent = `${person1Time} min`;
    document.getElementById('person2GraphMinutes').textContent = `${person2Time} min`;

    renderAllocationMap();
}

function renderAllocationMap() {
    const personOneMap = document.getElementById('person1ChoreMap');
    const personTwoMap = document.getElementById('person2ChoreMap');

    personOneMap.innerHTML = "";
    personTwoMap.innerHTML = "";

    const personOneChores = chores.filter((chore) => chore.person === "person1");
    const personTwoChores = chores.filter((chore) => chore.person === "person2");

    if (!namesAreSaved) {
        personOneMap.classList.add('is-empty');
        personOneMap.classList.remove('has-chores');
        personTwoMap.classList.add('is-empty');
        personTwoMap.classList.remove('has-chores');
        personOneMap.appendChild(createEmptyAllocation("+", "Add names to begin"));
        personTwoMap.appendChild(createEmptyAllocation("+", "Add names to begin"));
        return;
    }

    if (!personOneChores.length && !personTwoChores.length) {
        personOneMap.classList.add('is-empty');
        personOneMap.classList.remove('has-chores');
        personTwoMap.classList.add('is-empty');
        personTwoMap.classList.remove('has-chores');
        personOneMap.appendChild(createEmptyAllocation(getInitial(person1)));
        personTwoMap.appendChild(createEmptyAllocation(getInitial(person2)));
        return;
    }

    renderPersonChores(personOneMap, personOneChores, "person1");
    renderPersonChores(personTwoMap, personTwoChores, "person2");
}

function renderPersonChores(container, personChores, personKey) {
    const mapHeight = getMapHeight(personChores);

    container.classList.toggle('is-empty', !personChores.length);
    container.classList.toggle('has-chores', Boolean(personChores.length));
    container.style.setProperty('--map-height', `${mapHeight}px`);

    if (!personChores.length) {
        container.appendChild(createEmptyAllocation(getInitial(personKey === "person1" ? person1 : person2), "No chores yet"));
        return;
    }

    personChores.forEach((chore, index) => {
        container.appendChild(createChoreBlock(chore, index));
    });
}

function createChoreBlock(chore, index) {
    const block = document.createElement('div');
    const choreName = document.createElement('strong');
    const choreMeta = document.createElement('span');
    const blockSize = Math.min(215, Math.max(118, 96 + chore.time * 1.9));
    const mapPosition = getMapPosition(index);

    block.className = `chore-block ${chore.person} task-${chore.task}`;
    block.style.setProperty('--block-size', `${blockSize}px`);
    block.style.setProperty('--block-left', mapPosition.left);
    block.style.setProperty('--block-top', mapPosition.top);
    block.style.setProperty('--block-radius', mapPosition.radius);
    choreName.textContent = chore.taskLabel;
    choreMeta.textContent = `${chore.time} min`;

    block.appendChild(choreName);
    block.appendChild(choreMeta);

    return block;
}

function getMapHeight(personChores) {
    if (!personChores.length) {
        return 480;
    }

    return personChores.reduce((height, chore, index) => {
        const blockSize = Math.min(215, Math.max(118, 96 + chore.time * 1.9));
        const position = getMapPosition(index);
        const blockBottom = position.topRem * 16 + blockSize + 48;

        return Math.max(height, blockBottom);
    }, 480);
}

function getMapPosition(index) {
    const pattern = [
        { left: "4%", topRem: 1, radius: "999px" },
        { left: "38%", topRem: 0.5, radius: "47% / 40%" },
        { left: "7%", topRem: 15, radius: "42% / 34%" },
        { left: "46%", topRem: 19, radius: "999px" },
        { left: "18%", topRem: 35, radius: "46% / 38%" },
        { left: "42%", topRem: 41, radius: "999px" },
    ];
    const row = Math.floor(index / pattern.length);
    const position = pattern[index % pattern.length];
    const rowOffset = row * 48;

    return {
        left: position.left,
        top: `${position.topRem + rowOffset}rem`,
        topRem: position.topRem + rowOffset,
        radius: position.radius,
    };
}

function createEmptyAllocation(initial, label = "Equal share") {
    const emptyState = document.createElement('div');
    const initialElement = document.createElement('span');
    const labelElement = document.createElement('p');

    emptyState.className = "empty-allocation";
    initialElement.textContent = initial;
    labelElement.textContent = label;
    emptyState.appendChild(initialElement);
    emptyState.appendChild(labelElement);

    return emptyState;
}

function getInitial(name) {
    return name.trim().charAt(0).toUpperCase() || "?";
}

function getWeekNumber(date) {
    const currentDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    currentDate.setUTCDate(currentDate.getUTCDate() + 4 - (currentDate.getUTCDay() || 7));
    const yearStart = new Date(Date.UTC(currentDate.getUTCFullYear(), 0, 1));

    return Math.ceil((((currentDate - yearStart) / 86400000) + 1) / 7);
}

updateComparison();
