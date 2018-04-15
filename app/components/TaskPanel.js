/**
 * TaskPanel 상태에 따라서 각각의 태스크 카드를 가지는 컴포넌트 입니다.
 */

import Component from '../leact/Component';
import TaskCard from './TaskCard';
import { makeElement } from "../leact/Leact";

class TaskPanel extends Component {
    /**
     * constructor
     * 초기 element 및 props, state 를 설정한다.
     */
    constructor(props) {
        super(props);
    }

    /**
     * 새로운 태스크 생성 버튼이 클릭되면 발생하는 액션입니다.
     */
    handleOpenAddDlg = () => {
        if(this.props.onToggleAddDlg) {
            this.props.onToggleAddDlg(true);
        }
    }

    /**
     * 태스크 삭제할때 발생하는 액션입니다.
     */
    handleDeleteTask = (task) => {
        if(this.props.onDeleteTask) {
            this.props.onDeleteTask(task, this.props.taskType);
        }
    }

    /**
     * 태스크가 드랍되면 발생하는 이벤트 입니다.
     */
    handleDrop = (event) => {
        event.preventDefault();
        const key = event.dataTransfer.getData("text");
        const index = this.props.tasks.find((task) => {
            return task.key === key;
        });

        if(index) {
            // 현재보드에 드랍되었으면 아무일도 하지 않고 리턴한다.
            return;
        }

        // 타입을 변경한다.
        if(this.props.onChangeType) {
            this.props.onChangeType(key, this.props.taskType)
        }
    }

    handleDragOver = (event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "copy"
    }

    /**
     * 컴포넌트를 생성한다.
     */
    create = (props) => {
        const taskType = props.taskType;
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
        const taskList = props.tasks.map(task => new TaskCard({task: task, onDeleteTask: this.handleDeleteTask}));

        const element = makeElement('div', { className },
            makeElement('div', { className: "inbx"},
                [
                    makeElement('div', {className: "sec_title"}, [
                            makeElement('h2', null, [
                                title,
                                makeElement('span', {
                                    id: props.taskType + "_task_count",
                                    className: "count"
                                }, props.tasks.length.toString()),
                            ]),
                            taskType === "todo" ?
                                makeElement('button', {
                                    className: "btn_add",
                                    onclick: this.handleOpenAddDlg,
                                }, [
                                    makeElement('span', {className: "blind"}, "테스크 추가"),
                                    makeElement('span', {className: "ico_plus"}, null),
                                ]): null
                        ]
                    ),
                    makeElement('div', {className: "sec_content"},
                        // This is Drop Zone
                        makeElement('div',
                            {
                                id: props.taskType+ "_task_list_box",
                                className: "list_bx",
                                ondrop: this.handleDrop,
                                ondragover: this.handleDragOver,
                            },
                            taskList.map(taskList => taskList.render())
                        )
                    )
                ]
            )
        );
        return element;
    }

    update = (props) => {

        if(this.props.tasks !== props.tasks) {
            // 태스크 표시 숫자를 업데이트 한다.
            document.getElementById(props.taskType + "_task_count").textContent = props.tasks.length;

            // todo 성능 개선해야한다.!
            // parentElement.insertBefore(newElement, parentElement.children[2])

            // // 리스트의 모든 카드를 비운다.
            const list = document.getElementById(props.taskType +"_task_list_box");
            while (list.firstChild) {
                list.removeChild(list.firstChild);
            }

            // Task 리스트 추가
            const taskList = props.tasks.map(task => new TaskCard({task: task, onDeleteTask: this.handleDeleteTask}));
            taskList.forEach(task => list.appendChild(task.render()));
        }
        this.props = Object.assign({}, this.props, props);
    }
}

export default TaskPanel;