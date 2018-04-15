/**
 * App 입니다.
 * 프로그램의 Root 컨테이너 입니다.
 */
import Component from '../leact/Component';
import Header from '../components/Header';
import MainBoard from '../components/MainBoard';
import Footer from '../components/Footer';
import AddTaskDlg from '../components/dialog/AddTaskDlg';

/**
 * 데이터 관련 임포트
 */
import reducer from '../controller/reducer'

import {
    init,
    toggleAddDlg,
    addTask,
    deleteTask,
}from '../controller/actions';

class App extends Component {
    constructor() {
        super();
        this.children = {
            header: null,
            mainBoard: null,
            footer: null,
            AddTaskDlg: null,
        };

        this.reducer = new reducer(this);
        this.props = this.reducer.reduce(undefined, init());

        // /**
        //  * 데이터 설정
        //  */
        // this.props = {
        //     // 등록된 Task 리스트 입니다.
        //     tasks: {
        //         // to-do Task 리스트 입니다.
        //         todoTasks: [
        //         ],
        //         // inProgress Task 리스트 입니다.
        //         inProgressTasks: [
        //         ],
        //         // done Task 리스트 입니다.
        //         doneTasks: [
        //         ],
        //     },
        //     // 추가 다이얼로그
        //     openAddDialog: false,
        //     // 선택된 담당자
        //     selectedAssignees: new Set(),
        // }
    }

    // region Actions

    /**
     * 다이얼로그 오픈을 토글 혹은 설정한다.
     */
    handleToggleAddDlg = (open) => {
        // this.props = Object.assign({}, this.props, {openAddDialog: open});
        // this.update(this.props);
        this.reducer.run(this.props, toggleAddDlg(open));
    }

    /**
     * 태스크를 추가한다.
     */
    handleAddTask = (task) => {
        // // to-do 리스트를 복사해서 새로운 태스크를 추가한다.
        // const todoTasks = this.props.tasks.todoTasks.slice();
        // todoTasks.push(task);
        //
        // // task 를 복사하여 새로운 todoList 를 대입한다.
        // const tasks = Object.assign({}, this.props.tasks);
        // tasks.todoTasks = todoTasks;
        //
        // // props 를 복사하여 task 를 설정한다.
        // this.props = Object.assign({} , this.props, {tasks: tasks});
        //
        // // 다이얼로그 닫기 설정한다.
        // this.props = Object.assign({}, this.props, {openAddDialog: false});
        //
        // this.update(this.props);
        this.reducer.run(this.props, addTask(task));
    }

    /**
     * 태스크 삭제
     */
    handleDeleteTask = (task, taskType) => {
        // this.reducer.run(this.props, deleteTask(task, taskType));
        // task 를 복사하여 새로운 todoList 를 대입한다.
        const tasks = Object.assign({}, this.props.tasks);

        if(taskType === "todo") {
            // to-do 리스트를 복사해서 새로운 태스크를 추가한다.
            const todoTasks = this.props.tasks.todoTasks.slice();
            const index = todoTasks.indexOf(task);
            todoTasks.splice(index,1);
            tasks.todoTasks = todoTasks;

        } else if(taskType === "inProgress") {
            // to-do 리스트를 복사해서 새로운 태스크를 추가한다.
            const inProgressTasks = this.props.tasks.inProgressTasks.slice();
            const index = inProgressTasks.indexOf(task);
            inProgressTasks.splice(index,1);
            tasks.inProgressTasks = inProgressTasks;

        } else if(taskType === "done") {
            // to-do 리스트를 복사해서 새로운 태스크를 추가한다.
            const doneTasks = this.props.tasks.doneTasks.slice();
            const index = doneTasks.indexOf(task);
            doneTasks.splice(index,1);
            tasks.doneTasks = doneTasks;

        }

        // props 를 복사하여 task 를 설정한다.
        this.props = Object.assign({} , this.props, {tasks: tasks});

        // 태스크가 삭제되면서 선택된 담당자도 삭제되어야 하는지 판단한다.
        const delAssignees = task.assignees.filter((assignee) => {
            let isFind = false;
            this.props.tasks.todoTasks.forEach((task) => {
                if(task.assignees.indexOf(assignee) !== -1) {
                    isFind = true;
                }
            });
            this.props.tasks.inProgressTasks.forEach((task) => {
                if(task.assignees.indexOf(assignee) !== -1) {
                    isFind = true;
                }
            });
            this.props.tasks.doneTasks.forEach((task) => {
                if(task.assignees.indexOf(assignee) !== -1) {
                    isFind = true;
                }
            });
            return !isFind;
        });

        const selectedAssignees = new Set(this.props.selectedAssignees);
        delAssignees.forEach((assignee) => {
            selectedAssignees.delete(assignee);
        });

        this.props = Object.assign({}, this.props, {selectedAssignees: selectedAssignees});
        this.update(this.props);
    }

    /**
     * 태스크 타입변경
     */
    handleChangeType = (key, type) => {
        // task 를 복사하여 새로운 todoList 를 대입한다.
        const tasks = Object.assign({}, this.props.tasks);
        const todoTasks = this.props.tasks.todoTasks.slice();
        const inProgressTasks = this.props.tasks.inProgressTasks.slice();
        const doneTasks = this.props.tasks.doneTasks.slice();

        let task = null;

        // 각 태스크 리스트를 돌면서 태스크를 찾는다.
        // To do
        let index = tasks.todoTasks.findIndex((task) => {
            return task.key === key
        });
        if(index > -1) {
            task = tasks.todoTasks[index];
            todoTasks.splice(index,1);
        }

        // inProgress
        index = tasks.inProgressTasks.findIndex((task) => {
            return task.key === key
        });
        if(index > -1) {
            task = tasks.inProgressTasks[index];
            inProgressTasks.splice(index,1);
        }

        // done
        index = tasks.doneTasks.findIndex((task) => {
            return task.key === key
        });
        if(index > -1) {
            task = tasks.doneTasks[index];
            doneTasks.splice(index,1);
        }

        // 태스크를 추가한다.
        if(type === "todo") {
            todoTasks.push(task);
        } else if(type === "inProgress") {
            inProgressTasks.push(task);

        } else if(type === "done") {
            doneTasks.push(task);
        }

        tasks.todoTasks = todoTasks;
        tasks.inProgressTasks = inProgressTasks;
        tasks.doneTasks = doneTasks;

        // props 를 복사하여 task 를 설정한다.
        this.props = Object.assign({} , this.props, {tasks: tasks});
        this.update(this.props);
    }

    /**
     * 선택된 담당자가 변경되면 발생합니다.
     */
    handleSelectAssignee = (assignee, isAdd) => {
        const selectedAssignees = new Set(this.props.selectedAssignees);
        if(isAdd) {
            // 추가
            selectedAssignees.add(assignee);

        } else {
            // 삭제
            selectedAssignees.delete(assignee);
        }
        // 다이얼로그 닫기 설정한다.
        this.props = Object.assign({}, this.props, {selectedAssignees: selectedAssignees});
        this.update(this.props);
    }

    // endregion

    /**
     * 컴포넌트를 생성한다.
     */
    create = (props) => {
        // create

        const element = document.createElement('div');
        element.id = 'main';

        this.children.header = new Header();
        this.children.mainBoard = new MainBoard({
            tasks: props.tasks,
            selectedAssignees: [...props.selectedAssignees],
            onToggleAddDlg: this.handleToggleAddDlg,
            onSelectAssignee: this.handleSelectAssignee,
            onDeleteTask: this.handleDeleteTask,
            onChangeType: this.handleChangeType,
        });
        this.children.footer = new Footer();
        this.children.AddTaskDlg = new AddTaskDlg({
            open: props.openAddDialog,
            onToggleAddDlg: this.handleToggleAddDlg,
            addTask: this.handleAddTask,
        });

        Object.keys(this.children).forEach((key) => {
            element.appendChild(this.children[key].render());
        })
        this.props = Object.assign({}, this.props, props);
        return element;
    }

    /**
     * 컴포넌트를 업데이트 한다.
     */
    update = (props) => {
        this.children.mainBoard.render({
            tasks: props.tasks,
            selectedAssignees: [...props.selectedAssignees],
        });
        this.children.AddTaskDlg.render({
            open: props.openAddDialog,
        });
        this.props = Object.assign({}, this.props, props);
    }
}


export default App;

