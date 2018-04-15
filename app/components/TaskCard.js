import { makeElement } from "../util";

class TaskCard {
    constructor(props) {
        this.props = props;
    }
    make = () => {
        const task = this.props.task;
        const element = makeElement('div', {
            className: "list",
            draggable: true,
        }, [
            makeElement('dl', null, [
                makeElement('dt', null, "Title"),
                makeElement('dd', null, task.title),
                makeElement('dt', null, "Description"),
                makeElement('dd', null, task.description),
                makeElement('dt', null, "Assignee"),
                makeElement('dd', null, task.assignees.join(", ")),
            ]),
            makeElement('button', {type: "button", className: "btn_close"}, [
                makeElement('span', {className: "blind"}, "닫기"),
                makeElement('svg', {viewBox: "0 0 24 24"},
                    makeElement('path', {d: "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41z"}, null)
                )
            ])
        ]);
        return element;
    }

    render = () => {
        return this.make();
    }
}

export default TaskCard;