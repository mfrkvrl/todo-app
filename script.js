let form=document.querySelector("#todo-form")
let todoInput=document.querySelector("#todo")
let firstCardBody=document.querySelectorAll(".card-body")[0]
let secondCardBody=document.querySelectorAll(".card-body")[1]
let listGroup=document.querySelector(".list-group")
let clearTodosButton=document.querySelector("#clear-todos")
let filter=document.querySelector("#filter")

eventListeners()

function eventListeners(){

    form.addEventListener("submit",addTodo)
    document.addEventListener("DOMContentLoaded",addAllTodosToUI)
    secondCardBody.addEventListener("click",removeTodo)
    clearTodosButton.addEventListener("click",clearTodos)
    filter.addEventListener("keyup",filterTodos)
}
function filterTodos(e){
    let filtered=e.target.value.toLowerCase()
    let listItems=document.querySelectorAll(".list-group-item")

    listItems.forEach(function(listItem){
        const text=listItem.textContent.toLocaleLowerCase()
        if(text.indexOf(filtered)===-1){
            listItem.setAttribute("style","display:none !important")
        }
        else{
            listItem.setAttribute("style","display: block")
        }
    })
}

function clearTodos(){
    localStorage.clear()
    listGroup.textContent=""
}

function removeTodo(e){
    if(e.target.className==="fa fa-remove"){
        removeTodoFromUI(e.target.parentElement.parentElement)
        removeTodoFromStorage(e.target.parentElement.parentElement.textContent)
    }
}

function removeTodoFromStorage(deletedTodo){
    let todos=getTodosFromStorage()
    todos.forEach(function(todo,i){
        if(todo.toLowerCase()===deletedTodo.toLowerCase()){
            todos.splice(i,1)
            localStorage.setItem("todos",JSON.stringify(todos))
            // console.log(todo)
        }

    })
}

function removeTodoFromUI(target){
    target.remove()
    addAlert("info","Todo Silindi!")
}

function addAllTodosToUI(){
    let todos=getTodosFromStorage()
    todos.forEach(function(todo){
        addTodoToUI(todo)
    })
    
}

function addTodo(e){

let newTodo=todoInput.value.trim()
if(newTodo!=""){
    addTodoToUI(newTodo)
    addTodoToStorage(newTodo)
    addAlert("success","Todo Başarıyla Eklendi!")
    todoInput.value=""
}
else{
    addAlert("danger","Todo Alanını Boş Bırakmayın!")
}

e.preventDefault()
}



function getTodosFromStorage(){
    let todos;
    if(localStorage.getItem("todos")===null){
        todos=[]
    }
    else{
        todos=JSON.parse(localStorage.getItem("todos"))
    }
    return todos;
}

function addTodoToStorage(newTodo){
    let todos=getTodosFromStorage()
    todos.push(newTodo)
    localStorage.setItem("todos",JSON.stringify(todos))

}
function addAlert(type,message){
    let newAlert=document.createElement("div")

    newAlert.className=`alert alert-${type}`
    newAlert.textContent=message
    firstCardBody.appendChild(newAlert)

    setTimeout(function(){
        newAlert.remove()},2000)
}

function addTodoToUI(newTodo){
// list item oluşturuldu
let listItem=document.createElement("li")
listItem.className="list-group-item d-flex justify-content-between"
//link item oluşturuldu
let link=document.createElement("a")
link.href="#"
link.className="delete-item"
link.innerHTML="<i class = 'fa fa-remove'></i>"

listItem.appendChild(document.createTextNode(newTodo))

listItem.appendChild(link)
listGroup.appendChild(listItem)
}