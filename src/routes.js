import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Main from '~/pages/Main';
import Game from '~/pages/Game';

const Routes = (userLogged = false) => createAppContainer(
  createSwitchNavigator(
    {
      Main,
      Game,
    },
    {
      initialRouteName: userLogged ? 'Game' : 'Main',
    },
  ),
);

export default Routes;
