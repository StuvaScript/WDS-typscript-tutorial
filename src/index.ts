import { v4 as uuidv4 } from "uuid";

// **`` Custom Type
type Task = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
};

// **`` Query Selectors
const list = document.querySelector<HTMLUListElement>("#list");
const form = document.getElementById("new-task-form") as HTMLFormElement | null;
const input = document.querySelector<HTMLInputElement>("#new-task-title");

// **`` Defines our page info returning our [tasks array]
const tasks: Task[] = loadTasks();

// **`` Loops thru the [tasks array] and initializes our page display
tasks.forEach(addListItem);

// **`` Form submit listener
form?.addEventListener("submit", (e) => {
  e.preventDefault();

  // **`` Input null or empty string safety check
  if (input?.value == "" || input?.value == null) return;

  // **`` The info of each {new task object}
  const newTask: Task = {
    id: uuidv4(),
    title: input.value,
    completed: false,
    createdAt: new Date(),
  };

  // **`` Adds our {new task object} to the [tasks array]
  tasks.push(newTask);

  // **`` Saves the [tasks array] to local storage
  saveTasks();

  // **`` Creates the HTML elements with the info from our {new task object} and adds its onto our currently displayed list of tasks
  addListItem(newTask);

  // **`` Resets our input value to an empty string
  input.value = "";
});

function addListItem(task: Task) {
  const item = document.createElement("li");
  const label = document.createElement("label");
  const checkbox = document.createElement("input");
  checkbox.addEventListener("change", () => {
    task.completed = checkbox.checked;
    saveTasks();
  });
  checkbox.type = "checkbox";
  checkbox.checked = task.completed;
  label.append(checkbox, task.title);
  item.append(label);
  list?.append(item);
}

function saveTasks() {
  localStorage.setItem("TASKS", JSON.stringify(tasks));
}

function loadTasks(): Task[] {
  const taskJSON = localStorage.getItem("TASKS");
  if (taskJSON == null) return [];
  return JSON.parse(taskJSON);
}
