import React, { useLayoutEffect, useState } from 'react';
import { AuthenticationContainer, initState as initialStoreState, storeKey } from './authentication';
import databases from '../../cache';

const withPersistedAuth = (Component) => ({ ...props }) => {
  const [storePersisted, setStorePersisted] = useState(initialStoreState);

  useLayoutEffect(() => {
    (async () => {
      const data = await databases.getItem(storeKey).catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);
      });
      if (data) {
        setStorePersisted({
          ...data,
          initiated: true
        });
      } else {
        setStorePersisted({
          ...initialStoreState,
          initiated: true
        });
      }
    })();
  }, []);
  if (storePersisted && !storePersisted.initiated) return null;
  return (
    <AuthenticationContainer isGlobal initialState={storePersisted}>
      <Component {...props} />
    </AuthenticationContainer>
  );
};

export default withPersistedAuth;
