import axios, { AxiosPromise } from 'axios';

// 获取所有城市/地区数据
export const reqGetCountryData: () => AxiosPromise = () => {
  return axios({
    method: 'GET',
    url: '/api/common/countryData',
  });
};
