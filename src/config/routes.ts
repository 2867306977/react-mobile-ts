import { FunctionComponent, lazy } from 'react';
import { RouteComponentProps } from 'react-router-dom';

// 路由懒加载：1. 打包时会打包成单独js文件  2. 一上来不会加载js，需要时才加载
const PhoneLogin = lazy(
  () => import(/* webpackChunkName: 'PhoneLogin' */ '../pages/Login/PhoneLogin')
);
const PasswordLogin = lazy(
  () =>
    import(/*webpackChunkName: 'PasswordLogin'*/ '../pages/Login/PasswordLogin')
);
const PhoneRegister = lazy(
  () =>
    import(
      /*webpackChunkName: 'PhoneRegister'*/ '../pages/Register/PhoneRegister'
    )
);
const CodeRegister = lazy(
  () =>
    import(
      /*webpackChunkName: 'CodeRegister'*/ '../pages/Register/CodeRegister'
    )
);
const PasswordRegister = lazy(
  () =>
    import(
      /*webpackChunkName: 'PasswordRegister'*/ '../pages/Register/PasswordRegister'
    )
);
const CountryPicker = lazy(
  () =>
    import(/*webpackChunkName: 'CountryPicker'*/ '../components/CountryPicker')
);
const Home = lazy(() => import(/*webpackChunkName: 'Home'*/ '../pages/Home'));

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
  {
    path: '/',
    component: Home,
  },
];
export default routes;
//仅导出类型
export type { RouteType };
