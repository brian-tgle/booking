import { createStore, createHook } from 'react-sweet-state';

export const BOOKING_STORE = 'BookingStore';
export const initState = {
  showModal: false,
  bookingData: {},
  needRefresh: false
};

export const actions = {
  setShowModal: (showModal) => ({ setState }) => {
    setState({ showModal });
  },
  setBookingData: (bookingData) => ({ setState }) => {
    setState({ bookingData });
  },
  setRefresh: (needRefresh) => ({ setState }) => {
    setState({ needRefresh });
  }
};

export const Store = createStore({
  initialState: initState,
  actions,
  name: BOOKING_STORE
});

const useBookingStore = createHook(Store);

export default useBookingStore;
