import { useEffect } from 'react';
import RootNavigation from '@navigation/AppNavigation/RootNavigation';
import AuthNavigation from '@navigation/AppNavigation/AuthNavigation';
import { useAppDispatch, useAppSelector } from '@hooks/redux';

import { autoLoginAuth0 } from '@store/auth';

const Navigator = () => {
  const { isAuth, accessToken } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(autoLoginAuth0());
  }, [dispatch]);

  console.log({ isAuth, accessToken });

  return (
    <>
      {isAuth && accessToken ? (
        <RootNavigation accessToken={accessToken} />
      ) : (
        <AuthNavigation />
      )}
    </>
  );
};

export default Navigator;
