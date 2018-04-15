'use strict';

/**
 * entry point : 프로그램의 시작점입니다.
 */


// css를 로드 합니다.
import '!file-loader?name=[name].[ext]!../assets/images/logo.png';
import Leact from './leact/Leact'
import App from './containers/App';

let app = new App();
Leact.render('app', app);