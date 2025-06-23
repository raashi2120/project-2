
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



function updateTodoList(filter = "all") {
    todoListUL.innerHTML = "";
    allTodos.forEach((todo, todoIndex) => {
        const shouldInclude =
            filter === "all" ||
            (filter === "completed" && todo.completed) ||
            (filter === "uncompleted" && !todo.completed);

        if (shouldInclude) {
            const todoItem = createTodoItem(todo, todoIndex);
            todoListUL.append(todoItem);
        }
    });


    document.getElementById("completed-task").innerHTML = `<h1>COMPLETED: ${allTodos.filter(t => t.completed).length}</h1>`;
    document.getElementById("total-task").innerHTML = `<h1>TOTAL TASK: ${allTodos.length}</h1>`;
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

    const editButton = todoLI.querySelector(".edit-task");
    const todoTextLabel = todoLI.querySelector(".todo-text");

    editButton.addEventListener("click", () => {
        const editInput = document.createElement("input");
        editInput.type = "text";
        editInput.value = todo.text;
        editInput.className = "edit-input";
        editInput.style.flexGrow = "1";
        editInput.style.padding = "8px";
        todoLI.replaceChild(editInput, todoTextLabel);
        editInput.focus();

        
        function saveEdit() {
            const newText = editInput.value.trim();
            if (newText.length > 0) {
                allTodos[todoIndex].text = newText;
                saveTodo();
                updateTodoList();
            } else {
                updateTodoList(); 
            }
        }

        editInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                saveEdit();
            }
        });

        editInput.addEventListener("blur", saveEdit);
    });


    const checkbox = todoLI.querySelector("input");
    checkbox.checked = todo.completed;

    checkbox.addEventListener("change", () => {
        allTodos[todoIndex].completed = checkbox.checked;
        saveTodo();
        updateTodoList();


    });

    return todoLI;

};

function deleteTodoItem(todoIndex) {
    allTodos = allTodos.filter((_, i) => i !== todoIndex);
    saveTodo();
    updateTodoList();
};

const filterSelect = document.getElementById("filter-select");
filterSelect.addEventListener("change", (e) => {
    const selectedFilter = e.target.value;
    updateTodoList(selectedFilter);
});



