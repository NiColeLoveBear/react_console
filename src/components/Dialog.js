import React , {Component} from  'react';
import  './Dialog.css';

// 参数
// title =>标题
// shadow => 是否有阴影
// close_btn => 是否有关闭按钮
// onClose => 关闭弹框
class Dialog extends Component{
  constructor(...args){
    super(...args);
  }

  closeDialog() {
    this.props.onClose && this.props.onClose();
  }

  render(){
    return (
      <div>
        {this.props.shadow ? (
          <div className="dialog-shadow">
          </div>
        ) :''}
        <div className="panel panel-default dialog-panel">
          <div className="panel-heading">
            <h2 className="panel-title">
              {this.props.title}
              {this.props.close_btn ?(
                <a href="javascript: ;" className="glyphicon glyphicon-remove pull-right"  onClick={this.closeDialog.bind(this)}/>
              ): ''}
            </h2>
          </div>
          <div className="panel-body">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }

}

export  default  Dialog;