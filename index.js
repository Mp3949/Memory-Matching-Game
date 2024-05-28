document.addEventListener("DOMContentLoaded", function() {
    // Wait for 3 seconds
    setTimeout(function() {
      // Remove the loading screen
      var loadingScreen = document.getElementById('loading-screen');
      if (loadingScreen) {
        loadingScreen.style.display = 'none';
      }
      
    }, 5000); // 3000 milliseconds = 3 seconds
    $("#loading-screen").fadeOut(4000);
  });
  

let elements = ["😀", "😁", "😂", "🤣", "😃", "😄", "😅", "😆", "😉", "😊", "😋", "😎", "🙂", "🤗", "🤩", "🤔", "🫡", "🤨", "😏", "🙄", "😶‍🌫️", "🥱", "😝", "😜", "😛", "🫠", "🤤", "😵‍💫", "🥴", "🤕", "🥳", "🫣", "🤭", "🧐"];
//Shuffling above elementsay
//javaScript implementation of the Fisher-Yates shuffle algorithm
let tmp, c, p = elements.length;
if (p) while (--p) {
    c = Math.floor(Math.random() * (p + 1));
    tmp = elements[c];
    elements[c] = elements[p];
    elements[p] = tmp;
}

//Showing instructions
window.onload = function () {
    $("#main").html(`<img src="main.jpeg>`);
    $("#main").fadeOut(2000);
    $("#inst1").html(`<div class="inst">
        <h1>Welcome !</h1>
        <u><h2>Instructions For Game</h2></u><br/>
        <li>Make pairs of similar blocks by flipping them.</li>
        <li>To flip a block, you can click on it.</li>
        <li>If two blocks you clicked are not similar, they will be flipped back.</li>
        </div>
        <div class="inst" id="inst2">
        <p style="font-size:18px;">Click one of the following modes to start the game.</p>
    <button onclick="start(3, 4)">3 x 4</button>
    <button onclick="start(4, 4)" style="w">4 x 4</button>
    <button onclick="start(4, 5)">4 x 5</button>
    <button onclick="start(5, 6)">5 x 6</button>
    <button onclick="start(6, 6)">6 x 6</button>
    </div>`);
}




//Resizing Screen
window.onresize = resiz;
function resiz() {
    W = innerWidth;
    H = innerHeight;
    $('body').height(H + "px");
    $('#inst1').height(H + "px");
    $('#loading-screen').height(H + "px");
    $('#loading-screen').width(W + "px");
}

let  time, gameMode;
//Game code
function start(r,l){
    // timers and moves
    min = 0,sec=0,move=0;
    $("#time").html("Time: 00:00");
    $("#moves").html("Moves: 0");
    time = setInterval(function () {
        sec++;
        if (sec == 60) {
            min++; sec = 0;
        }
        if (sec < 10)
            $("#time").html("Time: 0" + min + ":0" + sec);
        else
        $("#time").html("Time: 0" + min + ":" + sec);
    }, 1000);
    // execute the functio after every 1000 miliseconds;
    
    remains = r * l / 2, noItems = remains;
    gameMode = r + "x" + l;
    
    // let create a shuffling item aaray from element array
    let item=[];
    for(let i=0;i<noItems;i++){
        item.push(elements[i]);
    }
    for(let i=0;i<noItems;i++){
        item.push(elements[i]);
    }
    // shuffling item array
    let tmp, c, p = item.length;
    if (p) while (--p) {
    c = Math.floor(Math.random() * (p + 1));
    tmp = item[c];
    item[c] = item[p];
    item[p] = tmp;
}

    //Creating table
    $("table").html("");
    var n = 1;
    for (var i = 1; i <= r; i++) {
        $("table").append("<tr>");
        for (var j = 1; j <= l; j++) {
            $("table").append(`<td id='${n}' onclick="change(${n})"><div class='inner'><div class='front'></div><div class='back'><p>${item[n - 1]}</p></div></div></td>`);
            n++;
        }
        $("table").append("</tr>");
    }
    
    $("#inst1").fadeOut(500);
    
}

let pre = "", pID,  t = "transform", flip = "rotateY(180deg)", flipBack = "rotateY(0deg)",ppID = 0, turn = 0;

//Function for flipping blocks
function change(x) {
    //Variables
    let moves =0;
    let i = "#" + x + " .inner";
    let f = "#" + x + " .inner .front";
    let b = "#" + x + " .inner .back";

    //Dont flip for these conditions
    if (turn == 2 || $(i).attr("flip") == "block" || ppID == x) { }

    //Flip
    else {
        $(i).css(t, flip);
        if (turn == 1) {
            //This value will prevent spam clicking
            turn = 2;

            //If both flipped blocks are not same
            if (pre != $(b).text()) {
                setTimeout(function () {
                    $(pID).css(t, flipBack);
                    $(i).css(t, flipBack);
                    ppID = 0;
                }, 1000);
            }

            //If blocks flipped are same
            else {
                remains--;
                $(i).attr("flip", "block");
                $(pID).attr("flip", "block");
            }

            setTimeout(function () {
                turn = 0;
                //Increase moves
                moves++;
                $("#moves").html("Moves: " + moves);
            }, 1150);

        }
        else {
            pre = $(b).text();
            ppID = x;
            pID = "#" + x + " .inner";
            turn = 1;
        }

        //If all pairs are matched
        if (remains == 0) {
            clearInterval(time);
            if (min == 0) {
                time = `${sec} seconds`;
            }
            else {
                time = `${min} minute(s) and ${sec} second(s)`;
            }
            setTimeout(function () {
                $("#inst1").html(`<center><div id="iol"><h2>Congrats!</h2><p style="font-size:23px;padding:10px;">You completed the ${gameMode} mode in ${moves} moves. It took you ${time}.</p><p style="font-size:18px">Comment Your Score!<br/>Play Again ?</p><button onclick="start(3, 4)">3 x 4</button> <button onclick="start(4, 4)" style="w">4 x 4</button><button onclick="start(4, 5)">4 x 5</button><button onclick="start(5, 6)">5 x 6</button><button onclick="start(6, 6)">6 x 6</button></div></center>`);
                $("#inst1").fadeIn(750);
            }, 1500);
        }
    }
}
