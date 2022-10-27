//define vars to hold time values
let seconds = 0;
let minutes = 0;
let hours = 0;

//define vars to hold display value

let displayseconds = 0;
let displayminutes = 0;
let displayhours = 0;

let interval = null;
let status = "stopped";

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
        document.getElementById("startStop").innerHTML = "Stop";
        status = "started"
    }
    else{
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