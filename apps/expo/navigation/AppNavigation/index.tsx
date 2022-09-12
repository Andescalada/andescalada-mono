import { FC } from 'react';
import RootNavigation from '@navigation/AppNavigation/RootNavigation';
import AuthNavigation from '@navigation/AppNavigation/AuthNavigation';

interface Props {
  isAuth: boolean;
}

const Navigator: FC<Props> = ({ isAuth }) => {
  return <>{isAuth ? <RootNavigation /> : <AuthNavigation />}</>;
};

export default Navigator;
