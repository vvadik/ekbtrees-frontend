import React, { Component, Fragment } from 'react';
import './ListOfTrees.css';

export default class ListOfTrees extends Component {
  constructor() {
    super();
    this.state = {
      mobileData: [],
      desktopData: [],
      currentKey: 0,
      currentPage: 1,
      todosPerPage: 9
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }

  componentDidMount() {
    const { getData } = this.props;
    getData()
      .then((data) => {
        data.map(this.addTree)
      });
  }

  addTree = (tree) => {
    const newTreeMobile = this.renderTreeMobile(tree);
    const newTreeDesktop = this.renderTreeDesktop(tree);
    this.setState(({ mobileData }) => {
      const newDataMobile = [...mobileData, newTreeMobile];
      return {
        mobileData: newDataMobile
      }
    })
    this.setState(({ desktopData }) => {
      const newDataDesktop = [...desktopData, newTreeDesktop];
      return {
        desktopData: newDataDesktop
      }
    })
  }

  openWindow(e){
    e.stopPropagation();
    alert("Window here")
  }
  
  renderTreeDesktop(tree) {
    const currentKey = this.state.currentKey + 1;
    this.setState({
      currentKey
    })
    return (
      <tr key={this.state.currentKey} className="tr-link" onClick={this.openWindow}>
        <td><img src={tree.image} alt='tree' className='table-img'></img></td>
        <td><label htmlFor={this.state.currentKey}>{tree.name}</label></td>
        <td>{tree.age} лет</td>
        <td>{tree.height} метров</td>       
        <td>{tree.date}</td>
        <td><i className="fa fa-pencil pencil-desktop" aria-hidden="true" onClick={this.openWindow}></i></td>
      </tr>
    )
  }
  renderTreeMobile(tree) {
    const currentKey = this.state.currentKey + 1;
    this.setState({
      currentKey
    })
    return (
      <div key={this.state.currentKey} className="tree" style={{ backgroundImage: `linear-gradient(lightgrey, lightgrey), url(${tree.image})` }}>
        <input id={this.state.currentKey} type="checkbox" className="tree-checkbox checkbox-mobile"></input>
        <i className="fa fa-pencil pencil-mobile" aria-hidden="true"></i>
      </div>
    )
  }

  render() {
    const { mobileData, desktopData, currentPage, todosPerPage } = this.state;
    const indexOfLastTodo = currentPage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    const desktopItems = desktopData.slice(indexOfFirstTodo, indexOfLastTodo);
    const modileItems = mobileData.slice(indexOfFirstTodo, indexOfLastTodo);
    const renderDesktopItems = desktopItems.map((todo) => {
      return todo;
    });
    const renderMobileItems = modileItems.map((todo) => {
      return todo;
    });
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(desktopData.length / todosPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      const clazz = number === currentPage ? "btn btn-secondary active-tree" : "btn btn-secondary";
      return (
        <button
          key={number}
          onClick={this.handleClick}
          id={number}
          className={clazz}>
          {number}
        </button>
      );
    });

    return (
      <Fragment>
        <div className="tree-heading">
          <h3>Список деревьев</h3>
          <p>Нажмите, чтобы увидеть описание</p>
        </div>
        <div className="tree-container-desktop">
          <table className="tree-table">
            <thead>
              <tr><th>Изображение</th><th>Порода</th><th>Возраст</th><th>Высота</th><th>Дата добавления</th><th>Действия</th></tr>
            </thead>
            <tbody>
              {renderDesktopItems}
            </tbody>
          </table>
        </div>
        <div className="tree-container-mobile">{renderMobileItems}</div>
        <div className="list-nav">
          <div className="btn-group" role="group" aria-label="Basic example">
            {renderPageNumbers}
          </div>
        </div>

      </Fragment>
    );
  }
}
