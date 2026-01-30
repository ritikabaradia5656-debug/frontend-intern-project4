const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const filterBtns = document.querySelectorAll(".filters button");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

/* ---------- RENDER TASKS ---------- */
function renderTasks() {
  taskList.innerHTML = "";

  const filteredTasks = tasks.filter(task => {
    if (currentFilter === "completed") return task.completed;
    if (currentFilter === "pending") return !task.completed;
    return true;
  });

  filteredTasks.forEach(task => {
    const li = document.createElement("li");
    if (task.completed) li.classList.add("completed");

    // CHECKBOX
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;

    checkbox.addEventListener("change", () => {
      const originalTask = tasks.find(t => t.id === task.id);
      originalTask.completed = checkbox.checked;
      saveTasks();
    });

    // TASK TEXT
    const span = document.createElement("span");
    span.innerText = task.text;

    // STATUS
    const status = document.createElement("small");
    status.innerText = task.completed ? "Completed" : "Pending";
    status.style.color = task.completed ? "green" : "orange";

    // DELETE
    const delBtn = document.createElement("button");
    delBtn.innerText = "❌";
    delBtn.addEventListener("click", () => {
      tasks = tasks.filter(t => t.id !== task.id);
      saveTasks();
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(status);
    li.appendChild(delBtn);
    taskList.appendChild(li);
  });
}

/* ---------- SAVE ---------- */
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

/* ---------- ADD TASK ---------- */
addBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();
  if (text === "") return;

  tasks.push({
    id: Date.now(),
    text: text,
    completed: false
  });

  taskInput.value = "";
  saveTasks();
});

/* ---------- FILTER ---------- */
filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    currentFilter = btn.dataset.filter;
    renderTasks();
  });
});

/* ---------- INITIAL LOAD ---------- */
renderTasks();
