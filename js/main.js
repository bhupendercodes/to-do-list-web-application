showtask();
let addtaskinput = document.getElementById("addtaskinput");
let addtaskbtn = document.getElementById("addtaskbtn");

addtaskbtn.addEventListener("click", function () {
  addtaskinputval = addtaskinput.value;
  if (addtaskinputval.trim() != 0) {
    let webtask = localStorage.getItem("localtask");
    if (webtask == null) {
      taskObj = [];
    } else {
      taskObj = JSON.parse(webtask);
    }
    taskObj.push({ task_name: addtaskinputval, completeStatus: false });
    localStorage.setItem("localtask", JSON.stringify(taskObj));
    addtaskinput.value = "";
  }
  showtask();
});

// Add Task Function
function showtask() {
  let webtask = localStorage.getItem("localtask");
  if (webtask == null) {
    taskObj = [];
  } else {
    taskObj = JSON.parse(webtask);
  }
  let html = "";
  let addedtasklist = document.getElementById("addedtasklist");
  taskObj.forEach((item, index) => {
    taskCompleteValue = `<td>${item.task_name}</td>`;
    html += `
    <tr>
      <th scope="row">${index + 1}</th>
      ${taskCompleteValue}
      <td>
        <button type="button" onclick="deleteitem(${index})" class="text-danger">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M3 6H5H21"  stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z"  stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M10 11V17"  stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M14 11V17"  stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </td>
    </tr>`;
  });
  addedtasklist.innerHTML = html;
}

// Delete Function
function deleteitem(index) {
  let webtask = localStorage.getItem("localtask");
  let taskObj = JSON.parse(webtask);
  taskObj.splice(index, 1);
  localStorage.setItem("localtask", JSON.stringify(taskObj));
  showtask();
}

// Search Function
let searchtextbox = document.getElementById("searchtextbox");
searchtextbox.addEventListener("input", function () {
  let trlist = document.querySelectorAll("tr");
  Array.from(trlist).forEach(function (item) {
    let searchedtext = item.getElementsByTagName("td")[0].innerText;
    let searchtextboxval = searchtextbox.value;
    let re = new RegExp(searchtextboxval, "gi");
    if (searchedtext.match(re)) {
      item.style.display = "grid";
    } else {
      item.style.display = "none";
    }
  });
});
