import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';
//
import { dispatch } from '../store';

// ----------------------------------------------------------------------

export type ClassProps = {
  id: number;
  name: string;
  year: string;
  teacherId: number;
  teacher: {
    name: string;
  }
};

type classState = {
  isLoading: boolean;
  error: Error | string | null;
  sortBy: string | null;
  classes: ClassProps[];
  class: ClassProps | undefined;
  count: number;
};

const initialState: classState = {
  isLoading: false,
  error: null,
  sortBy: null,
  count: 0,
  classes: [],
  class: undefined
};

const slice = createSlice({
  name: 'Class',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    getClassesSuccess(state, action) {
      state.isLoading = false;
      state.classes = action.payload.items;
      state.count = action.payload.count;
    },

    getClassSuccess(state, action) {
      state.isLoading = false;
      state.class = action.payload;
    }
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

type GetClassesProps = {
  step: any;
  page: number;
};

export function getClasses({ step, page }: GetClassesProps) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/class', {
        params: {
          index: Math.abs(page) * step,
          step,
        },
      });
      dispatch(slice.actions.getClassesSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getClass(id: number) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/class/${id}`);
      dispatch(slice.actions.getClassSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function createClass(data: ClassProps) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.post(`/class`, data);
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      throw error;
    }
  };
}

export function updateClass(id: number, data: ClassProps) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.patch(`/class/${id}`, data);
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      throw error;
    }
  };
}

export function deleteClass(id: number) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.delete(`/class/${id}`);
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      throw error;
    }
  };
}