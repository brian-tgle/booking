/* eslint-disable no-use-before-define */
import { createStore, createHook, createContainer } from 'react-sweet-state';
import databases from 'cache';
import { setAuthToken } from 'services/repository';

export const AUTHENTICATION_STORE = 'AuthenticationStore';
export const initState = {
  message: '',
  user: {
    id: '',
    fullname: '',
    token: '',
    role: ''
  },
  loggedIn: false,
  initiated: false
};

export const actions = {
  onLoad: (payload) => ({ setState }) => {
    setState({ ...payload });
  },
  setUserProfile: (user) => ({ setState }) => {
    setState({ user });
  },
  login: (values) => async ({ setState }) => {
    // Attach token in axios header
    setAuthToken(values.token);
    setState({
      user: {
        id: values.id,
        fullname: values.fullname,
        token: values.token,
        role: values.role
      },
      loggedIn: true,
      initiated: false
    });
  },
  logout: () => async ({ setState }) => {
    try {
      setState({ ...initState });
      await databases.removeitem(storeKey);
      setAuthToken('');
    } catch {
      setState({ ...initState });
      if (databases) {
        await databases.removeItem(storeKey);
      }
    }
  }
};

export const Store = createStore({
  initialState: initState,
  actions,
  name: AUTHENTICATION_STORE
});

const useAuthentication = createHook(Store);

export const storeKey = `${Store.key.join('__')}@__global__`;

export const AuthenticationContainer = createContainer(Store, {
  onInit: () => ({ setState }, { initialState }) => {
    // Attach token in axios header
    setAuthToken(initialState?.user?.token);
    setState(initialState);
  }
});

export default useAuthentication;
