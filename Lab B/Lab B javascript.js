document.addEventListener("DOMContentLoaded", () => {
    const taskList = document.getElementById("task-list");
    const searchInput = document.getElementById("search");
    const newTaskText = document.getElementById("text");
    const newTaskDate = document.getElementById("date");
    const addTaskButton = document.getElementById("add");

    // Add a button to delete selected tasks
    const deleteSelectedButton = document.createElement("button");
    deleteSelectedButton.textContent = "Usuń zaznaczone";
    deleteSelectedButton.onclick = deleteSelectedTasks;
    document.querySelector(".task-container").appendChild(deleteSelectedButton);

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    function renderTasks(filter = "") {
        taskList.innerHTML = "";
        tasks.forEach((task, index) => {
            if (filter && !task.text.includes(filter)) return;

            const li = document.createElement("li");
            li.classList.add("task-item");

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.classList.add("task-checkbox");

            const span = document.createElement("span");
            span.innerHTML = filter ? task.text.replace(new RegExp(`(${filter})`, 'gi'), '<span class="highlight">$1</span>') : task.text;
            span.onclick = () => startEditingTask(index, span);

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Usuń";
            deleteButton.onclick = () => deleteTask(index);

            li.append(checkbox, span, deleteButton);
            taskList.appendChild(li);
        });
    }

    addTaskButton.onclick = () => {
        const text = newTaskText.value.trim();
        const dueDate = newTaskDate.value;
        const now = new Date();

        if (text.length < 3 || text.length > 255) {
            alert("Tekst zadania musi mieć od 3 do 255 znaków.");
            return;
        }
        if (dueDate && new Date(dueDate) <= now) {
            alert("Data musi być pusta albo w przyszłości.");
            return;
        }

        tasks.push({ text, dueDate });
        saveTasks();
        renderTasks();
        newTaskText.value = "";
        newTaskDate.value = "";
    };

    function deleteTask(index) {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    }

    function deleteSelectedTasks() {
        const checkboxes = document.querySelectorAll(".task-checkbox");
        const tasksToDelete = [];
        checkboxes.forEach((checkbox, index) => {
            if (checkbox.checked) {
                tasksToDelete.push(index);
            }
        });
        tasksToDelete.reverse().forEach(index => {
            tasks.splice(index, 1);
        });
        saveTasks();
        renderTasks();
    }

    function startEditingTask(index, span) {
        const input = document.createElement("input");
        input.type = "text";
        input.value = tasks[index].text;

        const saveButton = document.createElement("button");
        saveButton.textContent = "Zapisz";
        saveButton.onclick = () => finishEditingTask(index, input, span);

        const cancelButton = document.createElement("button");
        cancelButton.textContent = "Anuluj";
        cancelButton.onclick = () => cancelEditingTask(span, input);

        const container = document.createElement("div");
        container.appendChild(input);
        container.appendChild(saveButton);
        container.appendChild(cancelButton);

        span.replaceWith(container);
        input.focus();
    }

    function finishEditingTask(index, input, span) {
        const newText = input.value.trim();
        if (newText.length >= 3 && newText.length <= 255) {
            tasks[index].text = newText;
            saveTasks();
            renderTasks(searchInput.value);
        } else {
            alert("Tekst zadania musi mieć od 3 do 255 znaków.");
            input.focus();
        }
    }

    function cancelEditingTask(span, input) {
        span.replaceWith(input);
        renderTasks(searchInput.value);
    }

    searchInput.oninput = () => {
        const filter = searchInput.value.trim();
        if (filter.length >= 2) {
            renderTasks(filter);
        } else {
            renderTasks();
        }
    };

    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    renderTasks();
});