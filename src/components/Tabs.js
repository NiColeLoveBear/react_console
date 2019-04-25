import React , {Component} from  'react';
import  {withRouter} from  'react-router-dom' ;
import  fetchJson from  '../untils/fetch';
import index from '../store';

// 参数
// fileds =>[{name , text }] 字段信息
// datas => [{数据源}]
// onModify => function(id)  修改
// onDelete => function(id)  删除

class  Tabs extends Component{
  constructor(...args){
    super(...args);
  }

  fn(index){
    console.log(index);
    this.props.onChange&& this.props.onChange(index);
    //点击的时候跳转
    console.log(this.props);
    if(this.props.tabs[index].path){
      // 此时没有history
      this.props.history.push(this.props.tabs[index].path , {});
    }
  }


  render(){
    if(!this.props.tabs){
      console.error('tabs props is required');
    }
    return (
      <ul className="nav nav-tabs">
        {this.props.tabs? this.props.tabs.map((tab , index) =>(
          <li key={index}  className={tab.selected? 'active': ''}><a href="Javascript: ;" onClick={this.fn.bind(this , index)}>{tab.text}</a></li>
        )): ''}
      </ul>
    );
  }

}

//export  default  Tabs;
// 用了withRouter , 为了包裹路由,.  路由的属性都可以用
export  default  withRouter(Tabs);