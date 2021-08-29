import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import styles from './TreeLists.module.css';
import cn from "classnames";
import {formatDate} from '../../helpers/date';
import {getMyTrees} from '../../api/tree';
import Spinner from "../Spinner/Spinner";

const locale = {
	treeTable: {
		age: 'Возраст',
		creationDate: 'Дата добавления',
		height: 'Высота',
		image: "Изображение",
		species: 'Порода'
	}
}

const treeCountPerPage = 9;

const getTreeLink = (treeId) => {
	return `/trees/tree=${treeId}`
}

export default class TreeLists extends Component {
	constructor(props) {
	super(props);

		this.state = {
			currentPage: 0,
			trees: [],
			loading: true
		};
	}

componentDidMount() {
	getMyTrees()
		.then(data => {
			this.setState({trees: data, loading: false})
		})
		.catch(error => {
			console.error('Произошла ошибка при получении деревьев!', error);
		})
}

	handleClick = (event) => {
		this.setState({
		  	currentPage: Number(event.target.id)
		});
	}

	getTree = (tree, index) => {
		const {age, created, id, image, species, treeHeight} = tree;

		return (
			<NavLink to={getTreeLink(id)} className={styles.treeTableItemWrapper} key={id}>
				<div className={cn([styles.treeTableItem, styles.treeTableItemImg])}>
					<img src={image} alt='tree' className={styles.tableImg} />
				</div>
				<div className={styles.treeTableItem}>
					<label htmlFor={index}>{species.title}</label>
				</div>
				<div className={styles.treeTableItem}>{age}</div>
				<div className={styles.treeTableItem}>{treeHeight}</div>
				<div className={styles.treeTableItem}>
					 {formatDate(created)}
				</div>
			</NavLink>
		)
	}

	renderTrees () {
		const {trees, currentPage} = this.state;
		const items = trees.slice(currentPage * treeCountPerPage, (currentPage + 1) * treeCountPerPage);

		return (
			<div className={styles.treeTableBody}>
				{items.map(this.getTree)}
			</div>
		);
	}

	getPageNumbers () {
		const {trees, treeCountPerPage} = this.state;
		const pageCount = Math.ceil(trees.length / treeCountPerPage);
		const pageNumbers = [];

		for (let i =0; i <= pageCount; i++) {
			pageNumbers.push(i);
		}

		return pageNumbers;
	}
	
	renderPageButton = (number) => {
		const classNameCN = cn({
			[styles.buttonNavigation]: true,
			[styles.activeNavigationButton]: number === this.state.currentPage
		});

		return (
			<button
				key={number}
				onClick={this.handleClick}
				id={number}
				className={classNameCN}
			>
				{number}
			</button>
		);
	}

	renderButtonsByNumbers () {
		return this.getPageNumbers().map(number => this.renderPageButton(number));
	}

	renderTableHeader = () => {
		const {age, creationDate, height, image, species} = locale.treeTable;

		return (
			<div className={styles.treeTableHeader}>
				<p className={styles.treeTableHeaderItem}>{image}</p>
				<p className={styles.treeTableHeaderItem}>{species}</p>
				<p className={styles.treeTableHeaderItem}>{age}</p>
				<p className={styles.treeTableHeaderItem}>{height}</p>
				<p className={styles.treeTableHeaderItem}>{creationDate}</p>
			</div>
		)
	}

	renderTable () {
		return (
			<div className={styles.treeTable}>
				{this.renderTableHeader()}
				{this.renderTrees()}
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
          {this.renderBody()}
      </>
    );
  }
}
