import { useEffect, useState } from 'react';
import { NavBar, Icon, List } from 'antd-mobile';
import { RouteComponentProps } from 'react-router-dom';
import { AxiosResponse } from 'axios';

import { reqGetCountryData } from '../../api/common';

import './index.less';

const { Item } = List;
interface CountryDataType {
  [propName: string]: CountryType[];
}
interface CountryType {
  [propName: string]: string;
}

export default function CountryPicker(props: RouteComponentProps) {
  //添加状态更新组件
  const [countryData, setCountryData] = useState<CountryDataType>({});
  //请求数据 先启动服务器 在访问接口api地址 localhost:5000/api/common/countryDataphoneLogin
  useEffect(() => {
    reqGetCountryData()
      .then((response: AxiosResponse) => {
        // console.log(response.data.data);
        setCountryData(response.data.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  //Object.keys可以获取到对象中所有的key,Object.value可以获取对象中所有的value
  const countryKeys = Object.keys(countryData);

  //跳转到国家名首字母
  const anchorCountry = (key: string) => {
    return () => {
      //因为ts中是可以认为获取不到属性,必须类型断言指定某个类型中有这个属性
      // (document.querySelector('.' + key) as HTMLElement).offsetTop;距离顶部的距离
      // window.scrollTo(x,y)指定跳转到哪个位置 里面必须传number值
      window.scrollTo(
        0,
        (document.getElementById(key) as HTMLElement).offsetTop - 45
      );
    };
  };

  //跳转到注册页面
  const goRegister = (code: string) => {
    return () => {
      //路由传参,使用state方式来传递参数
      //props.location.state as string  接收指定路径跳转到指定路径
      props.history.push(props.location.state as string, code);
    };
  };
  return (
    <div className="country-picker">
      <NavBar
        className="country-picker-navbar"
        mode="light"
        icon={<Icon className="left-icon" type="left" />}
        onLeftClick={() => props.history.goBack()}>
        选择国家或者地区
      </NavBar>
      <div className="country-picker-container">
        {countryKeys.map((item: string) => {
          return (
            //List不能设置id,解决办法:外面包个div 设置id获取该类名元素距离顶部的位置
            <div id={item} key={item}>
              <List renderHeader={() => item}>
                {countryData[item].map((item: CountryType, index: number) => {
                  //获取每个国家名
                  const country = Object.keys(item)[0];
                  const countryValue = '+' + item[country];
                  return (
                    // 给每个item绑定点击事件,传递countryValue值,跳转到注册页面,该item组件是别人设计的,所以得看别人是怎么设置点击事件的,实际底层是onTouchEnd事件
                    <Item
                      extra={countryValue}
                      key={index}
                      onClick={goRegister(countryValue)}>
                      {country}
                    </Item>
                  );
                })}
              </List>
            </div>
          );
        })}
      </div>

      <ul className="country-picker-sidebar">
        {/* 给每个li绑定点击事件,点击之后把滚动条移动到指定位置 */}
        {countryKeys.map(item => {
          return (
            <li key={item} onTouchEnd={anchorCountry(item)}>
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
