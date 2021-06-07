import { useEffect, useState } from 'react';
import {
  NavBar,
  Icon,
  WingBlank,
  WhiteSpace,
  InputItem,
  Button,
} from 'antd-mobile';
import './index.less';
import { sendDigits } from '../../../api/digits';
import { RouteComponentProps } from 'react-router-dom'; //路由组件props类型
import image from './下载.png';
let maxTime = 60;
export default function CodeRegister(props: RouteComponentProps) {
  //拿到号码
  const phone: unknown = props.location.state;
  const [time, setTime] = useState<number>(maxTime);
  const [isSendDigits, setIsSendDigits] = useState<boolean>(true);
  const [isFirstSendDigits, setIsFirstSendDigits] = useState<boolean>(true);
  /* 
  一上来就发送验证码  发送验证码 使用接口
   */
  //发送之后开始倒计时
  useEffect(() => {
    //请求只需要发送一次 所以判断是不是第一次发送请求
    if (isFirstSendDigits) {
      // console.log('isFirstSendDigits'); //1 2 3 4 5
      /* 
      执行步骤:
      同步代码执行完毕,执行sendDigitsClick()
       sendDigitsClick()执行完毕,执行then方法中的函数 设置setTime(time - 1)异步代码结束 重新渲染 
       */
      sendDigitsClick().then(() => {
        //因为time每次更新一次这个生命周期就调用一次,所以setTimeout也会每调用一次
        setTimeout(() => {
          // console.log(2);

          // if (time <= 1) {
          //   //因为这两更新了 然后又一次渲染了页面  然后就走了下面的定时器
          //   setIsSendDigits(false);
          //   setIsFirstSendDigits(false); 所以不能在这里面更新setIsFirstSendDigits
          // }
          setTime(time - 1); //4 3 2 1
        }, 1000);
      });
      // console.log('return');
      return;
    }

    console.log('isSendDigits');
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
  //点击发送验证码
  const sendDigitsClick = async () => {
    //发送请求
    await sendDigits(phone as string);
    if (!isFirstSendDigits) {
      //如果不是第一次发送验证码就设置最大值
      setTime(maxTime);
    }
    setIsSendDigits(true);
    setIsFirstSendDigits(false);
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
          <InputItem placeholder="请输入手机验证码" />
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
          <Button disabled type="primary" className="btn">
            下一步
          </Button>
        </div>
        <span className="code-register-question">
          遇到问题?请<a>联系客服</a>
        </span>
      </WingBlank>
    </div>
  );
}
