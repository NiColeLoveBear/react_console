import React , {Component} from  'react';
import  fetchJson from  '../untils/fetch';

// 参数
// fileds =>[{name , text }] 字段信息
// datas => [{数据源}]
// onModify => function(id)  修改
// onDelete => function(id)  删除

class  Table extends Component{
  constructor(...args){
    super(...args);
  }

  fnModify(id){
    this.props.onModify && this.props.onModify(id);
  }

  fnDelete(id){
    this.props.onDelete && this.props.onDelete(id);
  }


  render(){
    return (
      <table className="table">
        <thead>
          <tr>
            <th>
              <input type="checkbox" name={''}  value={''} />
            </th>
            <th>ID</th>
            {this.props.fileds.map( (filed , index) => (
              <th key={index}>{filed.text}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {this.props.datas.map((data) =>(
            <tr key={data.ID}>
              <td>
                <input type="checkbox" name={''}  value={''} />
              </td>
              <td>{data.ID}</td>
              {this.props.fileds.map( (filed , index) => (
                <td key={index}>{data[filed.name]}</td>
              ))}
              <td>
                <button type="button" className="btn btn-default" onClick={this.fnModify.bind(this , data.ID)}>修改</button>
                <button type="button" className="btn btn-danger" onClick={this.fnDelete.bind( this , data.ID)}>删除</button>
              </td>
            </tr>
          ))}


        </tbody>
      </table>
    );
  }

}

export  default  Table;