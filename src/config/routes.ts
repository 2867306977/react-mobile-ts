import { FunctionComponent } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import PhoneLogin from '../pages/Login/PhoneLogin';
import PasswordLogin from '../pages/Login/PasswordLogin';
import PhoneRegister from '../pages/Register/PhoneRegister';
import CodeRegister from '../pages/Register/CodeRegister';
import PasswordRegister from '../pages/Register/PasswordRegister';
// import CountryPicker from '../components/CountryPicker';

interface RouteType {
  path: string;
  component: FunctionComponent<RouteComponentProps>;
}
//配置route 提取出来然后遍历
const routes: RouteType[] = [
  {
    path: '/phoneLogin',
    component: PhoneLogin,
  },
  {
    path: '/passwordLogin',
    component: PasswordLogin,
  },
  {
    path: '/phoneRegister',
    component: PhoneRegister,
  },
  {
    path: '/codeRegister',
    component: CodeRegister,
  },
  {
    path: '/passwordRegister',
    component: PasswordRegister,
  },
];
export default routes;
//仅导出类型
export type { RouteType };
