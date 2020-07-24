import { createSwitchNavigator } from 'react-navigation';
import Onboard from './Onboard';
import Welcome from './Welcome';
import LogIn from './LogIn';
import SignUp from './SignUp';
import SignUpEmail from './SignUpEmail';
import SignUpLocation from './SignUpLocation';
import ResetPassword from './ResetPassword';

const AuthStack = createSwitchNavigator({
  Onboard,
  Welcome,
  LogIn,
  SignUp,
  SignUpEmail,
  SignUpLocation,
  ResetPassword,
}, {
  initialRouteName: 'Onboard',
});

export default AuthStack;
