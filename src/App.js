/*eslint-disable no-unused-vars*/
import React, {Component} from 'react';
import Login from './pages/Login';
import {Route } from 'react-router-dom';
/*eslint-enable no-unused-vars*/
import 'bootstrap/dist/css/bootstrap.min.css';
import Banner from './pages/Banner';
import Car from './pages/Car';
import  {connect} from  'react-redux';
import  {setLogin} from './action';
import  fetchJson from  './untils/fetch';

class App extends Component{
  constructor(...args){
    super(...args);

    // this.state = {
    //   isShow: true
    // };
  }

  async checkLogin(){
    if(this.props.location.pathname !=='/login'){
      try {
        await fetchJson('admin/checklogin');
        // 登陆了，就不需要再次修改
        if(!this.props.admin.login){
          this.props.setLogin(true);
        }
      }catch (e) {
        //  登陆失败
        this.props.history.push('/login' , {});
      }
    }else{
      try {
        await fetchJson('admin/checklogin');
        // 登陆了, 往主页跳转
        console.log( this.props);
        this.props.setLogin(true);
        this.props.history.push('/' , {});
      }catch (e) {
        //  没登录啥也不干
      }
    }
  }

  async componentDidUpdate(){
    console.log('app-update');
    await  this.checkLogin();
  }

  //组件加载之前 判断是不是登录过
  async componentDidMount(){
    console.log('app-mount');
    await this.checkLogin();
  }

  render(){
    console.log('app-render');
    return (
      <div>
        <Route  path={'/'}   exact  component={Banner}/>
        <Route  path={'/login'} component={Login}/>
        <Route  path={'/car'} component={Car}/>
      </div>
    );
  }
}

export default   connect((state , props) => Object.assign({} , props , state) , {
  setLogin
})(App);
