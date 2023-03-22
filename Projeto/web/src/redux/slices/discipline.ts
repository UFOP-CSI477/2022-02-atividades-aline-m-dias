import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';
//
import { dispatch } from '../store';

// ----------------------------------------------------------------------

export type DisciplineProps = {
  id: number;
  name: string;
  workload: string;
  university: string;
  teacherId: number;
  taskId: number;
  teacher: {
    name: string;
  }
  task: {
    description: string;
  }
};

type taskState = {
  isLoading: boolean;
  error: Error | string | null;
  sortBy: string | null;
  disciplines: DisciplineProps[];
  discipline: DisciplineProps | undefined;
  count: number;
};

const initialState: taskState = {
  isLoading: false,
  error: null,
  sortBy: null,
  count: 0,
  disciplines: [],
  discipline: undefined
};

const slice = createSlice({
  name: 'Discipline',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    getDisciplinesSuccess(state, action) {
      state.isLoading = false;
      state.disciplines = action.payload.items;
      state.count = action.payload.count;
    },

    getDisciplineSuccess(state, action) {
      state.isLoading = false;
      state.discipline = action.payload;
    }
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

type GetDisciplinesProps = {
  step: any;
  page: number;
};

export function getDisciplines({ step, page }: GetDisciplinesProps) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/discipline', {
        params: {
          index: Math.abs(page) * step,
          step,
        },
      });
      dispatch(slice.actions.getDisciplinesSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getDiscipline(id: number) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/discipline/${id}`);
      dispatch(slice.actions.getDisciplineSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function createDiscipline(discipline: DisciplineProps) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.post(`/discipline`, discipline);
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      throw error;
    }
  };
}

export function updateDiscipline(id: number, discipline: DisciplineProps) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.patch(`/discipline/${id}`, discipline);
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      throw error;
    }
  };
}

export function deleteDiscipline(id: number) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.delete(`/discipline/${id}`);
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      throw error;
    }
  };
}