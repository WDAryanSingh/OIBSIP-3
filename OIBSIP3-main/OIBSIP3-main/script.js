let tasks = [];

// ADD TASK
function addTask() {
    const input = document.getElementById("taskInput");
    const text = input.value.trim();

    if (text === "") return;

    tasks.push({
        id: Date.now(),
        text,
        status: "pending",
        createdAt: new Date(),
        completedAt: null
    });

    input.value = "";
    renderTasks();
}

// RENDER TASKS
function renderTasks() {
    const pendingList = document.getElementById("pendingTasks");
    const completedList = document.getElementById("completedTasks");

    pendingList.innerHTML = "";
    completedList.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement("li");

        li.innerHTML = `
            <strong>${task.text}</strong><br>
            <small>Added: ${task.createdAt.toLocaleString()}</small>
            ${task.completedAt ? `<br><small>Completed: ${task.completedAt.toLocaleString()}</small>` : ""}
            <div class="task-actions">
                ${task.status === "pending"
                    ? `<button onclick="completeTask(${task.id})">Complete</button>`
                    : `<button onclick="undoTask(${task.id})">Undo</button>`}
                <button onclick="editTask(${task.id})">Edit</button>
                <button onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;

        task.status === "pending"
            ? pendingList.appendChild(li)
            : completedList.appendChild(li);
    });
}

// COMPLETE TASK
function completeTask(id) {
    const task = tasks.find(t => t.id === id);
    task.status = "completed";
    task.completedAt = new Date();
    renderTasks();
}

// UNDO TASK
function undoTask(id) {
    const task = tasks.find(t => t.id === id);
    task.status = "pending";
    task.completedAt = null;
    renderTasks();
}

// DELETE TASK
function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    renderTasks();
}

// EDIT TASK
function editTask(id) {
    const task = tasks.find(t => t.id === id);
    const newText = prompt("Edit task:", task.text);
    if (newText) {
        task.text = newText;
        renderTasks();
    }
}
