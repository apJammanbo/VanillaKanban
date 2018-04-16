/**
 * Actions
 */

import {
    INIT,
    TOGGLE_ADD_DLG,
    ADD_TASK,
    DELETE_TASK,
    CHANGE_TYPE,
    SELECT_ASSIGNEE,
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
        type: DELETE_TASK,
        task,
        taskType,
    };
}

export function changeType(key, taskType) {
    return {
        type: CHANGE_TYPE,
        key,
        taskType,
    };
}

export function selectAssignee(assignee, isAdd) {
    return {
        type: SELECT_ASSIGNEE,
        assignee,
        isAdd,
    };
}