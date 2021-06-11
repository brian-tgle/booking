import { createStore, createHook } from 'react-sweet-state';

export const TYPE_OF_EVENT_STORE = 'TypeOfEventStore';
export const initState = {
  updateData: {},
  needRefresh: false
};

export const actions = {
  setUpdateData: (updateData) => ({ setState }) => {
    setState({ updateData });
  },
  setRefresh: (needRefresh) => ({ setState }) => {
    setState({ needRefresh });
  }
};

export const Store = createStore({
  initialState: initState,
  actions,
  name: TYPE_OF_EVENT_STORE
});

const useTypeOdEventStore = createHook(Store);

export default useTypeOdEventStore;
