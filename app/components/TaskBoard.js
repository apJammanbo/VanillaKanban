/**
 *  TaskBoard To-do / InProgress / Done 세가지 보드를 품는 보드입니다.
 */
import Component from '../leact/Component';
import { makeElement } from "../leact/Leact";
import TaskPanel from './TaskPanel';

class TaskBoard extends Component {
    /**
     * constructor
     * 초기 element 및 props, state 를 설정한다.
     */
    constructor(props) {
        super(props);
        this.children = {
            todoPanel: null,
            inProgressPanel: null,
            donePanel: null,
        }
    }

    filterTask = (tasks, selectedAssignees) => {
        // 각각의 태스크들을 선택된 담당자리스트와 매칭하여 보여줘야할 태스크를 구한다.
        const list = tasks.filter((task) => {
            // 아무도 선택되어있지 않으면 모든 태스크를 보여준다.
            if(selectedAssignees.length === 0) {
                return true;
            }
            // 태스크에 있는 담당자가 선택되어있으면 태스크를 보여준다.
            let isFind = false;
            task.assignees.some((assignee) => {
                if(selectedAssignees.indexOf(assignee) !== -1) {
                    isFind = true;
                    return true;
                }
            });
            return isFind;
        });
        return list;
    }
    /**
     * 컴포넌트를 생성한다.
     */
    create = (props) => {

        this.children.todoPanel = new TaskPanel({
            taskType: "todo",
            tasks: props.tasks.todoTasks,
            selectedAssignees: props.selectedAssignees,
            onToggleAddDlg: props.onToggleAddDlg,
            onDeleteTask: props.onDeleteTask,
            onChangeType: props.onChangeType,
        });

        this.children.inProgressPanel = new TaskPanel({
            taskType: "inProgress",
            tasks: props.tasks.inProgressTasks,
            selectedAssignees: props.selectedAssignees,
            onDeleteTask: props.onDeleteTask,
            onChangeType: props.onChangeType,
        });

        this.children.donePanel = new TaskPanel({
            taskType: "done",
            tasks: props.tasks.doneTasks,
            selectedAssignees: props.selectedAssignees,
            onDeleteTask: props.onDeleteTask,
            onChangeType: props.onChangeType,
        });

        const element = makeElement('div', { className: "sec task_list"},
            [
                this.children.todoPanel.render(),
                this.children.inProgressPanel.render(),
                this.children.donePanel.render(),
            ]
        );
        return element;
    }

    /**
     * 변경된 속성들로 부터 컴포넌트를 조작한다.
     */
    update = (props) => {
        if(props.selectedAssignees !== this.props.selectedAssignees
            || props.tasks !== this.props.tasks) {

            // 속성이 변경되면 업데이트 한다.
            this.children.todoPanel.render({
                taskType: "todo",
                tasks: this.filterTask(props.tasks.todoTasks, props.selectedAssignees),
                selectedAssignees: props.selectedAssignees,
            });
            this.children.inProgressPanel.render({
                taskType: "inProgress",
                tasks: this.filterTask(props.tasks.inProgressTasks, props.selectedAssignees),
                selectedAssignees: props.inProgressTasks,
            });
            this.children.donePanel.render({
                taskType: "done",
                tasks: this.filterTask(props.tasks.doneTasks, props.selectedAssignees),
                selectedAssignees: props.selectedAssignees,
            });
        }
        this.props = Object.assign({}, this.props, props);
    }
}

export default TaskBoard;