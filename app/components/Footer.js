/**
 *  Footer 프로그램 상단의 헤더입니다.
 */

import Component from '../leact/Component';
import { makeElement } from "../leact/Leact";

class Footer extends Component {
    create = () => {
        const element = makeElement('footer', null,
            makeElement('strong', null, "COPYRIGHT 2018 ⓒ YCM. FOR KAKAO AGIT")
        );
        return element;
    }
}

export default Footer;