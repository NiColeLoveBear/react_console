/*eslint-disable no-unused-vars*/
import React, {Component} from 'react';
import Table from '../components/Table';
import Pagination from '../components/Pagination';
import fetchJson from '../untils/fetch';
import Dialog from '../components/Dialog';
import Form from '../components/Form';

/*eslint-enable no-unused-vars*/

class Banner extends Component {
  constructor(...args) {
    super(...args);

    this.state = {
      datas: [],
      showAddDialog: false
    };
  }

  async addMsg() {
    let form = this.refs.form1.getFormData();
    await  fetchJson('api/banner' , {
      method:  'POST' ,
      body: form
    });
    alert('添加成功');
  }

  async componentDidMount() {
    let data = await fetchJson('api/banner');
    this.setState({
      datas: data
    });
    console.log(data);
    console.log('banner- mount');
  }

  componentDidUpdate() {
    //let  data =  await  fetchJson('api/banner');
    // console.log(data);
    console.log('banner- update');
  }

  fnDelete(id) {
    alert('删除' + id);
  }

  fnModify(id) {
    alert('修改' + id);
  }

  // 关闭dialog
  //   hiddenAddDialog =

  // 打开dialog
  //    showAddDialog =  ()=>{
  //     this.setState({showAddDialog: false});
  // }

  render() {
    return (
      <div>
        {/*// 写法1*/}
        {/*//<button className={'btn btn-primary'}  onClick={this.showDialog.bind(this)}>添加</button>*/}
        {/*// 写法2*/}
        <button className={'btn btn-primary'} onClick={ ()=>{
          this.setState({showAddDialog: true});
        }}>添加
        </button>
        <Table fileds={[
          {name: 'title', text: '标题'},
          {name: 'sub_title', text: '副标题'}
        ]}
        datas={this.state.datas}
        onDelete={this.fnDelete.bind(this)}
        onModify={this.fnModify.bind(this)}
        />
        <Pagination/>
        {this.state.showAddDialog ? (
          <Dialog
            title={'添加数据'}
            close_btn={true}
            shadow={true}
            onClose={() => {
              this.setState({showAddDialog: false});
            }}>
            <Form
              ref={'form1'}
              fileds={[
                {name: 'title', type: 'text', label: '标题', placeholder: '请输入标题'},
                {name: 'sub_title', type: 'text', label: '副标题', placeholder: '请输入副标题'},
                {name: 'image', type: 'file', label: '图片', placeholder: ''},
              ]}
              btns={[
                {text: '添加', type: 'primary', onClick: this.addMsg.bind(this)},
                {text: '取消', type: 'default', onClick:  ()=>{
                  this.setState({showAddDialog: false});
                }},
              ]}
            />
          </Dialog>
        ) : ' '}

      </div>
    );
  }

}

export default Banner;