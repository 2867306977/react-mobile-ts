///login/digits
import axios, { AxiosPromise } from 'axios';

// 发送验证码
export const sendDigits: (phone: string) => AxiosPromise = phone => {
  return axios({
    method: 'POST',
    url: '/api/login/digits',
    //需传入参数表示给谁发的验证码 POST请求参数放入请求体中(data)
    //GET中请求参数通常查询字符串(params)
    data: {
      phone,
    },
  });
};
//login/user
//用户密码登录
export const reqLogin: (phone: string, password: string) => AxiosPromise = (
  phone,
  password
) => {
  return axios({
    method: 'POST',
    url: '/api/login/user',
    //需传入参数表示给谁发的验证码 POST请求参数放入请求体中(data)
    //GET中请求参数通常查询字符串(params)
    data: {
      phone,
      password,
    },
  });
};
