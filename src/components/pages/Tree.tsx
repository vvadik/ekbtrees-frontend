import React, {Component} from 'react';
import styles from './Tree.module.css'
import {NavLink} from "react-router-dom";
import Spinner from "../Spinner";
import {getUrlParamValueByKey} from "../../helpers/url";
import {getTree, getFilesByTree} from "../EditTreeForm/actions";
import {formatDate} from '../../helpers/date';
import FileUpload from "../FileUpload";
import { ITreeModelConverted, IJsonTree, IFile} from "../../common/types";
import { ITreeProps, ITreeState } from "./types";


export class Tree extends Component<ITreeProps, ITreeState> {
	static defaultProps = {
		user: null
	}

	constructor(props: ITreeProps) {
		super(props);

		this.state = {
			tree: null,
			loading: true,
			files: [],
			images: [],
			loadingFiles: true,
		}
	}

	convertTree (tree: IJsonTree): ITreeModelConverted {
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
			id
		} = tree;

		return {
			latitude: {
				title: 'Широта',
				value: geographicalPoint?.latitude ?? null
			},
			longitude: {
				title: 'Долгота',
				value: geographicalPoint?.longitude ?? null
			},
			age: {
				title: 'Возраст (в годах)',
				value: age as number
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
				value: diameterOfCrown ?? null
			},
			heightOfTheFirstBranch: {
				title: 'Высота первой ветви от земли (в метрах)',
				value: heightOfTheFirstBranch ?? null
			},
			numberOfTreeTrunks: {
				title: 'Число стволов',
				value: numberOfTreeTrunks ?? null
			},
			treeHeight: {
				title: 'Высота (в метрах)',
				value: treeHeight ?? null
			},
			species: {
				title: 'Порода',
				value: species?.title ?? null
			},
			status: {
				title: 'Статус дерева',
				value: status ?? null
			},
			treePlantingType: {
				title: 'Тип посадки дерева',
				value: treePlantingType ?? null
			},
			trunkGirth: {
				title: 'Обхват самого толстого ствола (в сантиметрах)',
				value: trunkGirth ?? null
			},
			updated: {
				title: 'Дата и время последнего редактирования',
				value: updated ?? null
			},
			id: id ?? 0 // FIXME: is it possible to not know tree id
		}
	}

	componentDidMount() {
		const id = getUrlParamValueByKey('tree');

		if (id) {
			getTree(id)
				.then((tree: IJsonTree) => {
					this.setState({
						tree: this.convertTree(tree),
						loading: false
					}, () => {
						getFilesByTree(tree.fileIds ?? [])
							.then(files => {
								const images = files.filter((file: IFile) => file.mimeType.startsWith('image'));
								const filesWithoutImages = files.filter((file: IFile) => !file.mimeType.startsWith('image'));

								this.setState({
									files: filesWithoutImages,
									images,
									loadingFiles: false
								})
							})
							.catch(error => {
								console.error(error, 'Ошибка при загрузке файлов!');
								this.setState({
									loadingFiles: false
								})
							})
					})
				})
				.catch(error => {
					console.error(error, 'Ошибка!')
					this.setState({
						loading: false
					})
				})
		}
	}

	renderEditLink () {
		const {tree} = this.state;

		return (
			<div className={styles.editLinkWrapper}>
				<NavLink to={`/trees/tree=${tree?.id}/edit`} className={styles.editLink}>Редактировать</NavLink>
			</div>
		)
	}

	renderRows () {
		const {tree} = this.state;

		const result: JSX.Element[]  = [];

		if (tree == null) {
			return result;
		}
		Object.keys(tree).forEach((key, index) => {
			const treeKey = key as keyof ITreeModelConverted;
			if (treeKey == 'id') {
				return;
			}
			if (tree[treeKey].value) {
				result.push(
					<div key={index} className={styles.row}>
						<div className={styles.col}>
							{tree[treeKey].title}
						</div>
						<div className={styles.col}>
							{tree[treeKey].value}
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
		const {files, loadingFiles} = this.state;

		if (loadingFiles) {
			return <Spinner />;
		}

		if (files.length) {
			return (
				<>
					<h3 className={styles.title}> Файлы </h3>
					<FileUpload mode="read" files={files} />
				</>
			)
		}

		return null;
	}

	renderImages () {
		const {images, loadingFiles} = this.state;

		if (loadingFiles) {
			return <Spinner />;
		}

		if (images.length) {
			return (
				<>
					<h3 className={styles.title}>Картинки</h3>
					<FileUpload
						mode="read"
						type="image"
						files={images}
					/>
				</>
			)
		}

		return null;
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
				{this.renderImages()}
				{this.renderFiles()}
			</div>
		)
	}

	render () {
		return this.renderContent();
	}
}

export default Tree;
