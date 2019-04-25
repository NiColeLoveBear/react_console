/*eslint-disable no-unused-vars*/
import React, {Component} from 'react';
import Table from '../components/Table';
import Pagination from '../components/Pagination';
import fetchJson from '../untils/fetch';
import Dialog from '../components/Dialog';
import Form from '../components/Form';
import Tabs from '../components/Tabs';
import index from '../store';

/*eslint-enable no-unused-vars*/

class Banner extends Component {
  constructor(...args) {
    super(...args);

    this.state = {
      datas: [],
      showAddDialog: false,
      showDeleteDialog: false,
      showModifyDialog: false,
      page : 1,
      mod_id: 0,
      mod_title: '' ,
      mod_sub_title: ''
    };
  }

  async addMsg() {
    let form = this.refs.form1.getFormData();
    await  fetchJson('api/banner' , {
      method:  'POST' ,
      body: form
    });
    // 成功以后关dialog
    this.hiddenDialog();
    // 重新刷数据
    await  this.loadBanner();
  }

  async loadBanner(){
    let data = await fetchJson('api/banner');
    this.setState({
      datas: data
    });
    console.log(data);
  }

  async componentDidMount() {
    await  this.loadBanner();
    console.log('banner- mount');
  }

  componentDidUpdate() {
    console.log('banner- update');
  }

  fnDelete(id) {
    this.to_delete_id = id ;
    this.showDelDialog();

  }

  fnModify(id) {
    // alert('修改' + id);
    // 先找到选择的id
    let mod_data = null;
    this.state.datas.forEach(data =>{
      if (data.ID === id) {
        mod_data = data ;
      }
    });
    // 找到数据  显示到dialog中
    this.setState({
      mod_id : mod_data.ID ,
      mod_title: mod_data.title ,
      mod_sub_title: mod_data.sub_title
    });
    this.showModifyDialog();
  }

  //关闭dialog
  hiddenDialog (){
    this.setState({showAddDialog: false});
  }
  hiddenDelDialog(){
    this.setState({showDeleteDialog: false});
  }
  hiddenModifyDialog(){
    this.setState({showModifyDialog: false});
  }

  //打开dialog
  showDialog(){
    this.setState({showAddDialog: true});
  }
  showDelDialog(){
    this.setState({showDeleteDialog: true});
  }

  showModifyDialog(){
    this.setState({showModifyDialog: true});
  }

  // 删除banner
  async doDelDialog(){
    let id = this.to_delete_id ;
    delete  this.to_delete_id;
    await  fetchJson(`api/banner/${id}` , {
      method: 'DELETE'
    });
    // 关闭弹框
    this.hiddenDelDialog();
    await  this.loadBanner();
  }
  // 修改banner
  async modifyMsg(){
    let  id = this.state.mod_id ;
    let form = this.refs.form_mod.getFormData() ;
    await  fetchJson(`api/banner/${id}` , {
      method: 'POST' ,
      body:  form
    });

    // 修改成功, 重新获取数据
    await  this.loadBanner();
    this.hiddenModifyDialog();
  }

  //  切换tab
  selectTabs(index){
    console.log(index);
    // alert(index);
  }


  render() {
    return (
      <div>
        <Tabs
          tabs={[
            {text: '焦点图管理' ,  path: '/', selected: true},
            {text: '车辆管理' ,  path: '/car'}
          ]}
        />
        {/*// 写法1*/}
        <button className={'btn btn-primary'}  onClick={this.showDialog.bind(this)}>添加</button>
        {/*// 写法2*/}
        {/*<button className={'btn btn-primary'} onClick={ ()=>{*/}
        {/*this.setState({showAddDialog: true});*/}
        {/*}}>添加*/}
        {/*</button>*/}
        <Table fileds={[
          {name: 'title', text: '标题'},
          {name: 'sub_title', text: '副标题'}
        ]}
        datas={this.state.datas}
        onDelete={this.fnDelete.bind(this)}
        onModify={this.fnModify.bind(this)}
        />
        <Pagination
          count={7}
          cur ={this.state.page}
          onChange={(index)=>{
            this.setState({
              page: index
            });
          }}
        />
        {this.state.showAddDialog ? (
          <Dialog
            title={'添加数据'}
            close_btn={true}
            shadow={true}
            onClose={this.hiddenDialog.bind(this)}>
            <Form
              ref={'form1'}
              fileds={[
                {name: 'title', type: 'text', label: '标题', placeholder: '请输入标题'},
                {name: 'sub_title', type: 'text', label: '副标题', placeholder: '请输入副标题'},
                {name: 'image', type: 'file', label: '图片', placeholder: ''},
              ]}
              btns={[
                {text: '添加', type: 'primary', onClick: this.addMsg.bind(this)},
                {text: '取消', type: 'default', onClick:  this.hiddenDialog.bind(this)},
              ]}
            />
          </Dialog>
        ) : ' '}
        {this.state.showDeleteDialog ? (
          <Dialog
            title={'确认'}
            close_btn={true}
            shadow={true}
            onClose={this.hiddenDelDialog.bind(this)}>
             确认删除?
            <div>
              <button className={'btn btn-danger'} onClick={this.doDelDialog.bind(this)}>删除</button>
              <button className={'btn btn-default'} onClick={this.hiddenDelDialog.bind(this)}>取消</button>
            </div>
          </Dialog>
        ) : ' '}

        {this.state.showModifyDialog ? (
          <Dialog
            title={'修改数据'}
            close_btn={true}
            shadow={true}
            onClose={this.hiddenModifyDialog.bind(this)}>
            <Form
              ref={'form_mod'}
              fileds={[
                {name: 'title', type: 'text', label: '标题', placeholder: '请输入标题' , value : this.state.mod_title },
                {name: 'sub_title', type: 'text', label: '副标题', placeholder: '请输入副标题' , value : this.state.mod_sub_title },
                {name: 'image', type: 'file', label: '图片', placeholder: ''},
              ]}
              btns={[
                {text: '修改', type: 'primary', onClick: this.modifyMsg.bind(this)},
                {text: '取消', type: 'default', onClick:  this.hiddenModifyDialog.bind(this)},
              ]}
            />
          </Dialog>
        ) : ' '}


      </div>
    );
  }

}

export default Banner;