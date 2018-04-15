/**
 * entry point : 프로그램의 시작점입니다.
 */

// css를 로드 합니다.
import 'styles/app.css';
import '!file-loader?name=[name].[ext]!../assets/images/agitlogo.png';
document.getElementById('app').style.height = "100%";

let header = document.createElement("header");

let content = document.createElement("div");
content.className = "content";

header.appendChild(content);

let h1 = document.createElement("h1");
content.appendChild(h1);

let a = document.createElement("a");
a.href = '/';
a.className = 'logo';
h1.appendChild(a);

let img = document.createElement('img');
img.src = "agitlogo.png";
img.alt = "아지";
a.appendChild(img);

document.getElementById("app").appendChild(header);


// Content
let body = document.createElement("div");
body.style.height = "100%";
body.style.width = "100%";

let board1 = document.createElement("div");
board1.style.width = "32%";
board1.style.height = "100%";
board1.style.background = "gray";
board1.style.border = "1px solid black";
board1.style.position = "relative";
board1.style.display = "inline-block";
body.appendChild(board1);

let board2 = document.createElement("div");
board2.style.width = "33%";
board2.style.height = "100%";
board2.style.background = "gray";
board2.style.border = "1px solid black";
board2.style.position = "relative";
board2.style.display = "inline-block";
board2.ondrop = drop;
board2.ondragover = dragOver;
body.appendChild(board2);

let board3 = document.createElement("div");
board3.style.width = "32%";
board3.style.height = "100%";
board3.style.background = "gray";
board3.style.border = "1px solid black";
board3.style.position = "relative";
board3.style.display = "inline-block";
body.appendChild(board3);

document.getElementById("app").appendChild(body);

let card = document.createElement("div");
card.style.width = "100%";
card.style.height = "300px";
card.style.background = "white";
card.draggable="true";
card.ondragstart=dragstart_handler;

board1.appendChild(card);


function dragstart_handler(ev) {
    // Add the target element's id to the data transfer object
    ev.dataTransfer.setData("text/plain", ev.target.id);
    ev.dataTransfer.setData("text/html", "<p>Example paragraph</p>");
    ev.dataTransfer.setData("text/uri-list", "http://developer.mozilla.org");
    ev.dataTransfer.dropEffect = "copy";
    ev.dropEffect = "move";
};

function drop(ev) {
    ev.preventDefault();
    // Get the id of the target and add the moved element to the target's DOM
    var data = ev.dataTransfer.getData("text");
    // ev.target.appendChild(document.getElementById(data));
}

function dragOver(ev) {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = "move"
}

