/**
 * TaskCard
 */

import Component from '../leact/Component';
import { makeElement } from "../leact/Leact";

class TaskCard extends Component {
    static path = "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41z";

    constructor(props) {
        super(props);
    }

    /**
     * 태스크 삭제할때 발생하는 액션입니다.
     */
    handleDeleteTask = () => {
        if(this.props.onDeleteTask) {
            this.props.onDeleteTask(this.props.task);
        }
    }

    handleDragStart = (event) => {
        event.dataTransfer.setData("text/plain", this.props.task.key);
        event.dataTransfer.dropEffect = "copy";
    }

    /**
     * 컴포넌트를 생성한다.
     */
    create = (props) => {
        const task = props.task;
        const element = makeElement('div', {
            className: "list",
            draggable: true,
            ondragstart: this.handleDragStart,
        }, [
            makeElement('dl', null, [
                makeElement('dt', null, "Title"),
                makeElement('dd', null, task.title),
                makeElement('dt', null, "Description"),
                makeElement('dd', null, task.description),
                makeElement('dt', null, "Assignee"),
                makeElement('dd', null, task.assignees.join(", ")),
            ]),
            makeElement('button', {
                type: "button",
                className: "btn_close",
                onclick: this.handleDeleteTask,
            }, [
                makeElement('span', {className: "blind"}, "닫기"),
                makeElement('svg', {viewBox: "0 0 24 24"},
                    makeElement('path', {d: TaskCard.path}, null)
                )
            ])
        ]);
        return element;
    }
}

export default TaskCard;