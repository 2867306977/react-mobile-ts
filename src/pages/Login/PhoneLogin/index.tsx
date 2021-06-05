import React from 'react';
import { Link } from 'react-router-dom';

export default function PhoneLogin() {
  return (
    // 为什么这里包含在div标签会跳转  Router组件标签不会跳转
    <div>
      PhoneLogin<Link to="/phoneRegister">手机快速注册</Link>
    </div>
  );
}
