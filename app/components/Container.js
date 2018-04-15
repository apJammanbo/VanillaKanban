import Filter from './Filter';
import TaskBoard from './TaskBoard';
import { makeElement } from "../util";

class Container {
    constructor(props) {
        this.element = null;
        this.props = props;
    }

    create = () => {
        // 등록된 모든 Task
        const tasks = this.props.tasks;

        // 태스크에 있는 모든 assignee 를 가지고 온다.
        const assignees = new Set();
        tasks.forEach((task) => {
            task.assignees.forEach((assignee) => {
                assignees.add(assignee);
            })
        });

        // 상단 필터
        const filter = new Filter({
            assignees: [...assignees],
            onToggleAddDlg: this.props.onToggleAddDlg,
        });

        // 태스크 보드
        const taskBoard = new TaskBoard({tasks: this.props.tasks});
        const content = makeElement('div', { className: "content"},
            [
                filter.render(),
                taskBoard.render(),
            ]
        );
        const element = makeElement('div', { className: "container"}, content);
        return element;
    }

    update = () => {

    }

    render = () => {
        if(!this.element) {
            this.element = this.create();
            return this.element;
        } else {
            this.update();
            return false;
        }
    }
}

export default Container;