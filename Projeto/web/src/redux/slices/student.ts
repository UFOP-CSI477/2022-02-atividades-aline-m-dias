import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';
//
import { dispatch } from '../store';

// ----------------------------------------------------------------------

export type StudentProps = {
  id: number;
  name: string;
  email: string;
  registration: string;
  birthDate: string;
  address: string;
  created_at: string;
  password: string;
};

type studentState = {
  isLoading: boolean;
  error: Error | string | null;
  sortBy: string | null;
  students: StudentProps[];
  student: StudentProps | undefined;
  count: number;
};

const initialState: studentState = {
  isLoading: false,
  error: null,
  sortBy: null,
  count: 0,
  students: [],
  student: undefined
};

const slice = createSlice({
  name: 'Students',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    getStudentsSuccess(state, action) {
      state.isLoading = false;
      state.students = action.payload.items;
      state.count = action.payload.count;
    },

    getStudentSuccess(state, action) {
      state.isLoading = false;
      state.student = action.payload;
    }
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

type GetWisheProps = {
  step?: any;
  page: number;
};

export function getStudents({ step, page }: GetWisheProps) {

  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/student', {
        params: {
          index: Math.abs(page) * step,
          step,
        },
      });
      dispatch(slice.actions.getStudentsSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getStudent(id: number) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/student/${id}`);
      dispatch(slice.actions.getStudentSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function createStudent(student: StudentProps) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.post(`/student`, student);
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      throw error;
    }
  };
}

export function updateStudent(id: number, student: StudentProps) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.patch(`/student/${id}`, student);
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      throw error;
    }
  };
}

export function deleteStudent(id: number) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.delete(`/student/${id}`);
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      throw error;
    }
  };
}