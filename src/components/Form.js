import React , {Component} from  'react';

// 参数
//       ref={'form1'}
//             fileds={[
//               {name: 'username', type: 'text', label: '用户名', placeholder: '请输入用户名'},
//             ]}
//             btns={[
//               {text: '登录', type: 'primary', onClick: this.login.bind(this)},
//             ]}

class Form extends Component{
  constructor(...args){
    super(...args);
  }

  getFormRef(){
    return this.refs.form ;
  }

  getFormData(){
    return new FormData(this.refs.form);
  }

  render(){
    this.props.fileds || console.log('fileds props is required');
    this.props.btns || console.log('btns props is required');
    return (
      <form ref={'form'}>
        {this.props.fileds?this.props.fileds.map((filed, index) =>{
          let id ='id_'+ Math.floor( Math.random()*100000000);
          return (
            <div className="form-group" key={index}>
              <label htmlFor={id}>{filed.label}</label>
              <input type={filed.type}  className="form-control" id={id}  name={filed.name} placeholder={filed.placeholder} />
            </div>
          );
        }):''}
        <div className="form-group">
          {this.props.btns?this.props.btns.map((btn, index) =>{
            return (
              <button key={index} type="button" className= {`btn ${btn.type==='primary' ? 'btn-primary': 'btn-default'}`} onClick={btn.onClick}>{btn.text}</button>
            );
          }): ''}
        </div>
      </form>
    );
  }

}

export  default  Form;