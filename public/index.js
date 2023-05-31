console.log("El JS esta siendo recibido por el navegador");

const createBtn = document.querySelector("#create-task");
const input = document.querySelector("#task-name");
const tasksContainer = document.querySelector("#tasks-container")
const baseUrl = `${window.origin}/api/`;
let TASK_TO_EDIT = null


createBtn.addEventListener("click", function () {
  console.log("Crear tarea");
  const creating = !TASK_TO_EDIT
  const path = creating ? "tasks" : `tasks/${TASK_TO_EDIT._id}`
  const method = creating ? "POST" :"PUT"
  fetch(`${baseUrl}${path}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: input.value }),
  })
    .then((res) => {
    getTasks();
      input.value = ""
      createBtn.innerText = "Crear tarea"
      return res.json();
    })
    .then((resJSON) => {
      console.log({ resJSON });
    });
});

function getTasks() {
tasksContainer.innerHTML = null;
  fetch(`${baseUrl}tasks`)
    .then((res) => {
      return res.json();
    })
    .then((resJSON) => {
      console.log({ resJSON });
      const tasks = resJSON.data
      for(const task of tasks){
        const taskParagraph = document.createElement('p')
        const deleteBtn = document.createElement('button')
        const taskContainerDiv = document.createElement('div')
        deleteBtn.innerText = "Borrar"
        taskParagraph.innerText = task.name 
        taskParagraph.addEventListener("click",(e)=>{
          input.value = task.name
          createBtn.innerText = "Editar tarea"
          TASK_TO_EDIT = task
        })
        deleteBtn.setAttribute('id',task._id)
        deleteBtn.addEventListener("click",(e) => {
            deleteBtn.innerText = "Eliminando..."
            const taskID = e.target.id
            fetch(`${baseUrl}tasks/${taskID}`,{
                method:"DELETE"
            }).then(()=>{
                const taskDiv = deleteBtn.parentElement
                taskDiv.remove();
            })
            console.log({e})
        })

        taskContainerDiv.appendChild(taskParagraph)
        taskContainerDiv.appendChild(deleteBtn)
        tasksContainer.appendChild(taskContainerDiv)
      }
    });
}

getTasks()
