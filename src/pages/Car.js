import React, {Component} from 'react';
import Tabs from '../components/Tabs';
import Table from '../components/Table';
import fetchJson from '../untils/fetch';
import Pagination from '../components/Pagination';
import Dialog from '../components/Dialog';
import Form from '../components/Form';


class Car extends Component {
  constructor(...args) {
    super(...args);

    this.state={
      datas: [],
      showAddDialog: false,
      showDeleteDialog: false,
      showModifyDialog: false,
      pageTotal: 1,
      page_cur: 1,
      mod_id: 0 ,
      mod_title: '',
      mod_price: 0,
      mod_description: ''
    };
  }

  async componentDidMount() {
    console.log('car- mount');
    // 获取车辆信息
    let datas = await  fetchJson('api/carlist/1');
    let count =  await  fetchJson('api/car_page');
    console.log(datas , count);
    this.setState({
      datas ,
      pageTotal: count
    });
  }

  componentDidUpdate() {
    console.log('car- update');
  }

  fnDelete(id){
    // 删除
    this.id_to_delete= id;
    this.showDelDialog();
  }

  async   fnModify(id){
    // 找到数据
    let car = await  fetchJson(`api/car/${id}`);
    this.setState({
      mod_id: id ,
      mod_title: car.title ,
      mod_price: car.price,
      mod_description: car.description
    });
    // 修改
    this.showModDialog();
  }

  async pageChange(page){
    let datas = await  fetchJson(`api/carlist/${page}`);
    this.setState({
      datas ,
      page_cur: page
    });
  }

  // add  msg
  async addMsg(){
    let res = this.refs.form_car.getFormData();
    await  fetchJson('api/car' , {
      method: 'POST',
      body: res
    });
    await  this.pageChange(this.state.page_cur);
  }

  async  deleteCar(){
    let id = this.id_to_delete;
    delete  this.id_to_delete;
    await  fetchJson(`api/car/${id}` , {
      method: 'DELETE'
    });
    // reload页面
    await  this.pageChange(this.state.page_cur);
  }

  async  modifyMsg(){
    let form = this.refs.form2.getFormData();
    await  fetchJson(`api/car/${this.state.mod_id}` , {
      method: 'POST' ,
      body: form
    });
    // reload页面
    await  this.pageChange(this.state.page_cur);
    this.hiddenModDialog();
  }

  // 删除
  async doDelDialog(){
    await  this.deleteCar();
    // 成功以后关闭弹框
    this.hiddenDelDialog();
  }
  // 关闭dialog
  hiddenDelDialog(){
    this.setState({
      showDeleteDialog: false,
    });
  }
  hiddenDialog(){
    this.setState({
      showAddDialog: false,
    });
  }

  hiddenModDialog(){
    this.setState({
      showModifyDialog: false,
    });
  }

  //打开
  showDialog(){
    this.setState({
      showAddDialog: true,
    });
  }

  showDelDialog(){
    this.setState({
      showDeleteDialog: true,
    });
  }

  showModDialog(){
    this.setState({
      showModifyDialog: true,
    });
  }

  //  生成feature
  creatFeature(arr){
    let result =[];
    arr.map(res  =>{
      result.push({name: 'feature_name', type: 'hidden',  value: res});
      result.push({name: 'feature_value', type: 'text', label:  res });
    });
    return result;
  }

  render() {
    return (
      <div>
        <Tabs
          tabs={[
            {text: '焦点图管理' ,  path: '/'},
            {text: '车辆管理' ,  path: '/car' , selected: true}
          ]}
        />
        {/*<button className={'btn btn-primary'}  onClick={this.showDialog.bind(this)}>添加</button>*/}
        <button className={'btn btn-primary'}  onClick={this.showDialog.bind(this)}>添加</button>
        <Table fileds={[
          {name: 'title', text: '名称'},
          {name: 'price', text: '价格'}
        ]}
        datas={this.state.datas}
        onDelete={this.fnDelete.bind(this)}
        onModify={this.fnModify.bind(this)}
        />
        <Pagination
          count={this.state.pageTotal}
          cur ={this.state.page_cur}
          onChange={this.pageChange.bind(this)}
        />

        {this.state.showAddDialog ? (
          <Dialog
            title={'添加数据'}
            close_btn={true}
            shadow={true}
            onClose={this.hiddenDialog.bind(this)}>
            <Form
              ref={'form_car'}
              fileds={[
                {name: 'title', type: 'text', label: '车辆标题', placeholder: '请输入标题'},
                {name: 'price', type: 'text', label: '车辆价格', placeholder: '请输入价格'},
                {name: 'description', type: 'text', label: '描述'},
                {name: 'images', type: 'file', label: '车辆图片' , isArray: true},
                ...this.creatFeature(['上牌时间' , '表显里程' , '本车排量' , '变速箱'])
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
              <button className={'btn btn-danger'} type='button' onClick={this.doDelDialog.bind(this)}>删除</button>
              <button className={'btn btn-default'}  type='button'  onClick={this.hiddenDelDialog.bind(this)}>取消</button>
            </div>
          </Dialog>
        ) : ' '}

        {this.state.showModifyDialog ? (
          <Dialog
            title={'修改'}
            close_btn={true}
            shadow={true}
            onClose={this.hiddenModDialog.bind(this)}>
            <Form
              ref={'form2'}
              fileds={[
                {name: 'title', type: 'text', label: '车辆标题', value: this.state.mod_title},
                {name: 'price', type: 'text', label: '车辆价格', value: this.state.mod_price},
                {name: 'description', type: 'text',  label: '车辆描述' , value: this.state.mod_description}
              ]}
              btns={[
                {text: '修改', type: 'primary', onClick: this.modifyMsg.bind(this)},
                {text: '取消', type: 'default', onClick:  this.hiddenDialog.bind(this)},
              ]}
            />
          </Dialog>
        )  : ' '}




      </div>
    );
  }

}

export default Car;