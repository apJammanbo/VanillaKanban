import { makeElement } from "../util";

class Footer {

    make = () => {
        const element = makeElement('footer', null,
            makeElement('strong', null, "COPYRIGHT 2018 ⓒ YCM. ALL RIGHT RESERVED.")
        );
        return element;
    }

    render = () => {
        return this.make();
    }
}

export default Footer;