import cn from 'classnames';
import React, { Component } from 'react';
import {addTree, uploadFiles} from "./actions";
import FileUpload from "../FileUpload";
import TextField from '../TextField';
import Select from '../Select';
import styles from "./AddNewTreeForm.module.css";
import {getFilesByIds, getTypesOfTrees} from "../EditTreeForm/actions";

export default class AddNewTreeForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tree: {
                latitude: {
                    disabled: true,
                    title: 'Широта',
                    value: this.props.match.params.lat,
                    type: 'string'
                },
                longitude: {
                    disabled: true,
                    title: 'Долгота',
                    value: this.props.match.params.lng,
                    type: 'string'
                },
                age: {
                    title: 'Возраст (в годах)',
                    value: '',
                    type: 'number'
                },
                conditionAssessment: {
                    title: 'Визуальная оценка состония',
                    value: '',
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
                    value: '',
                    type: 'number'
                },
                heightOfTheFirstBranch: {
                    title: 'Высота первой ветви от земли (в метрах)',
                    value: '',
                    type: 'number'
                },
                numberOfTreeTrunks: {
                    title: 'Число стволов',
                    value: '',
                    type: 'number'
                },
                treeHeight: {
                    title: 'Высота (в метрах)',
                    value: '',
                    type: 'number'
                },
                species: {
                    title: 'Порода',
                    values: [],
                    value: '',
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
                    value: '',
                    loading: false
                },
                treePlantingType: {
                    title: 'Тип посадки дерева',
                    value: '',
                    type: 'number'
                },
                trunkGirth: {
                    title: 'Обхват самого толстого ствола (в сантиметрах)',
                    value: '',
                    type: 'number'
                },
                fileIds: [],
            },
            files: [],
            uploadingFiles: false
        };
    }

    sortTypesOfTrees (types) {
        return types
            .sort((first, second) => {
                if (first.title > second.title) return 1;
                if (first.title < second.title) return -1;
                return 0;
            })
    }

    handleAddTree = () => {
        const {tree} = this.state;
        const data = {
            geographicalPoint: {
                latitude: null,
                longitude: null
            }
        };

        Object.keys(tree).forEach(key => {
            if (Object.prototype.hasOwnProperty.call(tree[key], 'value')) {
                if (key === 'species') {
                    data[key] = {id: tree[key].value}
                } else if (key === 'latitude' || key === 'longitude') {
                    data.geographicalPoint[key] = tree[key].value;
                } else {
                    data[key] = tree[key].value;
                }
            } else {
                data[key] = tree[key];
            }
        })

        addTree(data)
            .then(_ => {
                alert('Дерево успешно добавлено!');
                this.props.history.goBack();
            })
            .catch(error => {
                alert('Ошибка при добавлении дерева');
                console.error('Ошибка при добавлении дерева', error);
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
                    console.log(tree[key], 'values');
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

    uploadFiles (files) {
        uploadFiles(files)
            .then(fileIds => {
                getFilesByIds(fileIds)
                    .then(files => {
                        this.setState({
                            files: this.state.files.concat(files),
                            tree: {
                                ...this.state.tree,
                                fileIds: this.state.tree.fileIds.concat(fileIds)
                            },
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

    getFileIdsAfterDelete (id) {
        const {tree} = this.state;
        return tree.fileIds.filter(fileId => fileId !== id);
    }

    handleDeleteFile = (id) => {
        this.setState({
            files: this.getFilesAfterDelete(id),
            tree: {
                ...this.state.tree,
                fileIds: this.getFileIdsAfterDelete(id)
            }
        });
    }

    renderFiles () {
        const {files, uploadingFiles} = this.state;

        return (
            <FileUpload
                files={files}
                onDelete={this.handleDeleteFile}
                onUpload={this.handleUploadFiles}
                uploading={uploadingFiles}
            />
        )
    }

    renderButtons () {
        return (
            <div className={styles.buttons}>
                <button onClick={this.handleAddTree} disabled={this.state.uploadingFiles} className={styles.addButton}>Добавить</button>
                <button onClick={this.props.history.goBack} className={styles.cancelButton}>Отмена</button>
            </div>
        )
    }


    render() {
        return (
            <div className={styles.formContainer}>
                <div className={styles.form}>
                    {this.renderMainInformation()}
                    {this.renderFiles()}
                    {this.renderButtons()}
                </div>
            </div>
        );
    }
};
