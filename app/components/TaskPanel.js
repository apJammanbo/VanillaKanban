import TaskCard from './TaskCard';
import TaskAddCard from './TaskAddCard'
import { makeElement } from "../util";

class TaskPanel {
    constructor(props) {
        this.props = props;
    }
    make = () => {
        const taskType = this.props.taskType;
        let className = "";
        let title = "";

        // 각 타입에 따른 속성 설정
        if(taskType === "todo") {
            // To Do 속성 설정
            className = "sec third todo_bx";
            title = "To Do";
        } else if(taskType === "inProgress") {
            // In Progress 속성 설정
            className = "sec third in_progress_bx";
            title = "In Progress";
        } else if(taskType === "done") {
            // Done 속성설정
            title = "Done";
            className = "sec third done_bx";
        }

        // Task 설정
        const taskList = this.props.tasks.map(task => new TaskCard({task: task}));
        if(taskType === "todo") {
            taskList.push(new TaskAddCard());
        }

        const element = makeElement('div', { className },
            makeElement('div', { className: "inbx"},
                [
                    makeElement('div', {className: "sec_title"}, [
                            makeElement('h2', null, [
                                title,
                                makeElement('span', {className: "count"}, "3"),
                            ]),
                            taskType === "todo" ?
                                makeElement('button', {className: "btn_add"}, [
                                    makeElement('span', {className: "blind"}, "테스크 추가"),
                                    makeElement('span', {className: "ico_plus"}, null),
                                ]): null
                        ]
                    ),
                    makeElement('div', {className: "sec_content"},
                        makeElement('div', {className: "list_bx"}, taskList.map(taskList => taskList.render()))
                    )
                ]
            )
        );
        return element;
    }

    render = () => {
        return this.make();
    }
}

export default TaskPanel;