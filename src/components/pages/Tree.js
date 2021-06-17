import React, {Component} from 'react';
import styles from './Tree.module.css'
import {NavLink} from "react-router-dom";
import Spinner from "../Spinner";
import {getUrlParamValueByKey} from "../../helpers/url";
import {getTree} from "../EditTreeForm/actions";
import {formatDate} from '../../helpers/date';

export class Tree extends Component {
	static defaultProps = {
		user: null
	}

	constructor(props) {
		super(props);

		this.state = {
			tree: null,
			loading: true
		}
	}

	convertTree (tree) {
		const {
			age,
			created,
			conditionAssessment,
			diameterOfCrown,
			heightOfTheFirstBranch,
			numberOfTreeTrunks,
			treeHeight,
			species,
			status,
			treePlantingType,
			trunkGirth,
			updated,
			geographicalPoint,
			id,
		} = tree;

		return {
			latitude: {
				title: 'Широта',
				value: geographicalPoint?.latitude
			},
			longitude: {
				title: 'Долгота',
				value: geographicalPoint?.longitude
			},
			age: {
				title: 'Возраст (в годах)',
				value: age
			},
			created: {
				title: 'Дата и время добавления записи',
				value: created ? formatDate(created) : null
			},
			conditionAssessment: {
				title: 'Визуальная оценка состония',
				value: conditionAssessment
			},
			diameterOfCrown: {
				title: 'Диаметр кроны (в метрах)',
				value: diameterOfCrown
			},
			heightOfTheFirstBranch: {
				title: 'Высота первой ветви от земли (в метрах)',
				value: heightOfTheFirstBranch
			},
			numberOfTreeTrunks: {
				title: 'Число стволов',
				value: numberOfTreeTrunks
			},
			treeHeight: {
				title: 'Высота (в метрах)',
				value: treeHeight
			},
			species: {
				title: 'Порода',
				value: species?.title
			},
			status: {
				title: 'Статус дерева',
				value: status
			},
			treePlantingType: {
				title: 'Тип посадки дерева',
				value: treePlantingType
			},
			trunkGirth: {
				title: 'Обхват самого толстого ствола (в сантиметрах)',
				value: trunkGirth
			},
			updated: {
				title: 'Дата и время последнего редактирования',
				value: updated
			},
			id
		}
	}

	componentDidMount() {
		const id = getUrlParamValueByKey('tree');

		if (id) {
			getTree(id)
				.then(tree => {
					this.setState({
						tree: this.convertTree(tree),
						loading: false
					})
				})
				.catch(error => {
					console.error(error, 'Ошибка!')
				})
		}
	}

	renderEditLink () {
		const {tree} = this.state;

		return (
			<div className={styles.editLinkWrapper}>
				<NavLink to={`/trees/tree=${tree.id}/edit`} className={styles.editLink}>Редактировать</NavLink>
			</div>
		)
	}

	renderRows () {
		const {tree} = this.state;

		const result = [];

		Object.keys(tree).forEach((key, index) => {
			if (tree[key].value) {
				result.push(
					<div className={styles.row}>
						<div className={styles.col}>
							{tree[key].title}
						</div>
						<div className={styles.col}>
							{tree[key].value}
						</div>
					</div>
				)
			}
		});

		return result;
	}

	renderTable () {
		return (
			<div className={styles.table}>
				<div className={styles.tbody}>
					{this.renderRows()}
				</div>
			</div>
		)
	}

	renderDetails () {
		const {user} = this.props;

		return (
			<div className={styles.wrapper}>
				{user ? this.renderEditLink() : null}
				{this.renderTable()}
			</div>
		)
	}

	renderFiles () {
		return (
			<>
				<h3 className={styles.title}> Файлы </h3>
				<div className={styles.wrapper}>
					Тут разместить файлы
				</div>
			</>
		)
	}

	renderContent () {
		const {loading} = this.state;

		if (loading) {
			return <Spinner />;
		}

		return (
			<div className={styles.container}>
				<h3 className={styles.title}> Карточка дерева </h3>
				{this.renderDetails()}
				{this.renderFiles()}
			</div>
		)
	}

	render () {
		return this.renderContent();
	}
}

export default Tree;
