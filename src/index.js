/*eslint-disable no-unused-vars*/
import React from 'react';
import App from './App';
import  {HashRouter as Router , Route}  from  'react-router-dom';
import {Provider} from   'react-redux';
/*eslint-enable no-unused-vars*/
import  store from './store';
import {render} from 'react-dom';

render((
  <Provider store={store}>
    <Router>
      <Route component={App}/>
    </Router>
  </Provider>
), document.getElementById('root'));

//基本用法
// fetch('/public/users.txt').then(res=>{
//   // let {ok}=res;
//   //
//   // if(ok){
//   //   alert('成功');
//   // }else{
//   //   //请求错误：对方服务成功返回数据
//   //   alert('失败了');
//   // }
//   res.json().then(data=>{
//     console.log(data);
//   }, err=>{
//     alert('失败3');
//   })
//
// }, err=>{
//   //网络错误：连接失败、无法解析对方数据
//   alert('失败了2');
// });

//.json()           json方式解析——数据            适合：数据
//.arrayBuffer()    把数据解析成二进制数组
//.blob()           不解析，原始二进制数据         适合：二进制——图片、视频、音频
//.formData()
//.text()           文本                         适合：文本

// fetch('/public/users.txt').then(res=>res.text(), err=>{
//   console.log(err);
// }).then(data=>{
//   console.log(data);
// }, err=>{
//   console.log(err);
// });


// (async ()=>{
//   try{
//     let res=await fetch('/public/users.txt');
//     let data=await res.json();
//
//     console.log(res.headers.get('Content-Type'));
//
//     console.log(data);
//   }catch(e){
//     alert('数据请求失败，请刷新重试');
//   }
// })();
