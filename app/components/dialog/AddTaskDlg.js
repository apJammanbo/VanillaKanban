import { makeElement } from "../../util";

class AddTaskDlg {
    constructor(props) {
        this.element = null;
        this.props = props;
        this.state = {
            taskInfo: {
                type: "todo",
                title: "",
                description: "",
                assignees: "",
            }
        }
    }

    handleCloseDlg = () => {
        if(this.props.onToggleAddDlg) {
            this.props.onToggleAddDlg(false);
        }
    }

    handleAddTask = () => {
        // 태스크 추가 가능 상태 확인
        if(this.state.taskInfo.title.trim() === '') {
            document.getElementById('add_title').focus();
            return;
        }

        if(this.state.taskInfo.description.trim() === '') {
            document.getElementById('add_description').focus();
            return;
        }

        if(this.state.taskInfo.assignees.trim() === '') {
            document.getElementById('add_assigneesn').focus();
            return;
        }

        // 태스크를 추가한다.
        const addTask = {
            title: this.state.taskInfo.title.trim(),
            description: this.state.taskInfo.description.trim(),
            assignees: this.state.taskInfo.assignees.split(',').map(assignee => assignee.trim()).filter(assignee => assignee !== ''),
        }

        console.log(addTask);
    }

    handleTitleChange = (e) => {
        this.state.taskInfo.title = e.target.value;
    }

    handleDescriptionChange = (e) => {
        this.state.taskInfo.description = e.target.value;
    }

    handleAssigneeChange = (e) => {
        this.state.taskInfo.assignees = e.target.value;
    }

    create = () => {
        if(this.props.open) {
            const element = makeElement('div', {className: "dialog"},
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
                                        makeElement('dt', null, 'Description'),
                                        makeElement('dd', null,
                                            makeElement('textarea', {
                                                id: "add_textarea",
                                                className: "is_description",
                                                onchange: this.handleDescriptionChange,
                                            }, null)
                                        ),
                                        makeElement('dt', null, 'Assginee'),
                                        makeElement('dd', null,
                                            makeElement('input', {
                                                id: "add_assginee",
                                                type: "text",
                                                className: "is_assginee",
                                                onchange: this.handleAssigneeChange,
                                            }, null)
                                        ),
                                    ])
                                ),
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
            this.element = element;
            return element;
        } else {
            return false;
        }
    }

    render = (props = null) => {
        if(props) {
            this.props = Object.assign({}, this.props, props);
        }
        if(!this.element) {
            return this.create();
            // return this.element;
        } else {
            this.update();
            // return false;
        }
        return this.element;
    }
}

export default AddTaskDlg;