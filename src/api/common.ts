import axios, { AxiosPromise } from 'axios';

// 获取所有城市/地区数据
export const reqGetCountryData: () => AxiosPromise = () => {
  return axios({
    method: 'GET',
    url: 'http://localhost:5000/common/countryData',
  });
};
