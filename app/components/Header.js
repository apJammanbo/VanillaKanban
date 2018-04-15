/**
 * Heaer 프로그램 상단의 헤더입니다.
 */

import Component from '../leact/Component';
import { makeElement } from "../leact/Leact";

class Header extends Component {
    /**
     * 컴포넌트를 생성한다.
     */
    create = () => {
        const element = makeElement('header', null,
            makeElement('div', { className: "content"},
                makeElement('h1', null,
                    makeElement('a', {
                        href: "/",
                        className: "logo",
                    }, makeElement('img', {src: "logo.png", alt: "아지트" }, null))
                ),
            ),
        );

        return element;
    }
}

export default Header;