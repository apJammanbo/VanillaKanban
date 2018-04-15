import { makeElement } from "../util";

class Header {

    make = () => {
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

    render = () => {
        return this.make();
    }
}

export default Header;