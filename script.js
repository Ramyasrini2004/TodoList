var popupBox = document.querySelector('.popupBox')
var popupBoxOverlay = document.querySelector('.popupBox-Overlay')
var add = document.getElementById('add-title')
var cancel = document.getElementById('cancel-popup')
var addbtn = document.getElementById('addbtn')
var overallContainer = document.querySelector('.overall-container')
var getTitle = document.getElementById('title')

var selectContainer = document.getElementById('selectContainer')
var selectTag = document.getElementById('selectTag')

// Function to save data to local storage
function saveData() {
    const data = [];
    document.querySelectorAll('.subcontainer').forEach(container => {
        const title = container.querySelector('.titleTag').textContent;
        const tasks = [];
        container.querySelectorAll('p').forEach(taskItem => {
            tasks.push(taskItem.textContent.replace('• ', '')); // Store just the task text
        });
        data.push({ title: title, tasks: tasks });
    });
    localStorage.setItem('todoAppData', JSON.stringify(data));
}

// Function to load data from local storage
function loadData() {
    const storedData = localStorage.getItem('todoAppData');
    if (storedData) {
        const data = JSON.parse(storedData);
        data.forEach(item => {
            // Recreate the container
            var newContainer = document.createElement('div')
            newContainer.setAttribute('class', 'subcontainer')
            newContainer.innerHTML = `<h1 class="titleTag">${item.title}</h1>
            <button type="button" id="cancel" onclick="removeList(event)">x</button>`
            overallContainer.appendChild(newContainer)

            // Recreate the tasks within the container
            item.tasks.forEach(taskText => {
                const taskItem = document.createElement('p');
                taskItem.textContent = '• ' + taskText;
                taskItem.style.marginTop = '10px';
                taskItem.style.fontSize = '18px';
                taskItem.style.cursor = 'pointer';
                taskItem.addEventListener('dblclick', () => {
                    taskItem.remove();
                    saveData(); // Save data after removing a task
                });
                newContainer.appendChild(taskItem);
            });

            // Add the option to the select dropdown
            var optionTag = document.createElement('option');
            optionTag.value = item.title
            optionTag.textContent = item.title
            selectTag.appendChild(optionTag)
        });
    }
}

// Load data when the page loads
document.addEventListener('DOMContentLoaded', loadData);


addbtn.addEventListener('click', function () {
    popupBox.style.display = 'block';
    popupBoxOverlay.style.display = 'block';
})

cancel.addEventListener('click', function (event) {
    event.preventDefault()
    popupBox.style.display = 'none';
    popupBoxOverlay.style.display = 'none';
})

add.addEventListener('click', function (event) {
    event.preventDefault()
    var newContainer = document.createElement('div')
    newContainer.setAttribute('class', 'subcontainer')
    newContainer.innerHTML = `<h1 class="titleTag">${getTitle.value}</h1>
    <button type="button" id="cancel" onclick="removeList(event)">x</button>`

    overallContainer.appendChild(newContainer)

    var optionTag = document.createElement('option');
    optionTag.value = getTitle.value
    optionTag.textContent = getTitle.value

    selectTag.appendChild(optionTag)

    getTitle.value = '';
    popupBox.style.display = 'none';
    popupBoxOverlay.style.display = 'none';

    saveData(); // Save data after adding a new container
})

function removeList(event) {
    const container = event.target.parentElement;
    // Get the container title
    title = container.querySelector('.titleTag').textContent;
    // Remove the container
    container.remove();

    // Remove the corresponding option from select dropdown
    const options = selectTag.querySelectorAll('option');
    options.forEach(option => {
        if (option.value === title) {
            option.remove();
        }
    });
    saveData(); // Save data after removing a container
}

const getTask = document.querySelector('.getTask');
const addTaskBtn = document.getElementById('addTaskBtn');

addTaskBtn.addEventListener('click', function () {
    const selectedTitle = selectTag.value;
    const taskValue = getTask.value.trim();

    if (taskValue === '') return;

    const containers = document.querySelectorAll('.subcontainer');
    let matchedContainer = null;

    containers.forEach(container => {
        const title = container.querySelector('.titleTag').textContent;
        if (title === selectedTitle) {
            matchedContainer = container;
        }
    });

    if (matchedContainer) {
        const taskItem = document.createElement('p');
        taskItem.textContent = '• ' + taskValue;
        taskItem.style.marginTop = '10px';
        taskItem.style.fontSize = '18px';
        taskItem.style.cursor = 'pointer';

        // When user double-clicks the task, remove it
        taskItem.addEventListener('dblclick', () => {
            taskItem.remove();
            saveData(); // Save data after removing a task
        });

        matchedContainer.appendChild(taskItem);
    }

    getTask.value = '';
    saveData(); // Save data after adding a new task
});