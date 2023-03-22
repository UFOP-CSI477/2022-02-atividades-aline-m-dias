import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';
//
import { dispatch } from '../store';

// ----------------------------------------------------------------------

export type TaskProps = {
  id: number;
  description: string;
  deliveryDate: string;
  studentId: number;
  classId: number
  student: {
    name: string;
  }
  class: {
    name: string;
  }
};

type taskState = {
  isLoading: boolean;
  error: Error | string | null;
  sortBy: string | null;
  tasks: TaskProps[];
  task: TaskProps | undefined;
  count: number;
};

const initialState: taskState = {
  isLoading: false,
  error: null,
  sortBy: null,
  count: 0,
  tasks: [],
  task: undefined
};

const slice = createSlice({
  name: 'Task',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    getTasksSuccess(state, action) {
      state.isLoading = false;
      state.tasks = action.payload.items;
      state.count = action.payload.count;
    },

    getTaskSuccess(state, action) {
      state.isLoading = false;
      state.task = action.payload;
    }
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

type GetTasksProps = {
  step: any;
  page: number;
};

export function getTasks({ step, page }: GetTasksProps) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/task', {
        params: {
          index: Math.abs(page) * step,
          step,
        },
      });
      dispatch(slice.actions.getTasksSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getTask(id: number) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/task/${id}`);
      dispatch(slice.actions.getTaskSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function createTask(task: TaskProps) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.post(`/task`, task);
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      throw error;
    }
  };
}

export function updateTask(id: number, task: TaskProps) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.patch(`/task/${id}`, task);
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      throw error;
    }
  };
}

export function deleteTask(id: number) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.delete(`/task/${id}`);
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      throw error;
    }
  };
}