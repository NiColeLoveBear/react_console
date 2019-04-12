import React , {Component} from  'react';
class  Pagination extends Component{
  constructor(...args){
    super(...args);
  }

  render(){
    return (
      <nav>
        <ul className="pagination">
          <li>
            <a href="#">
              <span>«</span>
            </a>
          </li>
          <li><a href="#">1</a></li>
          <li><a href="#">2</a></li>
          <li><a href="#">3</a></li>
          <li><a href="#">4</a></li>
          <li><a href="#">5</a></li>
          <li>
            <a href="#">
              <span>»</span>
            </a>
          </li>
        </ul>
      </nav>
    );
  }

}

export  default  Pagination;