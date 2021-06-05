import { FunctionComponent } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import PhoneLogin from '../pages/Login/PhoneLogin';
import PasswordLogin from '../pages/Login/PasswordLogin';
import PhoneRegister from '../pages/Register/PhoneRegister';
import CodeRegister from '../pages/Register/CodeRegister';
import PasswordRegister from '../pages/Register/PasswordRegister';
import CountryPicker from '../components/CountryPicker';

interface RouteType {
  path: string;
  //告诉FunctionComponent可以接收RouteComponentProps
  component: FunctionComponent<RouteComponentProps>; //默认值是个空对象参数,只有传了才有这属性
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
  {
    path: '/countryPicker',
    component: CountryPicker,
  },
];
export default routes;
//仅导出类型
export type { RouteType };
