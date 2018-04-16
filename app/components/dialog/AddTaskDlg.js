/**
 * AddTaskDlg 태스크를 추가하는 다이얼로그 입니다.
 */

import Component from '../../leact/Component';
import { makeElement } from "../../leact/Leact";


class AddTaskDlg extends Component {

    /**
     * constructor
     * 초기 element 및 props, state 를 설정한다.
     */
    constructor(props) {
        super(props);
        this.state = {
            taskInfo: {
                title: "",
                description: "",
                assignees: "",
            }
        }
    }

    // region Actions

    /**
     * 다이얼로그를 닫는다.
     */
    handleCloseDlg = () => {
        if(this.props.onToggleAddDlg) {
            this.props.onToggleAddDlg(false);
        }
    }

    /**
     * 태스크를 추가한다.
     */
    handleAddTask = () => {
        // 태스크 추가 가능 상태 확인(불가하면 원인이 되는 컴포넌트로 포커스를 보낸다.)
        if(this.state.taskInfo.title.trim() === '') {
            document.getElementById('add_title').focus();
            return;
        }

        if(this.state.taskInfo.description.trim() === '') {
            document.getElementById('add_description').focus();
            return;
        }

        if(this.state.taskInfo.assignees.trim() === '') {
            document.getElementById('add_assginee').focus();
            return;
        }

        // 추가할 태스크를 생성한다.
        const task = {
            key: Date.now().toString(),
            title: this.state.taskInfo.title.trim(),
            description: this.state.taskInfo.description.trim(),
            assignees: this.state.taskInfo.assignees.split(',').map(assignee => assignee.trim()).filter(assignee => assignee !== ''),
        }

        // 태스크 정보 초기화
        this.state.taskInfo = {
            title: "",
            description: "",
            assignees: "",
        }

        // 태스크를 추가한다.
        if(this.props.addTask) {
            this.props.addTask(task)
        }
    }

    // endregion

    // region About State

    /**
     * 태스크 제목 변경
     */
    handleTitleChange = (e) => {
        this.state.taskInfo.title = e.target.value;
    }

    /**
     * 태스크 설명 변경
     */
    handleDescriptionChange = (e) => {
        this.state.taskInfo.description = e.target.value;
    }

    /**
     * 태스크 담당자 변경
     */
    handleAssigneeChange = (e) => {
        this.state.taskInfo.assignees = e.target.value;
    }

    // endregion

    // region About Render

    /**
     * 컴포넌트를 생성한다.
     */
    create = (props) => {
        let element = null;
        if(props.open) {
            element = makeElement('div', {className: "dialog"},
                [
                    // dim
                    makeElement('div', { className: "dimmed",  onclick: this.handleCloseDlg }, null),
                    // form
                    makeElement('div', { className: "dialog_wrap"},
                        makeElement('div', { className: "dialog_bx"}, [
                                makeElement('div', { className: "dialog_title"},
                                    makeElement('h1', null, "Add Task")
                                ),
                                makeElement('form', { className: "dialog_content" },
                                    makeElement('dl', { className: "insult_bx" }, [
                                        // Title
                                        makeElement('dt', null, 'Title'),
                                        makeElement('dd', null,
                                            makeElement('input', {
                                                id: "add_title",
                                                type: "text",
                                                className: "is_title",
                                                value: this.state.taskInfo.title,
                                                onchange: this.handleTitleChange,
                                            }, null)
                                        ),
                                        // Description
                                        makeElement('dt', null, 'Description'),
                                        makeElement('dd', null,
                                            makeElement('textarea', {
                                                id: "add_textarea",
                                                className: "is_description",
                                                value: this.state.taskInfo.description,
                                                onchange: this.handleDescriptionChange,
                                            }, null)
                                        ),
                                        // Assginee
                                        makeElement('dt', null, 'Assginee'),
                                        makeElement('dd', null,
                                            makeElement('input', {
                                                id: "add_assginee",
                                                type: "text",
                                                className: "is_assginee",
                                                value: this.state.taskInfo.assignees,
                                                onchange: this.handleAssigneeChange,
                                            }, null)
                                        ),
                                    ])
                                ),
                                // Button
                                makeElement('div', { className: "btn_bx" }, [
                                        makeElement('button', {
                                            type: "button",
                                            className: "btn_ok",
                                            onclick: this.handleAddTask,
                                        }, "OK"),
                                        makeElement('button', {
                                            type: "button",
                                            className: "btn_cancel",
                                            onclick: this.handleCloseDlg,
                                        }, "Cancel"),
                                    ]
                                )
                            ]
                        )
                    )
                ]
            );
            return element;
        } else {
            element = makeElement('div', {className: "dialog"});
            element.style.display = "none";
        }
        return element;
    }

    /**
     * 변경된 속성들로 부터 컴포넌트를 조작한다.
     */
    update = (props) => {
        // 다이얼로그 열기/닫기 토글
        if(this.props.open !== props.open) {
            const parent = this.element.parentNode;

            // 속성에 맞게 다이얼로그를 생성한다.
            const element = this.create(props);
            parent.replaceChild(element, this.element);
            this.element = element;
        }
        this.props = Object.assign({}, this.props, props);
    }

    // endregion

    /**
     * 변경된 속성들로 부터 Dom을 조작한다.
     */
    render = (props = null) => {
        if(!this.element) {
            // 초기생성이면 create 함수를 호출한다.
            this.element = this.create(this.props);
        } else {
            // 이미 생성이 되었으면 업데이트 한다.
            this.update(props);
        }
        return this.element;
    }
}

export default AddTaskDlg;