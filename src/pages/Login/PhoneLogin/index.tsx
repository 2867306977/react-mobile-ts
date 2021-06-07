import { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import {
  NavBar,
  Icon,
  WhiteSpace,
  WingBlank,
  InputItem,
  Button,
  Toast,
} from 'antd-mobile';
import './index.less';
import { reqVerifyCode } from '../../../api/register';
import { sendDigits } from '../../../api/digits';
const phoneReg = /^1[3-9][0-9]{9}$/;
const codeReg = /^[0-9]{6}$/;
const maxTime = 10;

export default function PhoneLogin(props: RouteComponentProps) {
  const { history, location } = props;
  const countryCode: unknown = location.state || '+86';
  const [phone, setPhone] = useState<string>('');
  const [code, setCode] = useState<string>('');
  const [time, setTime] = useState<number>(0);
  const [phoneHasError, setPhoneHasError] = useState<boolean>(false);
  const [codeHasError, setCodeHasError] = useState<boolean>(false);
  const [isFirstView, setIsFirstView] = useState<boolean>(true);
  const [disabled, setDisabled] = useState<boolean>(true);
  const [isSendCode, setIsSendCode] = useState<boolean>(false);

  useEffect(() => {
    //时间变化就重新渲染
    //如果第一次渲染就不进入下面代码
    if (isFirstView) return;
    setTimeout(() => {
      if (time <= 1) {
        setIsSendCode(false);
        return;
      }
      setTime(time - 1);
    }, 1000);
  }, [time]);
  //点击gitee登录
  const goGitee = () => {
    //发送请求
    const client_id: string =
      '687795783fae945275e2233031230c81386aa6286825899dd99d4797630c7f2e';
    const redirect_url: string = 'http://localhost:5000/login/oauth/gitee';
    window.location.href = `https://gitee.com/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_url}&response_type=code`;
  };
  //点击跳转到选择城市号码编码
  const goCountryPicker = () => {
    history.push('/countryPicker', location.pathname);
  };
  //手机号表单输入
  const handlePhoneChange = (phone: string) => {
    if (phoneReg.test(phone)) {
      setPhone(phone);
      setPhoneHasError(false);
      setIsFirstView(false);
    } else {
      setPhoneHasError(true);
    }
  };
  //验证码
  const handleCodeChange = (code: string) => {
    if (codeReg.test(code)) {
      setCode(code);
      setCodeHasError(false);
      setDisabled(false);
    } else {
      setCodeHasError(true);
    }
  };
  //发送验证码
  const sendCode = async () => {
    // //开始倒计时
    try {
      setIsSendCode(true);
      //如果time和初始值一样那么就不会触发更新
      //触发time更新 useEffect绑定了time time更新了那么就触发定时器
      setTime(maxTime);
      await sendDigits(phone);
    } catch (e) {
      console.log(e);
    }
  };
  //登录
  const goHome = async () => {
    try {
      //点击登录 验证验证码是否正确
      const response = await reqVerifyCode(phone, code);
      if (response.data.code === 20000) {
        history.push('/', phone);
      } else {
        Toast.fail(response.data.message, 3);
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    // 为什么这里包含在div标签会跳转  Router组件标签不会跳转
    <div className="login container">
      <NavBar
        mode="light"
        icon={<Icon className="left-icon" type="left" />}
        // onLeftClick={() => console.log("onLeftClick")}
      >
        硅谷注册登录
      </NavBar>
      <WhiteSpace size="xl" />
      <WingBlank size="lg">
        <InputItem
          error={phoneHasError}
          placeholder="请输入手机号"
          onChange={handlePhoneChange}>
          <div className="phone-prefix" onTouchEnd={goCountryPicker}>
            <span>{countryCode as string}</span>
            <Icon type="down" />
          </div>
        </InputItem>
        <WhiteSpace size="lg" />
        <div className="login-code">
          <InputItem
            error={codeHasError}
            placeholder="请输入手机验证码"
            onChange={handleCodeChange}
          />
          {isSendCode ? (
            <button
              className="login-btn-text login-btn"
              style={{
                color: '#848689',
              }}>
              重新获取({time}s)
            </button>
          ) : (
            <button
              className="login-btn-text login-btn"
              style={{
                color: isFirstView || phoneHasError ? 'gray' : 'red',
              }}
              onTouchEnd={sendCode}>
              获取验证码
            </button>
          )}
        </div>
        <WhiteSpace size="lg" />
        <WingBlank size="lg">
          <Button
            disabled={codeHasError || phoneHasError || disabled}
            type="primary"
            className="btn"
            onClick={goHome}>
            登录
          </Button>
        </WingBlank>
        <WhiteSpace size="lg" />
        <div className="login-btn-wrap">
          <Link to="/passwordLogin" className="login-btn-text">
            账户密码登录
          </Link>
          <Link to="/phoneRegister" className="login-btn-text">
            手机快速注册
          </Link>
        </div>
        <div className="login-other-text">其他登录方式</div>
        <div className="login-icons">
          <span
            className="iconfont icon-gitee-fill-round"
            onTouchEnd={goGitee}></span>
          <span className="iconfont icon-qq"></span>
          <span className="iconfont icon-weixin"></span>
        </div>
        <span className="login-private-policy">
          未注册的手机号验证后将自动创建硅谷账号, 登录即代表您已同意
          <a className="login-private-policy-btn">硅谷隐私政策</a>
        </span>
      </WingBlank>
    </div>
  );
}
