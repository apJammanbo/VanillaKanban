/**
 * Actions
 */

import {
    INIT,
    TOGGLE_ADD_DLG,
    ADD_TASK,

} from './constants';

export function init() {
    return {
        type: INIT,
    };
}

export function toggleAddDlg(value) {
    return {
        type: TOGGLE_ADD_DLG,
        value,
    };
}

export function addTask(value) {
    return {
        type: ADD_TASK,
        value,
    };
}

export function deleteTask(task, taskType) {
    return {
        type: ADD_TASK,
        task,
        taskType,
    };
}
