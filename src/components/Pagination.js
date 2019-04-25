import React , {Component} from  'react';


// count={7}   总页数
// cur ={this.state.page}  当前页面
// onChange={(index)=>{
//     this.setState({
//         page: index
//     });
class  Pagination extends Component{
  constructor(...args){
    super(...args);
  }

  fnClick(index){
    this.props.onChange && this.props.onChange(index);
  }

  prev(){
    if(this.props.cur-1 >0){
      this.props.onChange && this.props.onChange(this.props.cur-1);
    }
  }

  next() {
    if (this.props.cur < this.props.count) {
      this.props.onChange && this.props.onChange(this.props.cur+1);
    }
  }

  render(){
    return (
      <nav>
        <ul className="pagination">
          <li>
            <a onClick={this.prev.bind(this)} href="javascript: ;">
              <span>«</span>
            </a>
          </li>
          {  Array.from(new  Array(this.props.count)) .map( (item , index )=>(
            <li key={index} className={this.props.cur == index+1? 'active': ''}><a  onClick={this.fnClick.bind(this , index+1)}  href="javascript: ;">{index+1}</a></li>
          ))}
          <li>
            <a onClick={this.next.bind(this)} href="javascript: ;">
              <span>»</span>
            </a>
          </li>
        </ul>
      </nav>
    );
  }

}

export  default  Pagination;