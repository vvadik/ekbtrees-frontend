import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import styles from './ListOfTrees.module.css';
import cn from "classnames";
import {formatDate} from '../../helpers/date';
import {getTrees} from './actions';
import Spinner from "../Spinner/Spinner";

const mockData = [
    {
        "id": 20,
        "geographicalPoint": {
            "latitude": 90,
            "longitude": 180
        },
        "species": {
            "id": 0,
            "title": "string"
        },
        "treeHeight": 0,
        "numberOfTreeTrunks": 0,
        "trunkGirth": 0,
        "diameterOfCrown": 0,
        "heightOfTheFirstBranch": 0,
        "conditionAssessment": 0,
        "age": 0,
        "treePlantingType": "string",
        "created": "2021-06-15T07:21:08.812Z",
        "updated": "2021-06-15T07:21:08.812Z",
        "authorId": 0,
        "status": "string",
        "fileIds": [
            0
        ],
        "image": './img'
    }
]

export default class ListOfTrees extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: 1,
      todosPerPage: 9,
      trees: [],
      loading: true
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }

  componentDidMount() {
      getTrees()
          .then((data) => {
              this.setState({trees: mockData, loading: false})
          })
          .catch(error => {
              console.error('Произошла ошибка при получении деревьев!', error);
          })
  }

    getTree = (tree, index) => {
        return (
            <NavLink to={`/trees/tree=${tree.id}`} className={styles.treeTableItemWrapper} key={index}>
                <div className={cn([styles.treeTableItem, styles.treeTableItemImg])}>
                    <img src={tree.image} alt='tree' className={styles.tableImg} />
                </div>
                <div className={styles.treeTableItem}>
                    <span className={styles.treeTablePrefix}>Порода: </span>
                    <label htmlFor={index}>{tree.species.title}</label>
                </div>
                <div className={styles.treeTableItem}>
                    <span className={styles.treeTablePrefix}>Возраст: </span>
                    {tree.age} лет
                </div>
                <div className={styles.treeTableItem}>
                    <span className={styles.treeTablePrefix}>Высота: </span>
                    {tree.treeHeight} метров
                </div>
                <div className={styles.treeTableItem}>
                    <span className={styles.treeTablePrefix}>Дата добавления: </span>
                     {formatDate(tree.created)}
                </div>
            </NavLink>
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

    if (trees.length > todosPerPage) {
        for (let i = 1; i <= Math.ceil(trees.length / todosPerPage); i++) {
            pageNumbers.push(i);
        }
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
                  {/* <p className={styles.treeTableHeaderItem}>Действия</p> */}
              </div>
              <div className={styles.treeTableBody}>
                  {this.renderTrees()}
              </div>
          </div>
      )
  }

  renderHeader () {
      return (
          <div className={styles.treeHeader}>
              <h3>Список деревьев</h3>
              <p>Нажмите на нужное дерево в списке, чтобы увидеть форму редактирования</p>
          </div>
      )
  }

  renderBody () {
      const {loading} = this.state;

      if (loading) {
          return <Spinner />
      }

      return (
          <>
              {this.renderTable()}
              <div className={styles.treeNavigation}>
                  <div role="group" aria-label="Basic example">
                      {this.renderButtonsByNumbers()}
                  </div>
              </div>
          </>
      );
  }

  render() {
    return (
      <>
          {this.renderHeader()}
          {this.renderBody()}
      </>
    );
  }
}
