// retireve todo from local storage or initialize an array


const todoForm = document.querySelector('form');
const todoInput = document.querySelector('#task-input');
const todoListUL = document.querySelector('#todo-list');

let allTodos = getTodos();
updateTodoList();


todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addTodo();

});

function addTodo() {
    const todoText = todoInput.value.trim();
    if (todoText.length > 0) {
        const todoObject = {
            text: todoText,
            completed: false
        }

        allTodos.push(todoObject);
        updateTodoList();
        saveTodo();
        todoInput.value = "";
    }


};



function updateTodoList() {
    todoListUL.innerHTML = "";
    allTodos.forEach((todo, todoIndex) => {

        todoItem = createTodoItem(todo, todoIndex);
        todoListUL.append(todoItem);


    });

}

function saveTodo() {
    const todosJson = JSON.stringify(allTodos);
    localStorage.setItem("todos", todosJson);
}

function getTodos() {
    const todos = localStorage.getItem("todos") || "[]";
    return JSON.parse(todos);
}



function createTodoItem(todo, todoIndex) {
    const todoID = `todo-${todoIndex}`;
    const todoLI = document.createElement("li");
    const todoText = todo.text;
    todoLI.className = "todo";
    todoLI.innerHTML = `
                   <input type="checkbox" id="${todoID}">
                    <label class="custom-checkbox" for="${todoID}">
                        <i class="fa-solid fa-check"></i>
                    </label>
                    <label for="${todoID}" class="todo-text">
                        ${todoText}
                    </label>
                    <button class="edit-task"><i class="fa-solid fa-pen"></i></button>
                    <button class="delete-button"><i class="fa-solid fa-trash"></i></button>

    `

    const deleteButton = todoLI.querySelector(".delete-button");
    deleteButton.addEventListener("click", () => {
        deleteTodoItem(todoIndex);
    });

    const checkbox = todoLI.querySelector("input");
    checkbox.addEventListener("change", () => {
        allTodos[todoIndex].completed = checkbox.checked;
        saveTodo();



    });


    return todoLI;


};

function deleteTodoItem(todoIndex) {
    allTodos = allTodos.filter((_, i) => i !== todoIndex);
    saveTodo();
    updateTodoList();
};


