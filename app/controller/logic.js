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
        const tasks = Object.assign({}, this.props.tasks);

        if(action.taskType === "todo") {
            // to-do 리스트를 복사해서 새로운 태스크를 추가한다.
            const todoTasks = data.tasks.todoTasks.slice();
            const index = todoTasks.indexOf(action.task);
            todoTasks.splice(index,1);
            tasks.todoTasks = todoTasks;

        } else if(action.taskType === "inProgress") {
            // to-do 리스트를 복사해서 새로운 태스크를 추가한다.
            const inProgressTasks = data.tasks.inProgressTasks.slice();
            const index = inProgressTasks.indexOf(action.task);
            inProgressTasks.splice(index,1);
            tasks.inProgressTasks = inProgressTasks;

        } else if(action.taskType === "done") {
            // to-do 리스트를 복사해서 새로운 태스크를 추가한다.
            const doneTasks = data.tasks.doneTasks.slice();
            const index = doneTasks.indexOf(action.task);
            doneTasks.splice(index,1);
            tasks.doneTasks = doneTasks;

        }

        // props 를 복사하여 task 를 설정한다.
        let result = Object.assign({} , this.props, {tasks: tasks});

        // 태스크가 삭제되면서 선택된 담당자도 삭제되어야 하는지 판단한다.
        const delAssignees = task.assignees.filter((assignee) => {
            let isFind = false;
            result.tasks.todoTasks.forEach((task) => {
                if(task.assignees.indexOf(assignee) !== -1) {
                    isFind = true;
                }
            });
            result.tasks.inProgressTasks.forEach((task) => {
                if(task.assignees.indexOf(assignee) !== -1) {
                    isFind = true;
                }
            });
            result.tasks.doneTasks.forEach((task) => {
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

        result = Object.assign({}, result, {selectedAssignees: selectedAssignees});

        console.log(result);
        return result;
    }