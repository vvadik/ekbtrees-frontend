import cn from "classnames";
import React, {Component} from 'react';
import styles from './EditTreeForm.module.css';
import {getUrlParamValueByKey} from '../../helpers/url';
import {
    editTree,
    getFilesByTree,
    getTree,
    getFilesByIds,
    getTypesOfTrees,
    uploadFilesByTree
} from "./actions";
import Spinner from "../Spinner/Spinner";
import FileUpload from "../FileUpload";
import TextField from '../TextField';
import Select from '../Select';

export class EditTreeForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tree: null,
            loading: true,
            files: [],
            loadingFiles: true,
            uploadingFiles: false,
            images: [],
            uploadingImages: false
        }

        this.treeUuid = getUrlParamValueByKey('tree');
    }

    convertTree (tree) {
        const {
            age,
            conditionAssessment,
            diameterOfCrown,
            heightOfTheFirstBranch,
            fileIds,
            geographicalPoint,
            numberOfTreeTrunks,
            treeHeight,
            species,
            status,
            treePlantingType,
            trunkGirth,
            id
        } = tree;

        return {
            age: {
                title: 'Возраст (в годах)',
                value: age,
                type: 'number'
            },
            conditionAssessment: {
                title: 'Визуальная оценка состония',
                value: conditionAssessment,
                values: [
                    {
                        id: 1,
                        title: '1'
                    },
                    {
                        id: 2,
                        title: '2'
                    },
                    {
                        id: 3,
                        title: '3'
                    },
                    {
                        id: 4,
                        title: '4'
                    },
                    {
                        id: 5,
                        title: '5'
                    },
                ],
                loading: false
            },
            diameterOfCrown: {
                title: 'Диаметр кроны (в метрах)',
                value: diameterOfCrown,
                type: 'number'
            },
            heightOfTheFirstBranch: {
                title: 'Высота первой ветви от земли (в метрах)',
                value: heightOfTheFirstBranch,
                type: 'number'
            },
            numberOfTreeTrunks: {
                title: 'Число стволов',
                value: numberOfTreeTrunks,
                type: 'number'
            },
            treeHeight: {
                title: 'Высота (в метрах)',
                value: treeHeight,
                type: 'number'
            },
            species: {
                title: 'Порода',
                values: [species],
                value: species?.id,
                loading: false
            },
            status: {
                title: 'Статус дерева',
                values: [
                    {
                        id: 1,
                        title: 'Живое'
                    },
                    {
                        id: 2,
                        title: 'Не живое'
                    }
                ],
                value: status,
                loading: false
            },
            treePlantingType: {
                title: 'Тип посадки дерева',
                value: treePlantingType,
                values: [
                    {
                        id: 1,
                        title: 'Культурная посадка'
                    },
                    {
                        id: 2,
                        title: 'Самосев'
                    }
                ]
            },
            trunkGirth: {
                title: 'Обхват самого толстого ствола (в сантиметрах)',
                value: trunkGirth,
                type: 'number'
            },
            id,
            fileIds: fileIds || [],
            geographicalPoint
        }
    }

    sortTypesOfTrees (types) {
        return types
            .sort((first, second) => {
                if (first.title > second.title) return 1;
                if (first.title < second.title) return -1;
                return 0;
            })
    }

    componentDidMount() {
        if (this.treeUuid) {
            getTree(this.treeUuid)
                .then(tree => {
                    this.setState({
                        tree: this.convertTree(tree),
                        loading: false
                    }, () => {
                        getFilesByTree(tree.fileIds || [92, 93])
                            .then(files => {
                                const images = files.filter(file => file.mimeType.startsWith('image'));
                                const filesWithoutImages = files.filter(file => !file.mimeType.startsWith('image'));

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


    handleEditTree = () => {
        const {tree} = this.state;
        const data = {};

        Object.keys(tree).forEach(key => {
            if (Object.prototype.hasOwnProperty.call(tree[key], 'value')) {
                const selects = ['species']

                if (selects.includes(key)) {
                    data[key] = {id: tree[key].value}
                } else {
                    data[key] = tree[key].value;
                }
            } else {
                data[key] = tree[key];
            }
        })

        editTree(data)
            .then(_ => {
                alert('Дерево успешно изменено!');
                this.props.history.goBack();
            })
            .catch(error => {
                alert('Ошибка при изменении дерева');
                console.error('Ошибка при изменении дерева', error);
            });
    }

    handleChange = (fieldName) => (event) => {
        const {tree} = this.state;
        tree[fieldName].value = event.target.value;

        this.setState({tree})
    }

    handleOpenSelect = (type) => () => {
        const {tree} = this.state;

        if (type === 'species') {
            this.setState({
                tree: {
                    ...tree,
                    species: {
                        ...tree.species,
                        loading: true
                    }
                }
            }, () => {
                getTypesOfTrees()
                    .then(types => {
                        this.setState({
                            tree: {
                                ...tree,
                                species: {
                                    ...tree.species,
                                    values: this.sortTypesOfTrees(types),
                                    loading: false
                                }
                            }
                        })
                    })
                    .catch(error => {
                        this.setState({
                            tree: {
                                ...tree,
                                species: {
                                    ...tree.species,
                                    loading: false
                                }
                            }
                        })

                        console.error('Возникла ошибка при получении типов', error);
                    })
            })
        }
    }

    renderItems () {
        const {tree} = this.state;

        const result = [];
        Object.keys(tree).forEach(key => {
            if (tree[key]) {
                if (Object.prototype.hasOwnProperty.call(tree[key], 'values')) {
                    result.push(
                        <div className={cn([styles.blockWrapper, styles.blockWrapperDesktop])}>
                            <Select
                                onChange={this.handleChange(key)}
                                onOpen={this.handleOpenSelect(key)}
                                item={tree[key]} id={key}
                            />
                        </div>
                    )
                } else if (tree[key].title) {
                    result.push(
                        <div className={cn([styles.blockWrapper, styles.blockWrapperDesktop])}>
                            <TextField
                                item={tree[key]}
                                id={key}
                                onChange={this.handleChange(key)}
                            />
                        </div>
                    )
                }
            }
        })

        return result;
    }

    renderMainInformation () {
        return (
            <div className={styles.block}>
                <div className={styles.wrapperFlex}>
                    {this.renderItems()}
                </div>
            </div>
        )
    }

    uploadFiles (files, key) {
        const camelCaseKey = key.charAt(0).toUpperCase() + key.slice(1);


        uploadFilesByTree(this.treeUuid, files)
            .then(fileIds => {
                getFilesByIds(fileIds)
                    .then(files => {
                        this.setState({
                            [key]: this.state[key].concat(files),
                            tree: {
                                ...this.state.tree,
                                fileIds: this.state.tree.fileIds.concat(fileIds),
                            },
                            [`uploading${camelCaseKey}`]: false
                        })
                    })
                    .catch(error => {
                        this.setState({
                            [`uploading${camelCaseKey}`]: false
                        })

                        throw new Error (`Произошла ошибка при получении загруженных файлов/картинок ${error}`);
                    })
            })
            .catch(error => {
                this.setState({
                    [`uploading${camelCaseKey}`]: false
                })
                console.error('Ошибка при загрузке файлов/картинок', error)
            })
    }

    handleUploadFiles = (key) => (files) => {
        const camelCaseKey = key.charAt(0).toUpperCase() + key.slice(1);

        this.setState({
            [`uploading${camelCaseKey}`]: true
        }, () => this.uploadFiles(files, key));
    }

    getFilesAfterDelete (id, key) {
        return this.state[key].filter(file => file.id !== id);
    }

    getFileIdsAfterDelete (id) {
        const {tree} = this.state;
        return tree.fileIds.filter(fileId => fileId !== id);
    }

    handleDeleteFile = (key) => (id) => {
        this.setState({
            [key]: this.getFilesAfterDelete(id, key),
            tree: {
                ...this.state.tree,
                fileIds: this.getFileIdsAfterDelete(id)
            }
        });
    }

    renderFiles () {
        const {files, loadingFiles, uploadingFiles} = this.state;

        if (loadingFiles) {
            return <Spinner />;
        }

        return (
            <>
                <h3 className={styles.title}> Файлы </h3>
                <FileUpload
                    files={files}
                    onDelete={this.handleDeleteFile('files')}
                    onUpload={this.handleUploadFiles('files')}
                    uploading={uploadingFiles}
                />
            </>
        )
    }

    renderImages () {
        const {images, loadingFiles, uploadingImages} = this.state;

        if (loadingFiles) {
            return <Spinner />;
        }

        return (
            <>
                <h3 className={styles.title}> Картинки </h3>
                <FileUpload
                    files={images}
                    onDelete={this.handleDeleteFile('images')}
                    onUpload={this.handleUploadFiles('images')}
                    type="image"
                    uploading={uploadingImages}
                />
            </>
        )
    }

    renderContent () {
        const {loading} = this.state;

        if (loading) {
            return <Spinner />
        }

        return (
            <div className={styles.form}>
                {this.renderMainInformation()}
                {this.renderImages()}
                {this.renderFiles()}
                {this.renderButtons()}
            </div>
        )
    }

    renderButtons () {
        return (
            <div className={styles.buttons}>
                <button disabled={this.state.uploadingFiles || this.state.uploadingImages} className={styles.addButton} onClick={this.handleEditTree}>Редактировать</button>
                <button onClick={this.props.history.goBack} className={styles.cancelButton}>Отмена</button>
            </div>
        )
    }


    render() {
        return (
            <div className={styles.formContainer}>
                {this.renderContent()}
            </div>
        );
    }
}

export default EditTreeForm;
