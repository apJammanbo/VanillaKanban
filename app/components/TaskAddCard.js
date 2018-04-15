import { makeElement } from "../leact/Leact";

class TaskAddCard {
    constructor(props) {
        this.props = props;
    }
    make = () => {
        const element =
            makeElement('button', {type: "button", className: "btn_list_add"}, [
                makeElement('span', {className: "blind"}, "태스크 추가"),
                makeElement('svg', {viewBox: "0 0 24 24"},
                    makeElement('path', {d: "M12.001,0.073c-6.584,0-11.929,5.342-11.929,11.925c0,6.582,5.342,11.926,11.929,11.926c6.584,0,11.927-5.342,11.927-11.926 C23.927,5.417,18.583,0.073,12.001,0.073z M19.902,12.997h-6.905v6.905h-1.994v-6.905H4.098l0-1.994h6.905V4.098h1.994v6.905h6.905 V12.997z"}, null)
                )
            ])
        return element;
    }

    render = () => {
        return this.make();
    }
}

export default TaskAddCard;