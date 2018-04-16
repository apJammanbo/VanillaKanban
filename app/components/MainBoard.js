/**
 * MainBoard
 */

import Component from '../leact/Component';
import Filter from './Filter';
import TaskBoard from './TaskBoard';
import { makeElement } from "../leact/Leact";

class MainBoard extends Component{
    /**
     * constructor
     * 초기 element 및 props, state 를 설정한다.
     */
    constructor(props) {
        super(props);
        this.children = {
            filter: null,
            taskBoard: null,
        };
    }

    // region Functions

    getAssignees = (tasks) => {
        const assignees = new Set();
        Object.keys(tasks).forEach((key) => {
            tasks[key].forEach((task) => {
                task.assignees.forEach((assignee) => {
                    assignees.add(assignee);
                });
            })
        });
        return assignees;
    }

    // endregion

    // region About Render

    /**
     * 컴포넌트를 생성한다.
     */
    create = (props) => {
        // 태스크에 있는 모든 assignee 를 가지고 온다.
        const assignees = this.getAssignees(props.tasks);

        // 상단 필터
        this.children.filter = new Filter({
            assignees: [...assignees],
            selectedAssignees: props.selectedAssignees,
            onToggleAddDlg: props.onToggleAddDlg,
            onSelectAssignee: props.onSelectAssignee,
        });

        // 태스크 보드
        this.children.taskBoard = new TaskBoard({
            tasks: props.tasks,
            selectedAssignees: props.selectedAssignees,
            onToggleAddDlg: props.onToggleAddDlg,
            onDeleteTask: props.onDeleteTask,
            onChangeType: props.onChangeType,
        });

        // 엘레멘트 생성
        const content = makeElement('div', { className: "content"},
            [
                this.children.filter.render(),
                this.children.taskBoard.render(),
            ]
        );
        const element = makeElement('div', { className: "container"}, content);
        return element;
    }

    /**
     * 변경된 속성들로 부터 컴포넌트를 조작한다.
     */
    update = (props) => {

        // 태스크 혹은 선택된 담당자가 변경되었을때만 업데이트 한다.
        if(this.props.tasks !== props.tasks || this.props.selectedAssignees !== props.selectedAssignees) {
            // 업데이트 Filter
            const assignees = this.getAssignees(props.tasks);
            this.children.filter.render({
                assignees: [...assignees],
                selectedAssignees: props.selectedAssignees,
            });

            // 업데이트 TaskBoard
            this.children.taskBoard.render({
                tasks: props.tasks,
                selectedAssignees: props.selectedAssignees,
            });
        }
        this.props = Object.assign({}, this.props, props);
    }

    // endregion
}

export default MainBoard;