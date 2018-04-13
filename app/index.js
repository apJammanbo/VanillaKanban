/**
 * entry point : 프로그램의 시작점입니다.
 */

// css를 로드 합니다.
import 'styles/app.css';
import '!file-loader?name=[name].[ext]!../assets/images/agitlogo.png';

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
img.alt = "카카오 아지트";
a.appendChild(img);

document.getElementById("app").appendChild(header);
// <header>
//                 <div className="content">
//                     <h1>
//                         {/*<a href="/" className="logo"><img src="logo.png" alt="카카오페이" /></a>*/}
//                     </h1>
//                     <div className="popover_bx">
//                         <button type="button" className="hamberger">
//                             <span className="blind">메뉴버튼</span>
//                             <svg focusable="false" viewBox="0 0 24 24">
//                                 <rect width={24} height="4.8" />
//                                 <rect y="9.601" width={24} height="4.8" />
//                                 <rect y="19.201" width={24} height="4.8" />
//                             </svg>
//                         </button>
//                         <div className="result_bx">
//                             <ul>
//                                 <li><button type="button">sample1</button></li>
//                                 <li><button type="button">sample2</button></li>
//                                 <li><button type="button">sample3</button></li>
//                             </ul>
//                         </div>
//                     </div>
//                 </div>
//             </header>