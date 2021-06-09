import React, { Component } from 'react';
import styles from './ListOfTrees.module.css';
import cn from "classnames";

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
            <div className={styles.treeTableItemWrapper} key={index} onClick={this.openWindow.bind(this)}>
                <div className={cn([styles.treeTableItem, styles.treeTableItemImg])}>
                    <img src={tree.image} alt='tree' className={styles.tableImg} />
                </div>
                <div className={styles.treeTableItem}>
                    <span className={styles.treeTablePrefix}>Порода: </span>
                    <label htmlFor={index}>{tree.name}</label>
                </div>
                <div className={styles.treeTableItem}>
                    <span className={styles.treeTablePrefix}>Возраст: </span>
                    {tree.age} лет
                </div>
                <div className={styles.treeTableItem}>
                    <span className={styles.treeTablePrefix}>Высота: </span>
                    {tree.height} метров
                </div>
                <div className={styles.treeTableItem}>
                    <span className={styles.treeTablePrefix}>Дата добавления: </span>
                    {tree.date}
                </div>
                <div className={cn([styles.treeTableItem, styles.treeTablePencil])}>
                    <button className={styles.treTableEditButton}>Редактировать</button>
                    <i className={cn([styles.faPencil, "fa", "fa-pencil"])} aria-hidden="true" />
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
        const classNameCN = cn({
            [styles.buttonNavigation]: true,
            [styles.activeNavigationButton]: number === this.state.currentPage
        });

      return (
          <button
              key={number}
              onClick={this.handleClick}
              id={number}
              className={classNameCN}>
            {number}
          </button>
      );
    });
  }

  renderTable () {
      return (
          <div className={styles.treeTable}>
              <div className={styles.treeTableHeader}>
                  <p className={styles.treeTableHeaderItem}>Изображение</p>
                  <p className={styles.treeTableHeaderItem}>Порода</p>
                  <p className={styles.treeTableHeaderItem}>Возраст</p>
                  <p className={styles.treeTableHeaderItem}>Высота</p>
                  <p className={styles.treeTableHeaderItem}>Дата добавления</p>
                  <p className={styles.treeTableHeaderItem}>Действия</p>
              </div>
              <div className={styles.treeTableBody}>
                  {this.renderTrees()}
              </div>
          </div>
      )
  }

  render() {
    return (
      <>
        <div className={styles.treeHeader}>
          <h3>Список деревьев</h3>
          <p>Нажмите, чтобы увидеть описание</p>
        </div>
          {this.renderTable()}
        <div className={styles.treeNavigation}>
          <div role="group" aria-label="Basic example">
            {this.renderButtonsByNumbers()}
          </div>
        </div>
      </>
    );
  }
}
