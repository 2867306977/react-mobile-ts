import { useState } from 'react';
import { NavBar, WingBlank, Button, InputItem, Icon, Toast } from 'antd-mobile';
import { RouteComponentProps } from 'react-router-dom';
import { reqRegister } from '../../../api/register';
import image from './下载.png';
import './index.less';
import './iconfont.css';
const passwordReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/;
export default function PasswordRegister(props: RouteComponentProps) {
  const { location, history } = props;
  const phone: unknown = location.state;
  const [hasError, setHasError] = useState<boolean>(false);
  const [isFirstView, setIsFirstView] = useState<boolean>(true);
  //是否是密文
  const [isCipher, setIsCipher] = useState<boolean>(true);
  const [password, setPassword] = useState<string>('');
  //判断有没有手机号,没有直接去手机注册页面
  if (!(phone as string)) {
    history.push('/phoneRegister');
    return null;
  }
  //表单change
  const handleInputChange = (password: string) => {
    if (passwordReg.test(password)) {
      setHasError(false);
      setIsFirstView(false);
      setPassword(password);
    } else {
      setHasError(true);
    }
  };
  //修改明密文状态
  const changePasswordState = () => {
    setIsCipher(!isCipher);
  };
  //下一步
  const goRegister = async () => {
    try {
      //发送请求注册
      const response = await reqRegister(phone as string, password);
      console.log(response.data);
      if (response.data.code === 20000) {
        //跳转到首页
        history.push('/', [phone as string, password]);
      } else {
        Toast.fail(response.data.message, 3);
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="verify-password">
      <NavBar
        mode="light"
        icon={<Icon className="left-icon" type="left" />}
        onLeftClick={() => {
          history.push('/codeRegister');
        }}>
        硅谷注册
      </NavBar>
      <WingBlank>
        <img className="verify-code-msg" src={image} alt="msg" />
        <p className="verify-code-tip">请设置登录密码</p>
        <InputItem
          type={isCipher ? 'password' : 'text'}
          className="verify-password-btn"
          placeholder="请设置8-20位登录密码"
          onChange={handleInputChange}
          error={hasError}
          extra={
            <span
              className={
                'iconfont ' + (isCipher ? 'icon-biyan' : 'icon-zhengyanxianshi')
              }
              onTouchEnd={changePasswordState}></span>
          }
        />
        <p className="verify-password-text">
          密码由8-20位字母、数字或半角符号组成，不能是10位以下纯数字/字母/半角符号，字母需区分大小写
        </p>
        <Button
          type="primary"
          disabled={hasError || isFirstView}
          className="btn"
          onClick={goRegister}>
          下一步
        </Button>
        <span className="verify-code-question">
          遇到问题?请<a href="###">联系客服</a>
        </span>
      </WingBlank>
    </div>
  );
}
