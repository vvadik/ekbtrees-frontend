import React, {Component} from "react";
import {DropzoneDialog} from 'material-ui-dropzone'
import Button from '@material-ui/core/Button';
import styles from './FileUpload.module.css';
import classNames from "classnames";
import LinearProgress from "../LinearProgress/LinearProgress";

export class FileUpload extends Component {
	constructor(props) {
		super(props);

		this.state = {
			open: false,
		};
	}

	handleClose() {
		this.setState({
			open: false
		});
	}

	handleDelete = (id) => () => {
		const {onDelete} = this.props;
		onDelete && onDelete(id)
	}

	handleUpload (files) {
		const {onUpload} = this.props;
		onUpload && onUpload(files);
	}

	handleSave(files) {
		this.setState({
			open: false,
		}, () => this.handleUpload(files));
	}

	handleOpen() {
		this.setState({
			open: true,
		});
	}

	renderViewLinks () {
		const {files} = this.props;

		return files.map(file => {
			return (
				<a className={styles.editLink} href={file.uri}>{file.title}</a>
			)
		});
	}

	renderEditLinks () {
		const {files} = this.props;

		return files.map(file => {
			return (
				<div className={styles.item}>
					<div className={styles.file}>
						<button onClick={this.handleDelete(file.id)} className={styles.deleteFile}>
							<i className={classNames(["fa", "fa-times"])} />
						</button>
						<span>{file.title}</span>
					</div>
				</div>
			)
		});
	}

	renderProgress () {
		const {uploading} = this.props;

		if (uploading) {
			return <LinearProgress />;
		}

		return null;
	}

	getFileAddedMessage = (fileName) => `Файл ${fileName} успешно добавлен для загрузки`;

	getFileRemovedMessage = (fileName) => `Файл ${fileName} удален`;

	getFileLimitExceedMessage = (fileLimit) => `Превышено количество загружаемых файлов. Максимальное количество ${fileLimit}`

	renderUploader () {
		return (
			<>
				{this.renderEditLinks()}
				{this.renderProgress()}
				<DropzoneDialog
					open={this.state.open}
					onSave={this.handleSave.bind(this)}
					showPreviews={true}
					maxFileSize={5000000}
					filesLimit={10}
					dropzoneText="Перенесите сюда загружаемые файлы или кликникте в облась загрузки"
					dialogTitle="Загрузить файлы"
					cancelButtonText="Отмена"
					submitButtonText="Загрузить"
					getFileAddedMessage={this.getFileAddedMessage}
					getFileRemovedMessage={this.getFileRemovedMessage}
					getFileLimitExceedMessage={this.getFileLimitExceedMessage}
					previewText="Предварительный просмотр"
					onClose={this.handleClose.bind(this)}
				/>
				<div className={styles.addingFilesWrapper}>
					<button className={styles.addBtn} onClick={this.handleOpen.bind(this)}>
						Добавить файлы
					</button>
				</div>
			</>
		)
	}

	renderContent () {
		const {mode} = this.props;

		if (mode === 'read') {
			return (
				<div className={styles.linksWrapper}>
					{this.renderViewLinks()}
				</div>
			);
		}

		return (
			<div className={styles.wrapper}>
				{this.renderUploader()}
			</div>
		);
	}


	render() {
		return (
			<>
				<h3 className={styles.title}> Файлы </h3>
				{this.renderContent()}
			</>
		)
	}
}

export default FileUpload;
