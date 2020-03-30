console.log("connected..");

// constant classes
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

// Global variavbles 
var Arr_LIST = [], id = 0;


// Display Today's Date : 
var date = document.getElementById("timeHeading");
const options = { weekday :"long", month: "long", day: "numeric"};
const today = new Date();
date.innerHTML = today.toLocaleDateString("en-US", options);

// Add toDo function to render List
var List = document.getElementById("List");

 function Add(TasktoDo, id, done, trash){
     if(trash){ return;}
     const DONE = done ? CHECK : UNCHECK;
     const LINE = done ? LINE_THROUGH : "";
     const position = "beforeend";
     const item = `<li class="item">
     <p class="text ${LINE}">${TasktoDo}</p>
     <i class="fa ${DONE} co" job="complete" id=${id}></i>
     <i class="fa fa-trash-o de" job="delete" id=${id}></i>
    </li>`;
    List.insertAdjacentHTML(position, item);
 };

// Add Item on clicking Enter Key after being checked that input isn't null
var inputtedItem = document.getElementById("input");
inputtedItem.addEventListener("keyup",function(e){
    if(e.keyCode == 13){
        const toDo = input.value;

        //checking input is not empty
        if(toDo){
            Add(toDo, id, false, false);
            Arr_LIST.push({
                name : toDo,
                id : id,
                done : false,
                trash : false
            });
            // Creating Local Storage (Paste this Line where you update your list)
            // localStorage.setItem("ToDo", JSON.stringify(Arr_LIST));
            id++;
        }
        input.value = "";
    }
});

// Complete Status
function isCompleted(e){
    e.classList.toggle(CHECK);
    e.classList.toggle(UNCHECK);
    e.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
    Arr_LIST[e.id].done = Arr_LIST[e.id].done ? false : true; 
}

// Delete Status
function isRemoved(e){
    e.parentNode.parentNode.removeChild(e.parentNode);
    Arr_LIST[e.id].trash = true;
}

// Checking either clicked on Completed or Removed 
List.addEventListener("click", function(e){
    const ClickedOn = e.target;
    const Status = ClickedOn.attributes.job.value;      // complete OR delete

    if(Status == "complete"){
            isCompleted(ClickedOn);
    }
    else if(Status == "delete"){
        isRemoved(ClickedOn);
    }

    // Creating Local Storage (Paste this Line where you update your list)
    // localStorage.setItem("ToDo", JSON.stringify(Arr_LIST));
});

//All tasks Display : 
var all = document.getElementById("all");
all.addEventListener('click',function(event){
    event.preventDefault();
    var newTasks=[];
    for(var i = 0;i<Arr_LIST.length;i++){
        if(Arr_LIST[i].trash==false)
            newTasks.push(Arr_LIST[i]);
    }

    List.innerHTML = "";
    for(var i=0; i<newTasks.length; i++){
        Add(newTasks[i].name, newTasks[i].id, newTasks[i].done, newTasks[i].trash);
    }
});

// Completed Tasks Display :
var completed = document.getElementById("completed");
completed.addEventListener('click',function(event){
    event.preventDefault();
    var newTasks=[];
    for(var i = 0;i<Arr_LIST.length;i++){
        if(Arr_LIST[i].done==true)
            newTasks.push(Arr_LIST[i]);
    }

    List.innerHTML = "";
    for(var i=0; i<newTasks.length; i++){
        Add(newTasks[i].name, newTasks[i].id, newTasks[i].done, newTasks[i].trash);
    }
});

// Active tasks Display : 
var active = document.getElementById("active");
active.addEventListener('click',function(event){
    event.preventDefault();
    var newTasks=[];
    for(var i = 0;i<Arr_LIST.length;i++){
        if(Arr_LIST[i].done==false)
            newTasks.push(Arr_LIST[i]);
    }

    List.innerHTML = "";
    for(var i=0; i<newTasks.length; i++){
        Add(newTasks[i].name, newTasks[i].id, newTasks[i].done, newTasks[i].trash);
    }
});

//Search Engine :
var Searched = document.getElementById("Search");
Searched.addEventListener('input',function(){
    var SearchedItem = Searched.value;
    if(SearchedItem != ""){
    // console.log(SearchedItem);
    var newTasks=[];
    for(var i = 0; i<Arr_LIST.length;i++){
        if(Arr_LIST[i].name.includes(SearchedItem)){
            newTasks.push(Arr_LIST[i]);
        }
    }
    
    
    List.innerHTML = "";
    for(var i=0; i<newTasks.length; i++){
        Add(newTasks[i].name, newTasks[i].id, newTasks[i].done, newTasks[i].trash);
    }
    }
    else{
        var newTasks=[];
        for(var i = 0;i<Arr_LIST.length;i++){
            if(Arr_LIST[i].trash==false)
                newTasks.push(Arr_LIST[i]);
        }
    
        List.innerHTML = "";
        for(var i=0; i<newTasks.length; i++){
            Add(newTasks[i].name, newTasks[i].id, newTasks[i].done, newTasks[i].trash);
        }
    }
});
