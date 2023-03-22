import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';
//
import { dispatch } from '../store';

// ----------------------------------------------------------------------

export type DeliveriesProps = {
  id: number;
  deliveryDate: string;
  grades: number;
  studentId: number
  student: {
    name: true
  }
};

type deliveriesState = {
  isLoading: boolean;
  error: Error | string | null;
  sortBy: string | null;
  deliveries: DeliveriesProps[];
  delivery: DeliveriesProps | undefined;
  count: number;
};

const initialState: deliveriesState = {
  isLoading: false,
  error: null,
  sortBy: null,
  count: 0,
  deliveries: [],
  delivery: undefined
};

const slice = createSlice({
  name: 'Deliveries',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    getDeliveriesSuccess(state, action) {
      state.isLoading = false;
      state.deliveries = action.payload.items;
      state.count = action.payload.count;
    },

    getDeliverySuccess(state, action) {
      state.isLoading = false;
      state.delivery = action.payload;
    },

    clearData(state) {
      state.delivery = undefined;
    }
  },
});

// Reducer
export default slice.reducer;

export const { clearData } = slice.actions;

// ----------------------------------------------------------------------

type GetDeliveriesProps = {
  step: any;
  page: number;
};

export function getDeliveries({ step, page }: GetDeliveriesProps) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/deliveries', {
        params: {
          index: Math.abs(page) * step,
          step,
        },
      });
      dispatch(slice.actions.getDeliveriesSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getDelivery(id: number) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/deliveries/${id}`);
      dispatch(slice.actions.getDeliverySuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function createDelivery(delivery: DeliveriesProps) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.post(`/deliveries`, delivery);
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      throw error;
    }
  };
}

export function updateDelivery(id: number, delivery: DeliveriesProps) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.patch(`/deliveries/${id}`, delivery);
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      throw error;
    }
  };
}

export function deleteDelivery(id: number) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.delete(`/deliveries/${id}`);
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      throw error;
    }
  };
}