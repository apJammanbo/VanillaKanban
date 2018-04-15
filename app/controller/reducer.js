/**
 * KanbanReducer
 */
import {
    TOGGLE_ADD_DLG,
    ADD_TASK,
    DELETE_TASK,
} from './constants';

import {
    toggleAddDlg,
    addTask,
    deleteTask,
} from './logic';

const initialData = {
    // 등록된 Task 리스트 입니다.
    tasks: {
        // to-do Task 리스트 입니다.
        todoTasks: [],
        // inProgress Task 리스트 입니다.
        inProgressTasks: [],
        // done Task 리스트 입니다.
        doneTasks: [],
    },
    // 추가 다이얼로그
    openAddDialog: false,
    // 선택된 담당자
    selectedAssignees: new Set(),
};

class KanbanReducer {
    /**
     * 컨테이너를 설정한다.
     * @param container
     */
    constructor(container) {
        this.container = container;
    }

    /**
     * 액션을 실행한다.
     */
    run = (data = initialData, action) => {
        const ret = this.reduce(data, action);
        console.log(ret);
        this.container.render(ret);
    }

    reduce = (data = initialData, action) => {
        switch (action.type) {
            case TOGGLE_ADD_DLG:
                return toggleAddDlg(data, action);
            case ADD_TASK:
                return addTask(data, action);
            // case DELETE_TASK:
            //     return deleteTask(data, action);
            default:
                return data;
        }
    }
}
export default KanbanReducer;