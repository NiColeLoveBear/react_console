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

  addMsg() {

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

  render() {
    return (
      <div>
        {/*// 写法1*/}
        {/*//<button className={'btn btn-primary'}  onClick={this.showDialog.bind(this)}>添加</button>*/}
        {/*// 写法2*/}
        <button className={'btn btn-primary'} onClick={()=>{
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
            onClose={()=> {
              this.setState({showAddDialog: false});
            }}>
            <Form
              ref={'form1'}
              fileds={[
                {name: 'username', type: 'text', label: '用户名', placeholder: '请输入用户名'},
                {name: 'password', type: 'password', label: '密码', placeholder: '请输入密码'},
              ]}
              btns={[
                {text: '增加', type: 'primary', onClick: this.addMsg.bind(this)},
              ]}
            />
          </Dialog>
        ) : ' '}

      </div>
    );
  }

}

export default Banner;