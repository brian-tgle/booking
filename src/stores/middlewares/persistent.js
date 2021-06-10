import { defaults } from 'react-sweet-state';
import databases from 'cache';
import { AUTHENTICATION_STORE } from 'stores/authentication/authentication';

const WHITE_LIST = [AUTHENTICATION_STORE];

const persistent = (storeState) => (next) => (fn) => {
  const result = next(fn);
  const { key } = storeState;
  const isInWhiteList = WHITE_LIST.filter((store) => key.includes(store)).length > 0;

  if (isInWhiteList) {
    const state = storeState.getState();
    databases.setItem(storeState.key, state).catch((error) => {
      // eslint-disable-next-line no-console
      console.error(error);
    });
  }
  return result;
};

defaults.middlewares.add(persistent);
