const draggableList = document.getElementById('draggableList');
const submitButton = document.getElementById('submitButton');

const list = [
    "Jeff Bezos",
    "Bill Gates",
    "Warren Buffett",
    "Bernard Arnault",
    "Carlos Slim Helu",
    "Amancio Ortega",
    "Larry Ellison",
    "Mark Zuckerberg",
    "Micheal Bloomberg",
    "Larry Page",
];


//got to know in array direct assignment, the reference is copied, not the value.
//so we have to use splice or spread operator. 
let currentList = [...list];

function dragEventHandler() {
    const draggableItems = document.querySelectorAll('.draggable-item');
    draggableItems.forEach(item => {
        item.addEventListener('dragstart', dragstartHandler);
        item.addEventListener('dragover', dragoverHandler);
        item.addEventListener('drop', dropHandler);
        //for the hover effect on drag and drop.
        item.addEventListener('dragleave', dragleaveHandler);
    })
}

function dragstartHandler(ev) {
    ev.dataTransfer.setData("text/plain", ev.target.id);
}

function dragoverHandler(ev) {
    ev.preventDefault(); 
    document.querySelectorAll('.draggable-item').forEach(item => item.classList.remove('drag-over'));
    const dropTarget = ev.target.closest('.draggable-item');
    if (dropTarget) {
        dropTarget.classList.add('drag-over');
    }
}

function dragleaveHandler(ev) {
    const dropTarget = ev.target.closest('.draggable-item');
    if (dropTarget) {
        dropTarget.classList.remove('drag-over');
    }
}

//fix2 : separated updating the list on drop.
function updateList() {
     //update the list.
    let items = document.querySelectorAll('.draggable-item');
    //to clear the current list.
    currentList.splice(0, currentList.length);
    items.forEach(item => {
        const personName = item.querySelector('.personName').textContent;
        currentList.push(personName);
    });
    console.log(currentList);
}

function swapLists(draggedElement, dropTarget) {
    const draggedCopy = draggedElement.cloneNode(true);
    const dropCopy = dropTarget.cloneNode(true);

    //id conflict was creating issues, so added -copy to the id.
    draggedCopy.id = draggedElement.id + "-copy";
    dropCopy.id = dropTarget.id + "-copy";

    console.log(draggedCopy, dropCopy);
    draggedElement.parentNode.replaceChild(dropCopy, draggedElement);
    dropTarget.parentNode.replaceChild(draggedCopy, dropTarget);
    draggedCopy.addEventListener('dragstart', dragstartHandler);
    draggedCopy.addEventListener('dragover', dragoverHandler);
    draggedCopy.addEventListener('drop', dropHandler);

    dropCopy.addEventListener('dragstart', dragstartHandler);
    dropCopy.addEventListener('dragover', dragoverHandler);
    dropCopy.addEventListener('drop', dropHandler);
}

function dropHandler(ev) {
    ev.preventDefault();
    const draggedItemId = ev.dataTransfer.getData("text/plain");
    const draggedElement = document.getElementById(draggedItemId);
    const dropTarget = ev.target.closest('.draggable-item');

    
    //to remove the drag-over class from the drop target.
    document.querySelectorAll('.draggable-item').forEach(item =>
        item.classList.remove('drag-over')
    );

    //noticed dropping in the same place had no change.
    if(!dropTarget || draggedElement === dropTarget) return;


    // let temp = draggedElement.innerHTML;
    // draggedElement.innerHTML = dropTarget.innerHTML;
    // dropTarget.innerHTML = temp;

    //fixed logic to swap all components, will change to function.
    swapLists(draggedElement, dropTarget);
    updateList();
}

function shuffleArray(array) {
    //from gfg, code for fisher-yates shuffle algorithm.
    for (let i = array.length - 1; i > 0; i--) { 
    
        // Generate random index 
        const j = Math.floor(Math.random() * (i + 1));
                    
        // Swap elements at indices i and j
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function startGame() {
    submitButton.addEventListener('click', submitButtonAction);
    currentList = shuffleArray(currentList);
    loadList();
    dragEventHandler();
}

//fix1 : separated code to load list.
function loadList() {
    currentList.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.className = "flex justify-center";
        listItem.innerHTML = `
            <div class="sortItem">
                <p>${index + 1}</p>
                <div draggable="true" class="draggable-item" id="item-${index}">
                    <div class="personName">${item}</div>
                    <span style="font-size: 24px;" class="mr-2">☰</span>
                </div>
            </div>
        `
        draggableList.appendChild(listItem);
    })
}

function submitButtonAction() {
    const newItems = document.querySelectorAll('#draggableList li');
    const newList = [];
    console.log(list);
    newItems.forEach((item, index) => {
        const itemName = item.querySelector('.personName').textContent;
        newList.push(itemName);
        console.log(newList[index], list[index]);
        //removed existing classes to avoid cascading effects.
        item.querySelector('.personName').classList.remove('text-green-500', 'text-red-500');
        if(newList[index] === list[index]) {
            item.querySelector('.personName').classList.add('text-green-500');
        }
        else {
            item.querySelector('.personName').classList.add('text-red-500');
        }
    })
}



startGame();