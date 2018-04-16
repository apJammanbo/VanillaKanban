/**
 * 로직 모음입니다.
 */

/**
 * 태스크 추가 다이얼로그를 토글합니다.
 */
export function toggleAddDlg(data, action) {
    const result = Object.assign({}, data, {openAddDialog: action.value});
    return result;
}


/**
 * 태스크를 추가한다.
 */
export function addTask(data, action) {
    // to-do 리스트를 복사해서 새로운 태스크를 추가한다.
    const todoTasks = data.tasks.todoTasks.slice();
    todoTasks.push(action.value);

    // task 를 복사하여 새로운 todoList 를 대입한다.
    const tasks = Object.assign({}, data.tasks);
    tasks.todoTasks = todoTasks;

    // props 를 복사하여 task 를 설정한다.
    let result = Object.assign({} , data, {tasks: tasks});

    // 다이얼로그 닫기 설정한다.
    result = Object.assign({}, result, {openAddDialog: false});

    return result;
}

/**
 * 태스크 삭제
 */
export function deleteTask(data, action) {

    // task 를 복사하여 새로운 todoList 를 대입한다.
    let props = data;
    const tasks = Object.assign({}, props.tasks);

    if(action.taskType === "todo") {
        // to-do 리스트를 복사해서 새로운 태스크를 추가한다.
        const todoTasks = props.tasks.todoTasks.slice();
        const index = todoTasks.indexOf(action.task);
        todoTasks.splice(index,1);
        tasks.todoTasks = todoTasks;

    } else if(action.taskType === "inProgress") {
        // to-do 리스트를 복사해서 새로운 태스크를 추가한다.
        const inProgressTasks = props.tasks.inProgressTasks.slice();
        const index = inProgressTasks.indexOf(action.task);
        inProgressTasks.splice(index,1);
        tasks.inProgressTasks = inProgressTasks;

    } else if(action.taskType === "done") {
        // to-do 리스트를 복사해서 새로운 태스크를 추가한다.
        const doneTasks = props.tasks.doneTasks.slice();
        const index = doneTasks.indexOf(task);
        doneTasks.splice(index,1);
        tasks.doneTasks = doneTasks;

    }

    // props 를 복사하여 task 를 설정한다.
    props = Object.assign({} , props, {tasks: tasks});

    // 태스크가 삭제되면서 선택된 담당자도 삭제되어야 하는지 판단한다.
    const delAssignees = action.task.assignees.filter((assignee) => {
        let isFind = false;
        props.tasks.todoTasks.forEach((task) => {
            if(task.assignees.indexOf(assignee) !== -1) {
                isFind = true;
            }
        });
        props.tasks.inProgressTasks.forEach((task) => {
            if(task.assignees.indexOf(assignee) !== -1) {
                isFind = true;
            }
        });
        props.tasks.doneTasks.forEach((task) => {
            if(task.assignees.indexOf(assignee) !== -1) {
                isFind = true;
            }
        });
        return !isFind;
    });

    const selectedAssignees = new Set(props.selectedAssignees);
    delAssignees.forEach((assignee) => {
        selectedAssignees.delete(assignee);
    });

    props = Object.assign({}, props, {selectedAssignees: selectedAssignees});
    return props;
}
``
/**
 * 태스크 타입변경
 */
export function changeType(data, action) {
    // task 를 복사하여 새로운 todoList 를 대입한다.
    let props = data;
    const tasks = Object.assign({}, props.tasks);
    const todoTasks = props.tasks.todoTasks.slice();
    const inProgressTasks = props.tasks.inProgressTasks.slice();
    const doneTasks = props.tasks.doneTasks.slice();

    let task = null;

    // 각 태스크 리스트를 돌면서 태스크를 찾는다.
    // To do
    let index = tasks.todoTasks.findIndex((task) => {
        return task.key === action.key
    });
    if(index > -1) {
        task = tasks.todoTasks[index];
        todoTasks.splice(index,1);
    }

    // inProgress
    index = tasks.inProgressTasks.findIndex((task) => {
        return task.key === action.key
    });
    if(index > -1) {
        task = tasks.inProgressTasks[index];
        inProgressTasks.splice(index,1);
    }

    // done
    index = tasks.doneTasks.findIndex((task) => {
        return task.key === action.key
    });
    if(index > -1) {
        task = tasks.doneTasks[index];
        doneTasks.splice(index,1);
    }

    // 태스크를 추가한다.
    if(action.taskType === "todo") {
        todoTasks.push(task);
    } else if(action.taskType === "inProgress") {
        inProgressTasks.push(task);

    } else if(action.taskType === "done") {
        doneTasks.push(task);
    }

    tasks.todoTasks = todoTasks;
    tasks.inProgressTasks = inProgressTasks;
    tasks.doneTasks = doneTasks;

    // props 를 복사하여 task 를 설정한다.
    props = Object.assign({} , props, {tasks: tasks});
    return props;
}

/**
 * 선택된 담당자가 변경되면 발생합니다.
 */
export function selectAssignee(data, action) {
    let props = data;
    const selectedAssignees = new Set(props.selectedAssignees);
    if(action.isAdd) {
        // 추가
        selectedAssignees.add(action.assignee);

    } else {
        // 삭제
        selectedAssignees.delete(action.assignee);
    }
    // 다이얼로그 닫기 설정한다.
    props = Object.assign({}, props, {selectedAssignees: selectedAssignees});
    return props;
}