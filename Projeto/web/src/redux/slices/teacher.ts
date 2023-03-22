import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';
//
import { dispatch } from '../store';

// ----------------------------------------------------------------------

export type TeacherProps = {
  id: number;
  name: string;
  email: string;
};

type teacherState = {
  isLoading: boolean;
  error: Error | string | null;
  sortBy: string | null;
  teachers: TeacherProps[];
  teacher: TeacherProps | undefined;
  count: number;
};

const initialState: teacherState = {
  isLoading: false,
  error: null,
  sortBy: null,
  count: 0,
  teachers: [],
  teacher: undefined
};

const slice = createSlice({
  name: 'Teacher',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    getTeachersSuccess(state, action) {
      state.isLoading = false;
      state.teachers = action.payload.items;
      state.count = action.payload.count;
    },

    getTeacherSuccess(state, action) {
      state.isLoading = false;
      state.teacher = action.payload;
    }
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

type GetTeacherProps = {
  step: any;
  page: number;
};

export function getTeachers({ step, page }: GetTeacherProps) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/teacher', {
        params: {
          index: Math.abs(page) * step,
          step,
        },
      });
      dispatch(slice.actions.getTeachersSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getTeacher(id: number) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/teacher/${id}`);
      dispatch(slice.actions.getTeacherSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function createTeacher(teacher: TeacherProps) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.post(`/teacher`, teacher);
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      throw error;
    }
  };
}

export function updateTeacher(id: number, teacher: TeacherProps) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.patch(`/teacher/${id}`, teacher);
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      throw error;
    }
  };
}

export function deleteTeacher(id: number) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.delete(`/teacher/${id}`);
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      throw error;
    }
  };
}