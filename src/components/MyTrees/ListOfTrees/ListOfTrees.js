import React, { Component, Fragment } from 'react';
import './ListOfTrees.css';

export default class ListOfTrees extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: 1,
      todosPerPage: 9,
      trees: []
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }

  componentDidMount() {
    const {getData} = this.props;

    getData()
      .then((data) => {
        this.setState({trees: data})
      });
  }

  openWindow = (e) => {
    e.stopPropagation();
    alert("Window here")
  }

    getTree = (tree, index) => {
        return (
            <div className="treeTableItemWrapper" key={index} onClick={this.openWindow.bind(this)}>
                <div className="treeTableItem treeTableItemImg">
                    <img src={tree.image} alt='tree' className='tableImg' />
                </div>
                <div className="treeTableItem">
                    <span className="treeTablePrefix">Порода: </span>
                    <label htmlFor={index}>{tree.name}</label>
                </div>
                <div className="treeTableItem">
                    <span className="treeTablePrefix">Возраст: </span>
                    {tree.age} лет
                </div>
                <div className="treeTableItem">
                    <span className="treeTablePrefix">Высота: </span>
                    {tree.height} метров
                </div>
                <div className="treeTableItem">
                    <span className="treeTablePrefix">Дата добавления: </span>
                    {tree.date}
                </div>
                <div className="treeTableItem treeTablePencil">
                    <button className="treTableEditButton">Редактировать</button>
                    <i className="fa fa-pencil" aria-hidden="true" />
                </div>
            </div>
        )
    }

  renderTrees () {
    const {trees, currentPage, todosPerPage } = this.state;
    const indexOfLastTodo = currentPage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    const items = trees.slice(indexOfFirstTodo, indexOfLastTodo);

    return items.map(this.getTree);
  }

  getPageNumbers () {
    const {trees, todosPerPage } = this.state;
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(trees.length / todosPerPage); i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  }

  renderButtonsByNumbers () {
    return this.getPageNumbers().map(number => {
      const className = number === this.state.currentPage
          ? "buttonNavigation activeNavigationButton"
          : "buttonNavigation";

      return (
          <button
              key={number}
              onClick={this.handleClick}
              id={number}
              className={className}>
            {number}
          </button>
      );
    });
  }

  renderTable () {
      return (
          <div className="treeTable">
              <div className="treeTableHeader">
                  <p className="treeTableHeaderItem">Изображение</p>
                  <p className="treeTableHeaderItem">Порода</p>
                  <p className="treeTableHeaderItem">Возраст</p>
                  <p className="treeTableHeaderItem">Высота</p>
                  <p className="treeTableHeaderItem">Дата добавления</p>
                  <p className="treeTableHeaderItem">Действия</p>
              </div>
              <div className="treeTableBody">
                  {this.renderTrees()}
              </div>
          </div>
      )
  }

  render() {
    return (
      <>
        <div className="treeHeader">
          <h3>Список деревьев</h3>
          <p>Нажмите, чтобы увидеть описание</p>
        </div>
          {this.renderTable()}
        <div className="treeNavigation">
          <div className="btn-group" role="group" aria-label="Basic example">
            {this.renderButtonsByNumbers()}
          </div>
        </div>
      </>
    );
  }
}
