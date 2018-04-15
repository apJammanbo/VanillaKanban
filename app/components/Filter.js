import { makeElement } from "../util";

class Filter {
    constructor(props) {
        this.props = props;
    }
    handleChange = (e) => {
        e.preventDefault();
        e.stopPropagation();
    }

    handleOpenAddDlg = () => {
        if(this.props.onToggleAddDlg) {
            this.props.onToggleAddDlg(true);
        }
    }

    make = () => {
        const assignees = this.props.assignees;

        const assigneeList = assignees.map((user) => {
            return makeElement('li', null,
                [
                    makeElement('input', {
                        type: "checkbox",
                        checked: false,
                        onclick: this.handleChange,
                        className: "i_check",
                        value: false,
                        id: user,
                    }, null),
                    makeElement('label', {htmlFor: user}, user),

                ]
            )
        })

        const element = makeElement('div', { className: "sec filter"},
            makeElement('div', {className: "inbx"},
                [
                    makeElement('div', { className: "sec_title"},
                        [
                            makeElement('h2', null, "User Filter"),
                            makeElement('button', {
                                type: "button",
                                className: "btn_create",
                                onclick: this.handleOpenAddDlg,
                            }, "Create Task"),
                        ]
                    ),
                    makeElement('div', { className: "sec_content"},
                        makeElement('div', {className: "user_list"}, assigneeList)
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

export default Filter;