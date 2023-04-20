var todosString = localStorage.getItem("todos")
var todos = JSON.parse(todosString) ||[]
  

var selected = "All";

var list = document.getElementById("list");
function render(ls = todos) {
  localStorage.setItem("todos",JSON.stringify(ls))
  const tmp = ls.filter(function (t) {
    var s = true;
    switch (selected) {
      case "All":
        break;
      case "Active":
        s = t.status == false;
        break;
      case "Completed":
        s = t.status == true;
        break;
      default:
        break;
    }
    return s
  })
  list.innerHTML = "";
  var lengthElement = document.getElementById("length")
    lengthElement.innerText = todos.filter(f=>f.status === false).length

  for (var i = 0; i < tmp.length; i++) {
    const todo = tmp[i];
    var row = document.createElement("div");
    row.className = "row";
    var checkbox = document.createElement("div");
    checkbox.className = "checkbox";
    if (todo.status == true) {
      checkbox.classList.add("active");
    }
    checkbox.addEventListener("click", function () {
      const index = todos.findIndex((f) => f.id == todo.id);
      todos[index].status = !todo.status;
      return render();
    });
    checkbox.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>`;

    var text = document.createElement("p");
    text.innerText = todo.text;
    if(todo.status === true) {
        text.classList.add("completed")
    }

    var deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>`;

    deleteBtn.addEventListener("click", function () {
      const index = todos.findIndex((f) => f.id == todo.id);
      todos.splice(index, 1);
      return render();
    });

    

    row.appendChild(checkbox);
    row.appendChild(text);
    row.appendChild(deleteBtn);
    list.appendChild(row);
  }
}

render();

var textInput = document.getElementById("text");

textInput.addEventListener("keypress", function (e) {
  if (e.code == "Enter" && e.target.value !== "") {
    todos.unshift({
      id: new Date().getTime(),
      status: false,
      text: e.target.value,
    });
    e.target.value = "";
    render(todos);
  }
});

const actions = document.querySelectorAll(".actions>div>button");
function actionsRender() {
  for (var i = 0; i < actions.length; i++) {
    var element = actions[i];
    element.className = "";
    if (element.innerText == selected) {
      element.classList.add("active");
    }
    element.onclick = function (e) {
      selected = e.target.innerText;
      actionsRender()
      render()
    };
  }
}
actionsRender()

var clear = document.getElementById("clear")
clear.addEventListener("click",function() {
    const tmp = todos.filter(f=>f.status == false)
    todos = tmp
    render()
})