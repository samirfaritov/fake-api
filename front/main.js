let state = {
  todos: [],
};

let getTodo = document.querySelector("#getTodo");
let todosBox = document.querySelector(".todosBox");

let inp = document.querySelector(".inp");
let postTodo = document.querySelector("#postTodo");

let BASE_URl = "http://localhost:5050/";

const getTodos = async () => {
  try {
    let response = await axios.get(`${BASE_URl}todos`);
    return (state.todos = response.data);
  } catch (error) {
    console.log(error);
  }
};
getTodos();
getTodo.addEventListener("click", () => {
  getTodos();

  state.todos.forEach((item, index) => {
    let li = document.createElement("li");
    let span = document.createElement("span");
    let btnDel = document.createElement("button");
    btnDel.innerText = "delete";
    btnDel.id = item.id;
    btnDel.classList.add("btnDel");
    li.innerHTML = item.title;
    span.innerText = item.id;
    li.prepend(span);
    li.appendChild(btnDel);
    li.classList.add("listItem");
    todosBox.appendChild(li);
  });
  console.log(state);
});

const postTodos = async () => {
  try {
    let response = await axios.post(`${BASE_URl}todos`, {
      userId: 1,
      id: state.todos.length + 1,
      title: inp.value,
      completed: false,
    });

    getTodos();

    return console.log(response);
  } catch (error) {
    console.log(error);
  }
};

postTodo.addEventListener("click", () => {
  postTodos();
  getTodos();
  inp.value = "";
});

window.addEventListener("click", (e) => {
  if (e.target.classList.contains("btnDel")) {
    let id = e.target.id;
    console.log(id);

    const removeTodo = async () => {
      let res = await axios.delete(`${BASE_URl}todos/${id}`);

      console.log(res);
    };

    removeTodo();
    getTodos();
  }
});
