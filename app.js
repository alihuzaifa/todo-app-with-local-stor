let form = document.querySelector(`form`);
let todo = document.querySelector(`#todo`);
let ls = localStorage.getItem(`todos`);
let add = document.querySelector("#add");
let taskList = [];

// add task in local storage
const addTask = () => {
    if(todo.value.length >= 2){
        let getStorageData = localStorage.getItem("todo-task");
        if(getStorageData){
            getStorageData = JSON.parse(getStorageData);
            taskList = getStorageData
        }
        taskList.push(todo.value);
        taskList = JSON.stringify(taskList);
        localStorage.setItem("todo-task",taskList)
    
    }
    todo.value = "";
    location.reload()
}

let ul = document.querySelector(".main-list")

let checkItem = localStorage.getItem("todo-task");
checkItem = JSON.parse(checkItem)
// Render storage data into web page
const renderList = () => {
    if(checkItem){
        for(let i = 0; i < checkItem.length; i++){
            // Elements creator
            let li = document.createElement(`LI`);
            let textContainer = document.createElement(`div`);
            let btnsContainer = document.createElement(`div`);
            let edit = document.createElement(`button`);
            let editText = document.createTextNode(`Edit`)
            edit.appendChild(editText)
            let del = document.createElement(`button`);
            let delText = document.createTextNode(`del`)
            del.appendChild(delText)
            
            // Adding properties to Elements
            li.setAttribute("class","list-items");
            li.classList.add(`list-items`);
            textContainer.setAttribute(`class`,`text`);
            textContainer.classList.add(`text`)
            let textContainerText = document.createTextNode(checkItem[i])
            textContainer.appendChild(textContainerText)
            btnsContainer.setAttribute(`class`,`all-buttons`);
            btnsContainer.classList.add(`all-buttons`)
            edit.setAttribute(`class`,`edit`);
            edit.setAttribute("onclick","editCurrentItem(this)")
            edit.classList.add(`edit`);
            del.setAttribute(`class`,`del`);
            del.setAttribute('onclick','delCurrentItem(this)')
            del.classList.add(`del`)
        
            // Combining all elements
            btnsContainer.appendChild(edit),
            btnsContainer.appendChild(del)
            li.appendChild(textContainer)
            li.appendChild(btnsContainer)
            ul.appendChild(li)
            }
    }
    
}
renderList()

// Delete All
const delAll = () => {
    localStorage.removeItem("todo-task")
    location.reload()
}

// Deleted selsected item
const delCurrentItem = (delItem) => {
    let currentItem = delItem;
    currentItem = currentItem.parentNode.parentNode.firstChild.innerHTML
    currentItem = String(currentItem);
    let completeData = localStorage.getItem("todo-task");
    completeData = JSON.parse(completeData);
    let currentIndex = completeData.indexOf(currentItem);
    let modification = completeData.splice(currentIndex,1);
    completeData = JSON.stringify(completeData)
    localStorage.setItem("todo-task",completeData)
    location.reload()
}

let storeValue;
// Edit selected item
const editCurrentItem = (editItem) => {
    let storeEditItem = editItem;
    storeEditItem = storeEditItem.parentNode.parentNode.firstChild.innerHTML;
    storeValue = storeEditItem
    todo.value = storeEditItem;
    add.innerHTML = "Save"
    add.setAttribute("onclick","saveItem()")
}

// Save Item
const saveItem = () => {
    let getStorageData = localStorage.getItem("todo-task");
    getStorageData = JSON.parse(getStorageData)
    let currentIndex = getStorageData.indexOf(storeValue)
    let modification = getStorageData.splice(currentIndex,1,todo.value);
    getStorageData = JSON.stringify(getStorageData)
    localStorage.setItem("todo-task",getStorageData)
    add.innerHTML = "Add";
    add.setAttribute("onclick","addTask()")
    storeValue = undefined;
    location.reload()
}