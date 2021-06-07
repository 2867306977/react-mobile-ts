///regist/verify_code
import axios, { AxiosPromise } from 'axios';

// 验证验证码
export const reqVerifyCode: (phone: string, code: string) => AxiosPromise = (
  phone,
  code
) => {
  return axios({
    method: 'POST',
    url: '/api/regist/verify_code',
    //需传入参数表示给谁发的验证码 POST请求参数放入请求体中(data)
    //GET中请求参数通常查询字符串(params)
    data: { phone, code },
  });
};
//regist/user
// 注册
export const reqRegister: (phone: string, password: string) => AxiosPromise = (
  phone,
  password
) => {
  return axios({
    method: 'POST',
    url: '/api/regist/user',
    //需传入参数表示给谁发的验证码 POST请求参数放入请求体中(data)
    //GET中请求参数通常查询字符串(params)
    data: { phone, password },
  });
};
//regist/verify_phone
//验证手机号是否被注册
export const reqVerifyPhone: (phone: string) => AxiosPromise = phone => {
  return axios({
    method: 'POST',
    url: '/api/regist/verify_phone',
    //需传入参数表示给谁发的验证码 POST请求参数放入请求体中(data)
    //GET中请求参数通常查询字符串(params)
    data: { phone },
  });
};
