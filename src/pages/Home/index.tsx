import React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';

export default function Home(props: RouteComponentProps) {
  const { location } = props;
  if (location.state) {
    return (
      <div>
        <h1>Hi,{location.state as string}</h1>
      </div>
    );
  } else {
    return (
      <h1>
        请登录账号<Link to="/passwordLogin">登录</Link>
      </h1>
    );
  }
}
