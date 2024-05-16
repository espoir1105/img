let user = document.querySelector("#user");
let add = document.querySelector("#add");
let taskList = [];

let tabs = document.querySelectorAll(".tabs li");
let fikterList = [];
let mode = "all";

add.addEventListener("click", addTask);

function addTask() {
  //console.log("클릭")
  //let taskContent = user.value;

  let taskContent = {
    id: randomId(),
    taskContent: user.value,
    isComplete: false,
  };

  taskList.push(taskContent);
  console.log(taskList);
  user.value = "";
  render();
}

function render() {
  //console.log("화면")
  list = [];
  if (mode == "all") {
    list = taskList;
  } else if (mode == "ongoing" || mode == "done") {
    list = filterList;
  }

  let result = "";

  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete == true) {
      result += `
        <div class="task">
        <div class="task-done">${list[i].taskContent}</div>
        <div>
          <button onclick="complete (${list[i].id})">check</button>
          <button onclick="deleteTask (${list[i].id})">delete</button>
        </div>
      </div> 
      `;
    } else {
      result += `
        <div class="task">
        <div>${list[i].taskContent}</div>
        <div>
          <button onclick="complete (${list[i].id})">check</button>
          <button onclick="deleteTask (${list[i].id})">delete</button>
        </div>
      </div>  `;
    }
  }
  document.querySelector("#taskBoard").innerHTML = result;
}
function complete(id) {
  //console.log("체크")
  //console.log(id);
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      //taskList[i].isCompete = true;
      taskList[i].isComplete = !taskList[i].isComplete;
    }
  }
  //console.log(taskList)
  filter();
}
//어떤 체크가 눌렀는지 알아야함, 그래서 아이디가 필요함

function randomId() {
  //consoke.log(ate.now());
  return Date.now();
}

function deleteTask(id) {
  //console.log("삭제")
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) taskList.splice(i, 1);
  }
  //console.log(taskList)
  filter();
}

for (let i = 0; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function (event) {
    for (let j = 0; j < tabs.length; j++) {
      tabs[j].classList.remove("on");
    }

    tabs[j].classList.add("on");
    filter(event); //이벤트가 발생한 tab
  });
}

function filter(event) {
  //console.log("filter")
  //console.log(event);

  if (event) {
    mode = event.target.id;
    //mode = event.target
    //console.log(mode);
  }

  filterList = [];

  if (mode == "all") {
    console.log("all");
    render();
  } else if (mode == "ongoing") {
    //console.log("ongoing")
    for (let i = 0; i < taskList.length; i++) {
      if (tasklist[i].isComplete == false) {
        filterList.push(taskList[i]);
      }
    }
    render();
  } else if (mode == "done") {
    //console.log("done")
    for (let i = 0; i < taskList.length; i++) {
      if (tasklist[i].isComplete == true) {
        filterList.push(taskList[i]);
      }
    }
    render();
  }
}
