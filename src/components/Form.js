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

    this.state={
      counts: []
    };
  }

  getFormRef(){
    return this.refs.form ;
  }

  getFormData(){
    console.log(this.refs.form);
    return new FormData(this.refs.form);
  }

  render(){
    this.props.fileds || console.log('fileds props is required');
    this.props.btns || console.log('btns props is required');
    return (
      <form ref={'form'}>
        {this.props.fileds?this.props.fileds.map((filed, index) =>{
          let id ='id_'+ Math.floor( Math.random()*100000000);
          if(filed.isArray){
            this.state.counts[filed.name] = this.state.counts[filed.name] || 10;
            return (
              <div className="form-group" key={index}>
                <label htmlFor={id}>{filed.label}</label>
                { Array.from( new Array(this.state.counts[filed.name])).map((item , index) =>(
                  <input key={id+'_'+index} type={filed.type}  className="form-control"   name={filed.name} placeholder={filed.placeholder}   defaultValue={filed.value}/>
                ))}
              </div>
            );
          }else {
            if (filed.label) {
              return (
                <div className="form-group" key={index}>
                  <label htmlFor={id}>{filed.label}</label>
                  <input type={filed.type}  className="form-control" id={id}  name={filed.name} placeholder={filed.placeholder}   defaultValue={filed.value}/>
                </div>
              );
            }else {
              return (
                <input type={filed.type}  className="form-control" id={id}  name={filed.name} placeholder={filed.placeholder}   defaultValue={filed.value}/>
              );
            }

          }

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