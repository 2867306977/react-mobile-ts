import { useState } from 'react';
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
import './iconfont.css';
import { reqLogin } from '../../../api/digits';
const phoneReg = /^1[3-9][0-9]{9}$/;
const passwordReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/;

export default function PasswordLogin(props: RouteComponentProps) {
  const [phone, setPhone] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [phoneHasError, setPhoneHasError] = useState<boolean>(false);
  const [passwordHasError, setPasswordHasError] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(true);

  //是否是密文
  const [isCipher, setIsCipher] = useState<boolean>(true);
  //点击gitee登录
  const goGitee = () => {
    //发送请求
    const client_id: string =
      '687795783fae945275e2233031230c81386aa6286825899dd99d4797630c7f2e';
    const redirect_url: string = 'http://localhost:5000/login/oauth/gitee';
    window.location.href = `https://gitee.com/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_url}&response_type=code`;
  };
  //账号表单变化
  const handlePhoneChange = (phone: string) => {
    if (phoneReg.test(phone)) {
      setPhone(phone);
      setPhoneHasError(false);
    } else {
      setPhoneHasError(true);
    }
  };
  //密码表单变化
  const handlePasswordChange = (password: string) => {
    if (passwordReg.test(password)) {
      setPassword(password);
      setPasswordHasError(false);
      setDisabled(false);
    } else {
      setPasswordHasError(true);
    }
  };
  //明密文变化
  const cipherChange = () => {
    setIsCipher(!isCipher);
  };
  //登录
  const login = async () => {
    //发送请求 用户账号登录
    const response = await reqLogin(phone, password);
    if (response.data.code === 20000) {
      props.history.push('/', phone);
    } else {
      Toast.fail(response.data.message, 3);
    }
  };
  return (
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
          placeholder="用户名/邮箱/手机号"
          onChange={handlePhoneChange}
        />
        <WhiteSpace size="lg" />
        <div className="login-code">
          <InputItem
            error={passwordHasError}
            placeholder="请输入密码"
            type={isCipher ? 'password' : 'text'}
            onChange={handlePasswordChange}
            extra={
              <span
                className={
                  'iconfont ' +
                  (isCipher ? 'icon-biyan' : 'icon-zhengyanxianshi')
                }
                onTouchEnd={cipherChange}></span>
            }
          />
          <button
            className="login-btn-text login-btn"
            style={{ color: '#000' }}>
            忘记密码
          </button>
        </div>
        <WhiteSpace size="lg" />
        <WingBlank size="lg">
          <Button
            disabled={phoneHasError || passwordHasError || disabled} //其中有一个为true那么就禁用
            type="primary"
            className="btn"
            onClick={login}>
            登录
          </Button>
        </WingBlank>
        <WhiteSpace size="lg" />
        <div className="login-btn-wrap">
          <Link to="/phoneLogin" className="login-btn-text">
            短信验证码登录
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
          登录即代表您已同意
          <a className="login-private-policy-btn">硅谷隐私政策</a>
        </span>
      </WingBlank>
    </div>
  );
}
