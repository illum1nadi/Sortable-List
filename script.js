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
    currentList.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.className = "flex justify-center";
        listItem.innerHTML = `
            <div class="flex justify-left items-center border-1 w-70 h-15">
                <p class="w-14 h-14 text-center flex items-center justify-center bg-gray-300 mr-2">${index + 1}</p>
                <div draggable="true" class="w-60 flex justify-between items-center" id="item-${index}">
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
        if(newList[index] === list[index]) {
            item.querySelector('.personName').classList.add('text-green-500');
        }
        else {
            item.querySelector('.personName').classList.add('text-red-500');
        }
    })
}



startGame();