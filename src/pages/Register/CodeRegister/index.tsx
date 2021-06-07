import { useEffect, useState } from 'react';
import {
  NavBar,
  Icon,
  WingBlank,
  WhiteSpace,
  InputItem,
  Button,
  Toast,
} from 'antd-mobile';
import './index.less';
import { sendDigits } from '../../../api/digits';
import { reqVerifyCode } from '../../../api/register';
import { RouteComponentProps } from 'react-router-dom'; //路由组件props类型
import image from './下载.png';
let maxTime = 10;
//验证码正则校验
const codeReg = /^[0-9]{6}$/;
export default function CodeRegister(props: RouteComponentProps) {
  //拿到号码
  const phone: unknown = props.location.state;
  const [time, setTime] = useState<number>(maxTime);
  const [isSendDigits, setIsSendDigits] = useState<boolean>(false);
  const [isFirstView, setIsFirstView] = useState<boolean>(true);
  const [code, setCode] = useState<string>('');
  const [hasError, setHasError] = useState<boolean>(false);
  /* 
  一上来就发送验证码  发送验证码 使用接口
   */
  //发送之后开始倒计时
  useEffect(() => {
    //请求只需要发送一次 所以判断是不是第一次发送请求
    if (!isSendDigits) {
      // console.log('isFirstSendDigits'); //1 2 3 4 5
      /* 
      执行步骤:
      同步代码执行完毕,执行sendDigitsClick()
       sendDigitsClick()执行完毕,执行then方法中的函数 设置setTime(time - 1)异步代码结束 重新渲染 
       */
      sendDigitsClick();
      //   .then(() => {
      //     //因为time每次更新一次这个生命周期就调用一次,所以setTimeout也会每调用一次
      //     setTimeout(() => {
      //       // console.log(2);

      //       // if (time <= 1) {
      //       //   //因为这两更新了 然后又一次渲染了页面  然后就走了下面的定时器
      //       //   setIsSendDigits(false);
      //       //   setIsFirstSendDigits(false); 所以不能在这里面更新setIsFirstSendDigits
      //       // }
      //       setTime(time - 1); //4 3 2 1
      //     }, 1000);
      //   });
      //   // console.log('return');
      //   return;
    }

    // console.log('isSendDigits');
    //发送验证码
    setTimeout(() => {
      // console.log(time);
      let newTime = time - 1;
      //上来就判断,如果小于等于0就不会调用setTime
      if (newTime <= 0) {
        setIsSendDigits(false);
        return;
      }
      setTime(newTime);
    }, 1000);
    // console.log(time);
  }, [time]);
  //判断有没有手机号,没有直接去手机注册页面
  if (!(phone as string)) {
    props.history.push('/phoneRegister');
    return null;
  }
  //点击发送验证码 封装发送验证码请求方法
  const sendDigitsClick = async () => {
    // if (!isFirstSendDigits) {
    //如果不是第一次发送验证码就设置最大值
    setTime(maxTime);
    // }
    setIsSendDigits(true);
    // setIsFirstSendDigits(false);
    //发送请求
    await sendDigits(phone as string);
  };

  //输入验证码表单
  const handleInputChange = (code: string) => {
    if (codeReg.test(code)) {
      setCode(code);
      // 正则校验成功
      setHasError(false);
      setIsFirstView(false);
    } else {
      setHasError(true);
    }
  };
  //点击下一步发送请求验证验证码是否正确,正确跳转密码注册
  const goPasswordRegister = async () => {
    const response = await reqVerifyCode(phone as string, code);
    //发送成功,判断验证码是否有效,有则跳转passwordRegister
    if (response.data.code === 20000) {
      props.history.push('/passwordRegister', phone as string);
    } else {
      //无效,弹出提示框
      Toast.fail(response.data.message, 3);
    }
  };
  return (
    <div className="code-register">
      <NavBar
        mode="light"
        icon={<Icon className="left-icon" type="left" />}
        onLeftClick={() => props.history.push('/phoneRegister')}>
        硅谷注册
      </NavBar>
      <WingBlank size="lg">
        <img className="code-register-msg" src={image} alt="msg" />
        <p className="code-register-tip">
          我们将以短信或电话的形式将验证码发送给您，请注意接听0575/025/0592/010等开头的电话
        </p>
        <div className="code-register-container">
          <InputItem
            placeholder="请输入手机验证码"
            error={hasError}
            onChange={handleInputChange}
          />
          {isSendDigits ? (
            <Button className="code-register-btn code-register-btn-disabled">
              重新发送({time}s)
            </Button>
          ) : (
            <Button className="code-register-btn" onClick={sendDigitsClick}>
              发送验证码
            </Button>
          )}
        </div>
        <WhiteSpace size="xl" />
        <div className="btn-container">
          <Button
            disabled={hasError || isFirstView}
            type="primary"
            className="btn"
            onClick={goPasswordRegister}>
            下一步
          </Button>
        </div>
        <span className="code-register-question">
          遇到问题?请<a href="###">联系客服</a>
        </span>
      </WingBlank>
    </div>
  );
}
