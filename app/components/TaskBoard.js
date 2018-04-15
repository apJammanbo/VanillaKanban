import { makeElement } from "../util";
import TaskPanel from './TaskPanel';

class TaskBoard {
    constructor(props) {
        this.props = props;
    }

    make = () => {
        const tasks = this.props.tasks;

        const element = makeElement('div', { className: "sec task_list"},
            [
                new TaskPanel({
                    taskType: "todo",
                    tasks: tasks.filter(task => task.type === "todo"),
                }).render(),
                new TaskPanel({
                    taskType: "inProgress",
                    tasks: tasks.filter(task => task.type === "inProgress"),
                }).render(),
                new TaskPanel({
                    taskType: "done",
                    tasks: tasks.filter(task => task.type === "done"),
                }).render(),
            ]
        );
        return element;
    }

    render = () => {
        return this.make();
    }
}

export default TaskBoard;