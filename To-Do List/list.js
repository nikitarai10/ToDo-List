const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filteroption = document.querySelector('.filter-todo');

todoButton.addEventListener('click',addTodo);
todoList.addEventListener('click',deletecheck);
filteroption.addEventListener('click',filtertodo);
document.addEventListener('DOMContentLoaded',GetTodo);

function addTodo(event)
{
    //prevent form fro submiting
    event.preventDefault();
    //todo-div
    const todoDiv= document.createElement("div");
    todoDiv.classList.add("todo");
    //li
    const newTodo = document.createElement('li');
    newTodo.innerText =todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    //ADD TODO TO LOCALSTORAGE
    saveLocalTodos(todoInput.value);

    //check button
    const completeButton  = document.createElement("button");
    completeButton.innerHTML= '<i class="fa-solid fa-circle-check"></i>';
    completeButton.classList.add('complete-btn');
    todoDiv.appendChild(completeButton);
     //trash button
     const trashButton  = document.createElement("button");
     trashButton.innerHTML= '<i class="fa-solid fa-trash"></i>';
     trashButton.classList.add('trash-btn');
     todoDiv.appendChild(trashButton);
     //Append to List
     todoList.appendChild(todoDiv);
     //clear todo input value
     todoInput.value="";

}


function deletecheck(e)
{
    const item = e.target;
    //delete
    if(item.classList.contains("trash-btn"))
    // if(item.classList[0]==='trash-btn')
    {
        const todo = item.parentElement;
        todo.classList.add('fall');
        removeLocalTodos(todo);
        todo.addEventListener('transitionend',()=>{
            todo.remove();
        })
    }

    if(item.classList[0]==="complete-btn")
    {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }

}


function filtertodo(e)
{
    const todos  = todoList.childNodes;
    todos.forEach(function(todo)
    {
        switch(e.target.value)
        {
            case "all":
                todo.style.display = "flex";
                break;
                case "completed":
                    if(todo.classList.contains("completed"))
                    {
                        todo.style.display = "flex";
                    }
                    else{
                        todo.style.display ="none";
                    }
                    break;
                    case "incomplete":
                        if(!todo.classList.contains('completed'))
                        {
                            todo.style.display="flex";
                        }
                        else{
                            todo.style.display = "none";
                        }
                        break;

        }
    });
}


function saveLocalTodos(todo)
{
    let todos;
    // const todos= [];
    if(localStorage.getItem('todos')==null)
    {
        todos=[];
    }
    else{
        todos=JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem("todos",JSON.stringify(todos));
}


function GetTodo()
{
    let todos;
    if(localStorage.getItem('todos')==null)
    {
        todos=[];
    }
    else{
        todos=JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach((todo)=>{
        const todoDiv= document.createElement("div");
        todoDiv.classList.add("todo");
        //li
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
    
        //check button
        const completeButton  = document.createElement("button");
        completeButton.innerHTML= '<i class="fa-solid fa-circle-check"></i>';
        completeButton.classList.add('complete-btn');
        todoDiv.appendChild(completeButton);
         //trash button
         const trashButton  = document.createElement("button");
         trashButton.innerHTML= '<i class="fa-solid fa-trash"></i>';
         trashButton.classList.add('trash-btn');
         todoDiv.appendChild(trashButton);
         //Append to List
         todoList.appendChild(todoDiv);
    })
}

function removeLocalTodos(todo)
{
    let todos;
    if(localStorage.getItem('todos')==null)
    {
        todos=[];
    }
    else{
        todos=JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText; //returns text of li
    // console.log(todoIndex);
    todos.splice(todos.indexOf(todoIndex),1);    //search for the todo-text in the todos i.e localstorage value & returns index of the text and remove
    localStorage.setItem('todos',JSON.stringify(todos)); //remove the deleted list and set a new one
     
}