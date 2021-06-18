import cn from "classnames";
import React, {Component} from 'react';
import styles from './EditTreeForm.module.css';
import {getUrlParamValueByKey} from '../../helpers/url';
import {getFilesByTree, getTree, getFilesByIds, uploadFilesByTree} from "./actions";
import Spinner from "../Spinner/Spinner";
import FileUpload from "../FileUpload";

export class EditTreeForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tree: null,
            loading: true,
            files: [],
            loadingFiles: true,
            filesIds: [],
            uploadingFiles: false
        }

        this.treeUuid = getUrlParamValueByKey('tree');
    }

    componentDidMount() {
        if (this.treeUuid) {
            getTree(this.treeUuid)
                .then(tree => {
                    this.setState({
                        tree,
                        loading: false
                    }, () => {
                        getFilesByTree([16, 18, 20])
                            .then(files => {
                                this.setState({
                                    files,
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


    handleSubmit(event) {
        // event.preventDefault();
        // this.setState({buttonEnable: false});
        //
        // const formDataExcludedFields = ["created", "updated", "user", "species"]
        // const formData = new FormData(event.target);
        //
        // let data = {};
        // formData.forEach((value, key) => {
        //     if (!formDataExcludedFields.includes(key)) {
        //         data[key] = value
        //     }
        //     if (key === "species") {
        //         data[key] = {"id": value}
        //     }
        // });
        //
        // data["geographicalPoint"] = {
        //     "latitude": this.props.match.params.lat,
        //     "longitude": this.props.match.params.lng
        // };
        //
        // const json = JSON.stringify(data);
        // fetch(getTreeAddUrl(), {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: json,
        // })
        //     .then(response => {
        //         if (response.status === 201) {
        //             alert("Дерево успешно добавлено");
        //             this.props.history.goBack();
        //         } else {
        //             alert("Возникла ошибка при попытке добавить дерево")
        //             console.log(response.status);
        //             console.log(json);
        //             this.setState({buttonEnable: true});
        //         }
        //     });
    }

    renderGEOPosition () {
        const {tree} = this.state;

        if (tree && tree.geographicalPoint) {
            const {latitude, longitude} = tree.geographicalPoint;

            return (
                <div className={styles.blockWrapper}>
                    <span className={styles.blockPrefix}> Геопозиция </span>
                    <div className={styles.geopositionWrapper}>
                        <span className={styles.geopositionItem}>{latitude}</span>
                        <span className={styles.geopositionItem}>{longitude}</span>
                    </div>
                </div>
            )
        }

        return null;
    }

    renderMainInformation () {
        const {age, conditionAssessment, diameterOfCrown, heightOfTheFirstBranch, treeHeight} = this.state.tree;
        return (
            <figure className={styles.block}>
                <div className={styles.wrapperFlex}>
                    <div className={cn([styles.blockWrapper, styles.blockWrapperDesktop])}>
                        <span className={styles.blockPrefix}> Высота (в метрах)</span>
                        <input name="treeHeight" defaultValue={treeHeight} className={styles.blockValue} type="number" min="1" max="50"/>
                    </div>
                    <div className={cn([styles.blockWrapper, styles.blockWrapperDesktop])}>
                        <span className={styles.blockPrefix}>Диаметр кроны (в метрах)</span>
                        <input defaultValue={diameterOfCrown} name="diameterOfCrown" className={styles.blockValue} type="number" min="1" max="50"/>
                    </div>
                    <div className={cn([styles.blockWrapper, styles.blockWrapperDesktop])}>
                        <span
                            className={styles.blockPrefix}> Обхват <wbr/> самого толстого ствола (в сантиметрах)</span>
                        <input name="trunkGirth" className={styles.blockValue} required type="number" min="1" max="10"/>
                    </div>
                    <div className={cn([styles.blockWrapper, styles.blockWrapperDesktop])}>
                        <span className={styles.blockPrefix}> Число стволов </span>
                        <input name="numberOfTreeTrunks" className={styles.blockValue} required type="number" min="1" max="5"
                               placeholder="1"/>
                    </div>
                    <div className={cn([styles.blockWrapper, styles.blockWrapperDesktop])}>
                        <span className={styles.blockPrefix}> Высота первой ветви от земли (в метрах)</span>
                        <input name="heightOfTheFirstBranch" defaultValue={heightOfTheFirstBranch} className={styles.blockValue} type="number" min="1" max="50"/>
                    </div>
                    <div className={cn([styles.blockWrapper, styles.blockWrapperDesktop])}>
                        <span className={styles.blockPrefix}> Возраст (в годах)</span>
                        <input name="age" defaultValue={age} className={styles.blockValue} type="number" min="0"/>
                    </div>
                    <div className={cn([styles.blockWrapper, styles.blockWrapperDesktop])}>
                        <span className={styles.blockPrefix}>Визуальная  оценка состояния</span>
                        <select defaultValue={conditionAssessment} name="conditionAssessment" className={styles.blockSelect} dir="rtl">
                            <option value="1" className={styles.blockSelectOption}>1/5</option>
                            <option value="2" className={styles.blockSelectOption}>2/5</option>
                            <option value="3" className={styles.blockSelectOption}>3/5</option>
                            <option value="4" className={styles.blockSelectOption}>4/5</option>
                            <option value="5" className={styles.blockSelectOption}>5/5</option>
                        </select>
                    </div>
                    <div className={cn([styles.blockWrapper, styles.blockWrapperDesktop])}>
                        <span className={styles.blockPrefix}> Статус дерева </span>
                        <select dir="rtl" className={styles.blockSelect}>
                            <option className={styles.blockSelectOption}> Жив</option>
                            <option className={styles.blockSelectOption}> Цел</option>
                            <option className={styles.blockSelectOption}> Орел</option>
                        </select>
                    </div>
                </div>
            </figure>
        )
    }

    uploadFiles (files) {
        uploadFilesByTree(this.treeUuid)(files)
            .then(filesIds => {
                getFilesByIds(filesIds)
                    .then(files => {
                        this.setState({
                            files: this.state.files.concat(files),
                            filesIds: this.state.filesIds.concat(filesIds),
                            uploadingFiles: false
                        })
                    })
                    .catch(error => {
                        this.setState({
                            uploadingFiles: false
                        })

                        throw `Произошла ошибка при получении загруженных файлов ${error}`;
                    })
            })
            .catch(error => {
                this.setState({
                    uploadingFiles: false
                })
                console.error('Ошибка при загрузке файлов', error)
            })
    }

    handleUploadFiles = (files) => {
        this.setState({
            uploadingFiles: true
        }, () => this.uploadFiles(files));
    }

    getFilesAfterDelete (id) {
        const {files} = this.state;
        return files.filter(file => file.id !== id);
    }

    getFilesIdsAfterDelete (id) {
        const {filesIds} = this.state;
        return filesIds.filter(fileId => fileId !== id);
    }

    handleDeleteFile = (id) => {
        this.setState({
            files: this.getFilesAfterDelete(id),
            filesIds: this.getFilesIdsAfterDelete(id)
        });
    }

    renderFiles () {
        const {files, loadingFiles, uploadingFiles} = this.state;

        if (loadingFiles) {
            return <Spinner />;
        }

        return (
            <FileUpload
                files={files}
                onDelete={this.handleDeleteFile}
                onUpload={this.handleUploadFiles}
                uploading={uploadingFiles}
            />
        )
    }

    renderForm () {
        const {loading} = this.state;

        if (loading) {
            return <Spinner />
        }

        return (
            <form className={styles.form} onSubmit={this.handleSubmit}>
                {this.renderMainInformation()}
                {this.renderFiles()}
                {this.renderButtons()}
            </form>
        )
    }

    renderButtons () {
        return (
            <div className={styles.buttons}>
                <button disabled={!this.state.buttonEnable} className={styles.addButton} type="submit">Редактировать</button>
                <button onClick={this.props.history.goBack} className={styles.cancelButton}>Отмена</button>
            </div>
        )
    }


    render() {
        return (
            <div className={styles.formContainer}>
                {this.renderForm()}
            </div>
        );
    }
}

export default EditTreeForm;
