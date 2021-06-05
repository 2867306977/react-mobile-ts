import React from 'react';
import {
  Modal,
  NavBar,
  Icon,
  WingBlank,
  WhiteSpace,
  InputItem,
  Button,
} from 'antd-mobile';
import { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom'; //路由组件props类型
import './index.less';
//引入语法必须放上面 在定义变量
const { alert } = Modal;
//定义正则
const validateReg = /^1[3-9][0-9]{9}$/;

//history是路由组件的三个属性之一,所以props类型是路由组件类型(所有组件都是Route加载的)
//定义了什么属性才能传什么,没定义是不能传的
export default function PhoneRegister(props: RouteComponentProps) {
  //拿到国家/城市的电话号码编号
  const code: unknown = props.location.state || '+86'; //props.location.state刚开始没有 没有就使用默认+86
  useEffect(() => {
    //因为点进code中就会卸载之前的组件,再返回过来又要重新加载并执行挂载生命周期,可以判断有没有值来决定是否需要在弹出同意协议框
    if (props.location.state) return;
    alert(
      '注册协议及隐私政策',
      <span className="phone-register-policy">
        在您注册成为硅谷用户的过程中，您需要完成我们的注册流程并通过点击同意的形式在线签署以下协议，
        <strong className="phone-register-text">
          请您务必仔细阅读、充分理解协议中的条款内容后再点击同意（尤其是以粗体并下划线标识的条款，因为这些条款可能会明确您应履行的义务或对您的权利有所限制）{' '}
        </strong>
        :<span className="phone-register-agreement">《硅谷用户注册协议》</span>
        <span className="phone-register-agreement">《硅谷隐私政策》</span>
      </span>,
      [
        {
          text: '不同意',
          onPress: () => {
            // 返回到上一个页面
            props.history.push('/phoneLogin');
          },
        },
        {
          text: '同意',
          // onPress: () => console.log("ok"),
          style: {
            backgroundColor: 'red',
            color: '#fff',
          },
        },
      ]
    );
  }, []); //传个空数组 相当于componentDidMount 只调用一次

  //定义状态,校验表单
  const [hasError, setHasError] = useState<boolean>(false);
  const [firstView, setFirstView] = useState<boolean>(true);
  //电话号码
  const [phone, setPhone] = useState<string>('');

  const goCountryPicker = () => {
    props.history.push('/countryPicker');
  };

  //校验表单
  const validateInput = (value: string) => {
    // console.log(e);//这个event被改为了表单的value值
    if (validateReg.test(value)) {
      //校验成功在设置电话号码
      setPhone(value);
      //为true则是校验成功
      setHasError(false);
    } else {
      //校验不成功
      setHasError(true);
    }
    //一旦输入就不是初始状态了
    setFirstView(false);
  };
  //跳转到验证码注册
  const goCodeRegister = () => {
    //点击之后弹出一个框
    alert('', `是否同意给${phone}发送验证码`, [
      {
        text: '不同意',
      },
      {
        text: '同意',
        onPress: () => props.history.push('/codeRegister', phone),
        style: {
          backgroundColor: 'red',
          color: '#fff',
        },
      },
    ]);
  };
  return (
    <div className="container">
      <NavBar
        mode="light"
        icon={<Icon className="left-icon" type="left" />}
        // 点击回到phoneLogin,不用goback是因为怕没有浏览记录就返回不过去
        onLeftClick={() => props.history.push('/phoneLogin')}>
        硅谷注册
      </NavBar>
      {/* 两翼留白 */}
      <WingBlank size="lg">
        <WhiteSpace size="xl" />
        {/* 需进行表单校验,定义状态*/}
        <InputItem
          placeholder="请输入手机号"
          clear
          className="phone-register-input"
          // 根据这个来显示警告
          error={hasError}
          onChange={validateInput}>
          <div className="phone-prefix" onTouchEnd={goCountryPicker}>
            {/* 
              如果是antd-mobile的组件，组件要求绑定事件是什么就是什么 
              如果是普通的元素，绑定的事件onTouchEnd
            */}
            {/* unknown类型需要进行类型断言 */}
            <span>{code as string}</span>
            <Icon className="left-icon" type="down" />
          </div>
        </InputItem>
        <WhiteSpace size="xl" />
        <div className="phone-btn-container">
          <Button
            type="primary"
            className="btn"
            disabled={firstView || hasError}
            onClick={goCodeRegister}>
            下一步
          </Button>
        </div>
      </WingBlank>
    </div>
  );
}
