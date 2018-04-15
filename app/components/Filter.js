/**
 *  Filter 프로그램 상단의 헤더입니다.
 */

import Component from '../leact/Component';
import { makeElement } from "../leact/Leact";

class Filter extends Component {
    /**
     * constructor
     * 초기 element 및 props, state 를 설정한다.
     */
    constructor(props) {
        super(props);
    }

    // region Actions

    handleChange = (e) => {
        const assignee = e.target.id.replace('user_', '');
        if(e.target.checked) {
            // 선택된 담당자 추가
            this.props.onSelectAssignee(assignee, true);
        } else {
            // 선택된 담당자 추가
            this.props.onSelectAssignee(assignee, false);
        }
    }


    /**
     * 새로운 태스크 생성 버튼이 클릭되면 발생하는 액션입니다.
     */
    handleOpenAddDlg = () => {
        if(this.props.onToggleAddDlg) {
            this.props.onToggleAddDlg(true);
        }
    }

    // endregion

    // Functions

    /**
     * 담담자 리스트 생성 함수
     */
    createAssigneeCheckBox = (assignee, value = false) => {
        return makeElement('li', {id: "user_li_" + assignee,},
            [
                makeElement('input', {
                    type: "checkbox",
                    checked: value,
                    onclick: this.handleChange,
                    className: "i_check",
                    id: "user_" + assignee,
                }, null),
                makeElement('label', {htmlFor: assignee}, assignee),

            ]
        )
    }

    // endregion

    // region About Render

    /**
     * 컴포넌트를 생성한다.
     */
    create = (props) => {
        // 담당자 리스트 생성
        const assigneeList = props.assignees.map((assignee) => {
            const value = this.props.selectedAssignees.indexOf(assignee) !== -1
            return this.createAssigneeCheckBox(assignee, value);
        });

        // 전체 엘레멘트 생성
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
                        makeElement('div', {id: "user_list", className: "user_list"}, assigneeList)
                    )
                ]
            )
        );
        return element;
    }

    /**
     * 변경된 속성들로 부터 컴포넌트를 조작한다.
     */
    update = (props) => {
        if(this.props.assignees !== props.assignees) {
            const userListElement = document.getElementById("user_list");
            if(this.props.assignees.length < props.assignees.length) {
                // 담당자를 추가한다.
                // 새롭게 추가된 담당자 리스트 구하기
                const addedAssignee = props.assignees.filter((assignee) => {
                    return this.props.assignees.indexOf(assignee) === -1
                });


                // 리스트 엘리면트에 추가된 담당자 체크박스를 추가한다.
                addedAssignee.forEach((assignee) => {
                    userListElement.appendChild(this.createAssigneeCheckBox(assignee));
                });
            } else if(this.props.assignees.length > props.assignees.length) {
                // 담당자를 삭제한다.
                // 삭제된 담당자 리스트 구하기
                const removedAssignee = this.props.assignees.filter((assignee) => {
                    return props.assignees.indexOf(assignee) === -1
                });


                // 리스트 엘리면트에 삭제된 담당자를 제거한다.
                removedAssignee.forEach((assignee) => {
                    userListElement.childNodes.forEach((element) => {
                        if(element.id === "user_li_" + assignee) {
                            userListElement.removeChild(element);
                        }
                    })
                });
            }
        }
        this.props = Object.assign({}, this.props, props);

    }

    // endregion
}

export default Filter;