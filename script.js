
// define vars to hold time values
let seconds = 0;
let minutes = 0;
let hours = 0;

let periodNum = 1;
let curPer = "1/5";
let num = "1";
//define vars to hold display value

let displayseconds = 0;
let displayminutes = 0;
let displayhours = 0;

let interval = null;
let status = "stopped";

const xhr = new XMLHttpRequest();
let serpass = "apsdoifhjwqebnboijsdaf";

//stopwatch function (logic to detiermine when to increment value)
function stopWatch(){
    seconds++;
    //Logic to determien when to inciment next value
    if(seconds/60 === 1){
        seconds = 0;
        minutes++;
        if(minutes/60 === 1){
            minutes = 0;
            hours++;
        }
    }
    if(seconds < 10){
        displayseconds = "0" +seconds.toString();
    }
    else{
        displayseconds = seconds;
    }
    if(minutes < 10){
        displayminutes = "0" +minutes.toString();
    }
    else{
        displayminutes = minutes;
    }
    if(hours < 10){
        displayhours = "0" +hours.toString();
    }
    else{
        displayhours = hours;
    }

    //Display updated time value
    document.getElementById("display").innerHTML = displayhours + ":" + displayminutes + ":" + displayseconds

}

function startStop(){
    if(status === "stopped"){
        interval = window.setInterval(stopWatch, 1000);
        num = localStorage.getItem("p"+curPer);
        localStorage.setItem("Period "+curPer+":"+"Student #"+num,first.value+":"+last.value+":"+id.value);
        num++;
        localStorage.setItem("p"+curPer,num);
        document.getElementById("startStop").innerHTML = "Stop";
        status = "started"
    }
    else{
        first.value = "";
        last.value = "";
        id.value = "";
        window.clearInterval(interval);
        document.getElementById("startStop").innerHTML = "Start";
        status = "stopped"
        reset()
    }
}


function reset(){
    window.clearInterval(interval);
    seconds = 0;
    minutes = 0;
    hours = 0;
    document.getElementById("display").innerHTML = "00:00:00";
    document.getElementById("startStop").innerHTML = "Start";
}

function request(){
    for (var i = 1; i < localStorage.getItem("p"+curPer) ; i++){
        console.log(localStorage.getItem("Period "+curPer+":"+"Student #"+i));
    }
    $(".dropdown:hover .dropdown-content").css( "display","none")
}
function setPer(num){
    periodNum = num;
    localStorage.setItem("periodNum",periodNum);
    if(periodNum === 1 || periodNum === 5){
        curPer = "1/5";
    } else if(periodNum === 2 || periodNum === 6){
        curPer = "2/6";
    }else if(periodNum === 3 || periodNum === 7){
        curPer = "3/7";
    }else if(periodNum === 4 || periodNum === 8){
        curPer = "4/8";
    }
    $(".dropdown:hover .dropdown-content").css( "display","none")
}

function sub(){
    var pass = window.prompt("Enter Teacher Password",)
    xhr.onreadystatechange = function (){
        if(xhr.readyState == 4){
            if(xhr.status == 200){
                serpass = (xhr.responseText);
            }
            if(xhr.status == 404){
                console.log("File not found")
            }
        }
    }
    xhr.open('get','data.txt',false);
    xhr.send();
    serpass = atob(serpass);
    var allPass = serpass.split(':');
    for(let i = 0; i < allPass.length; i++){
        if(pass == allPass[i]){
            $(".dropdown:hover .dropdown-content").css( "display","block")
        }
    }
}