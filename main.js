// 유저는 할일을 추가할 수 있다.
// 각 할일에 삭제와 체크버튼이 있다.
// 삭제버튼을 클릭하면 할일이 리스트에서 삭제된다.
// 체크버튼을 누르면 할일이 끝난것으로 간주하고 밑줄이간다.
// 끝난 할일은 되돌리기 버튼을 클릭하면 다시 되돌릴 수 있다.
// 탭을 이용해 아이템들을 상태별로 나누어서 볼 수 있다.
// 모바일 버전에서도 확인할 수 있는 반응형 웹이다

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div")
let taskList = []
let mode = "all" //전역변수수
let filterList = []

let underLine = document.getElementById("under-line")


for(let i=1 ; i < tabs.length ; i++) {
    tabs[i].addEventListener("click", function(event){filter(event)})
}

addButton.addEventListener("click",addTask);
taskInput.addEventListener("keydown",function(e){
    if(e.key === "Enter") {
        addTask(e)
    }
})

function addTask(){
    if(taskInput.value == ''){
        alert("입력바랍니다.")
    } else {
    let task = {
        id :randomIDGenerator(),
        taskContent : taskInput.value,
        isComplete : false
    }
    taskList.push(task);
    filter();
}
}

function render(){
    let List = [];
    if(mode === "all" ){
        List = taskList
    } else if (mode === "ongoing" || mode === "done"){
        List = filterList
    }
    let resultHTML = ''
    for(let i=0;i<List.length;i++){
        if(List[i].isComplete == true){
            resultHTML += `<div class="task task-done">
                    <div class = "task-size">
                        ${List[i].taskContent}
                    </div>
                    <div class="button-box">
                        <button onclick="toggleComplete('${List[i].id}')"><i class="fa-solid fa-rotate-right"></i></button>
                        <button onclick="deleteTask('${List[i].id}')"><i class="fa-solid fa-trash-can"></i></button>
                    </div>
                </div>`
        } else {resultHTML += `<div class="task">
            <div class = "task-size">     
                    ${List[i].taskContent}       
            </div>
            <div class="button-box">
                <button onclick="toggleComplete('${List[i].id}')"><i class="fa-solid fa-check"></i></button>
                <button onclick="deleteTask('${List[i].id}')"><i class="fa-solid fa-trash-can"></i></button>
            </div>
        </div>`
    }

    }
    console.log(taskList)
    document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id){
    for(let i = 0; i< taskList.length; i++) {
        if (taskList[i].id == id) {
            taskList[i].isComplete = !taskList[i].isComplete;
            break; // 굳이 찾을 필요 없음.   
            }
        }
        filter()
    }

function deleteTask(id){
    for(let i = 0 ; i< taskList.length; i++) {
        if(taskList[i].id == id) {
            taskList.splice(i,1);
        }
    }
    filter()
}

function filter(event){
    if(event){
        mode = event.target.id;
        underLine.style.width = event.target.offsetWidth + "px";
        underLine.style.left = event.target.offsetLeft + "px";
        underLine.style.top =
        event.target.offsetTop + (event.target.offsetHeight - 4) + "px";
    }

    filterList = [] ;
    if(mode === "all" ){
    } else if(mode === "ongoing") {
        for(let i = 0;i < taskList.length;i++){
            if(taskList[i].isComplete === false) { 
                filterList.push(taskList[i]);
            }
        }
    } else if(mode === "done"){
        for(let i = 0;i < taskList.length;i++){
            if(taskList[i].isComplete === true) {
                filterList.push(taskList[i]);
            }
    }
    }
    render()
}
function randomIDGenerator(){
    return '_' + Math.random().toString(36).substr(2, 9);
}