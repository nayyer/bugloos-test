import { Action, createFeature, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { Task } from './favorite.model';
import * as favoriteActions from './favorite.actions';
import {Storage} from "@core/helpers/Storage";

export interface State {
  tasks?: Task[];
  currentTask?: Task;
  deleteTaskId?: any;
  result?: any;
  isLoading?: boolean;
  isLoadingSuccess?: boolean;
  isLoadingFailure?: boolean;
}

export const initialState: State = {
  tasks: [],
  currentTask: {},
  deleteTaskId: '',
  result: '',
  isLoading: false,
  isLoadingSuccess: false,
  isLoadingFailure: false
};

export const favoriteReducer = createReducer(
  initialState,

  // GeTasks
  on(favoriteActions.getTasks, (state) => {
      
    return {...state, isLoading: true}
      
  }),
  on(favoriteActions.getTasksFailure, (state) => {
   return {...state, isLoading: true}}),
  on(favoriteActions.getTasksSuccess, (state, result) => {
      return{...state,tasks: result.data, isLoading: false, isLoadingSuccess: true}
  }),

  // Create Task Reducers
  on(favoriteActions.createTask, (state, {task}) => ({...state, isLoading: true, currentTask: task})),
  on(favoriteActions.createTaskSuccess, (state, result) => {
    const tasks = undefined !== state.tasks ? JSON.parse(JSON.stringify(state.tasks)) : [];
    const currentTask = undefined !== state.currentTask ? JSON.parse(JSON.stringify(state.currentTask)) : {};
    currentTask.id = result.taskId;
    tasks.push(currentTask);
    return {
      tasks,
      isLoading: false,
      isLoadingSuccess: true
    };
  }),

  // Delete Task Reducers
  on(favoriteActions.deleteTask, (state, {taskid}) => ({...state, isLoading: true, deleteTaskId: taskid})),
  on(favoriteActions.deleteTaskSuccess, (state, result) => {
    let tasks = undefined !== state.tasks ? JSON.parse(JSON.stringify(state.tasks)) : [];
    if (result) {
      tasks = tasks.filter((task: { productId: any; }) => task.productId !== state.deleteTaskId);
    }
    return {
      tasks,
      isLoading: false,
      isLoadingSuccess: true
    };
  }),

   // Edit Task Reducers
   on(favoriteActions.editTask, (state, {task}) => ({...state, isLoading: true, currentTask: task})),
   on(favoriteActions.editTaskSuccess, (state, result) => {
    let tasks = undefined !== state.tasks ? JSON.parse(JSON.stringify(state.tasks)) : [];
    const currentTask = undefined !== state.currentTask ? JSON.parse(JSON.stringify(state.currentTask)) : {};
    tasks = tasks.map((tsk: { id: any; }) => {
      if (tsk.id === currentTask.id) {
        tsk = currentTask;
      }
      return tsk;
    });
    return {
      tasks,
      isLoading: false,
      isLoadingSuccess: true
    };
  })
);

export function reducer(state: State | undefined, action: Action): any {
  return favoriteReducer(state, action);
}

export const favoriteSelector=createSelector(createFeatureSelector("favorites"),(favorites:any)=>favorites)

export const getTasks = (state: State) => {
if (state){
  return {
    tasks: state.tasks,
    isLoading: state.isLoading,
    isLoadingSuccess: state.isLoadingSuccess
  };
}
return {
    tasks:[],
    isLoading:false
}

};