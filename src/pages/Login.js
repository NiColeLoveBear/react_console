import React, {Component} from 'react';
import Dialog from '../components/Dialog';
import Form from '../components/Form';
import fetchJson from '../untils/fetch';
import {connect} from  'react-redux';
import  {setLogin} from '../action';

class Login extends Component {
  constructor(...args) {
    super(...args);
  }

  componentDidMount(){
    //let  data =  await  fetchJson('api/banner');
    // console.log(data);
    console.log('login- mount');
  }

  componentDidUpdate(){
    //let  data =  await  fetchJson('api/banner');
    // console.log(data);
    console.log('login- update');
  }


  async login(){
    let form=this.refs.form1.getFormData();
    try{
      await fetchJson('admin/login', {
        method: 'POST',
        body: form
      });
      this.props.setLogin(true);
      this.props.history.push('/', {});
    }catch(e){
      alert('登录失败: '+e);
    }
  }


  render() {
    console.log(this.props);
    return (
      <div>
        <Dialog title={'登录'} close_btn={false}>
          <Form
            ref={'form1'}
            fileds={[
              {name: 'username', type: 'text', label: '用户名', placeholder: '请输入用户名'},
              {name: 'password', type: 'password', label: '密码', placeholder: '请输入密码'},
            ]}
            btns={[
              {text: '登录', type: 'primary', onClick: this.login.bind(this)},
            ]}
          />
        </Dialog>
      </div>
    );
  }

}

export default  connect((state , props) =>Object.assign({}, state , props) , {
  setLogin
})(Login);