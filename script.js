
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
let data = '';

const xhr = new XMLHttpRequest();
let serpass = "apsdoifhjwqebnboijsdaf";

console.log(btoa(""));
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
        val = localStorage.getItem("p"+curPer);
        settime = localStorage.getItem("Period "+curPer+":"+"Student #"+(val-1));
        localStorage.setItem("Period "+curPer+":"+"Student #"+(val-1),settime+":"+displayhours + "h" + displayminutes + "m" + displayseconds + "s");
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

function request(num){
    if(num === 1 || num === 5){
        curPer = "1/5";
    } else if(num === 2 || num === 6){
        curPer = "2/6";
    }else if(num === 3 || num === 7){
        curPer = "3/7";
    }else if(num === 4 || num === 8){
        curPer = "4/8";
    }
    var wb = XLSX.utils.book_new();
    wb.Props = {
        Title: "SheetJS Tutorial",
        Subject: "Test",
        Author: "Red Stapler",
        CreatedDate: new Date(2017,12,19)
    };
    wb.SheetNames.push("Test Sheet");
    var ws_data = [["First Name","Last Name","Student Id","Amount of Time"]];
    for (var i = 1; i < localStorage.getItem("p"+curPer) ; i++){
        data = localStorage.getItem("Period "+curPer+":"+"Student #"+i);
        data = data.split(':');
        console.log(data)
        ws_data.push([data[0],data[1],data[2],data[3]]);
    }

    var ws = XLSX.utils.aoa_to_sheet(ws_data);
    wb.Sheets["Test Sheet"] = ws;

    var wbout = XLSX.write(wb, {bookType:'xlsx',  type: 'binary'});
    function s2ab(s) {

        var buf = new ArrayBuffer(s.length);
        var view = new Uint8Array(buf);
        for (var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;

    }
    saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), 'test.xlsx');
    
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
}
function deleteData(){
    for (var i = 1; i < 5; i++){
        if(i === 1 || periodNum === 5){
            curPer = "1/5";
        } else if(i === 2 || periodNum === 6){
            curPer = "2/6";
        }else if(i === 3 || periodNum === 7){
            curPer = "3/7";
        }else if(i === 4 || periodNum === 8){
            curPer = "4/8";
        }
        for (var r = 1; r < localStorage.getItem("p"+curPer) ; r++){
            localStorage.removeItem("Period "+curPer+":"+"Student #"+r);
        }
        localStorage.setItem("p1/5","1");
        localStorage.setItem("p2/6","1");
        localStorage.setItem("p3/7","1");
        localStorage.setItem("p4/8","1");
    }
}

function sub(num){
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
            if (num == 20){
                deleteData();
            } else{
                setPer(num);
            }
        }
    }
}
