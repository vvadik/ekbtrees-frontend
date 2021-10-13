import cn from 'classnames';
import React, { Component } from 'react';
import {addTree, uploadFiles} from "./actions";
import FileUpload from "../FileUpload";
import TextField from '../TextField';
import Select from '../Select';
import styles from "./AddNewTreeForm.module.css";
import {getFilesByIds, getTypesOfTrees} from "../EditTreeForm/actions";
import {
    ResourceAction, INewTree, ITreePropertyValue,
    FileGroupType, IJsonTree, IGeographicalPoint, IFile
} from "../../common/types";
import { IAddNewTreeFormProps, IAddNewTreeFormState } from "./types";


export default class AddNewTreeForm extends Component<IAddNewTreeFormProps, IAddNewTreeFormState> {
    constructor(props: IAddNewTreeFormProps) {
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
                    type: 'number',
                    parse: (value: string) => parseInt(value, 10)
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
                    type: 'number',
                    parse: (value: string) => parseFloat(value)
                },
                heightOfTheFirstBranch: {
                    title: 'Высота первой ветви от земли (в метрах)',
                    value: '',
                    type: 'number',
                    parse: (value: string) => parseFloat(value)
                },
                numberOfTreeTrunks: {
                    title: 'Число стволов',
                    value: '',
                    type: 'number',
                    parse: (value: string) => parseInt(value, 10)
                },
                treeHeight: {
                    title: 'Высота (в метрах)',
                    value: '',
                    type: 'number',
                    parse: (value: string) => parseFloat(value)
                },
                speciesId: {
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
                    loading: false,
                    parse: this.toStr
                },
                treePlantingType: {
                    title: 'Тип посадки дерева',
                    value: '',
                    values: [
                        {
                            id: 1,
                            title: 'Культурная посадка'
                        },
                        {
                            id: 2,
                            title: 'Самосев'
                        }
                    ],
                    parse: this.toStr
                },
                trunkGirth: {
                    title: 'Обхват самого толстого ствола (в сантиметрах)',
                    value: '',
                    type: 'number',
                    parse: (value: string) => parseFloat(value)
                },
                fileIds: [],
            },
            files: [],
            images: [],
            uploadingFiles: false,
            uploadingImages: false
        };
    }

    sortTypesOfTrees (types: ITreePropertyValue[]) {
        return types
            .sort((first: ITreePropertyValue, second: ITreePropertyValue) => {
                if (first.title > second.title) return 1;
                if (first.title < second.title) return -1;
                return 0;
            })
    }

    toStr = (value: string, values: ITreePropertyValue[]) => {
        const item = values.find(item => item.id === value);
        return `${item ? item.title: ''}`;
    }

    handleAddTree = () => {
        const {tree} = this.state;

        const data: IJsonTree = {
            geographicalPoint: {
                latitude: null,
                longitude: null
            }
        };

        Object.keys(tree).forEach((key: string) => {
            let treeKey = key as keyof INewTree;
            if (treeKey == 'fileIds' || treeKey == 'speciesId') {
                // should be in else branch
                return;
            }
            if (Object.prototype.hasOwnProperty.call(tree[treeKey], 'value')) {
                // TODO: find other way to filter this case

                const {parse, value, values} = tree[treeKey];

                if (parse && !(treeKey === 'latitude' || treeKey === 'longitude')) {
                    data[treeKey] = parse(value, values);
                } else if (treeKey === 'latitude' || treeKey === 'longitude') {
                    if (!data.geographicalPoint) {
                        data.geographicalPoint = {
                            latitude: null,
                            longitude: null
                        };
                    }
                    data.geographicalPoint[treeKey as keyof IGeographicalPoint] = parseFloat(String(value));
                } else {
                    data[treeKey] = value;
                }
            } else {
                if (treeKey !== 'latitude' && treeKey !== 'longitude') {
                    data[treeKey] = tree[treeKey];
                }
            }
        })

        addTree(data as {geographicalPoint: {latitude: number | null, longitude: number | null}})
            .then(_ => {
                alert('Дерево успешно добавлено!');
                this.props.history.goBack();
            })
            .catch(error => {
                alert('Ошибка при добавлении дерева');
                console.error('Ошибка при добавлении дерева', error);
            });
    }

    handleChange = (fieldName: keyof INewTree) => (event: React.ChangeEvent<{name?: string | undefined, value: unknown}>) => {
        if (fieldName == 'fileIds') {
            // TODO: find other way to filter this case
            return;
        }
        const {tree} = this.state;
        tree[fieldName].value = event.target.value as string;

        this.setState({tree})
    }

    handleOpenSelect = (fieldId: string) => () => {
        const {tree} = this.state;

        if (fieldId === 'speciesId') {
            this.setState({
                tree: {
                    ...tree,
                    speciesId: {
                        ...tree.speciesId,
                        loading: true
                    }
                }
            }, () => {
                getTypesOfTrees()
                    .then((types: ITreePropertyValue[]) => {
                        this.setState({
                            tree: {
                                ...tree,
                                speciesId: {
                                    ...tree.speciesId,
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
                                speciesId: {
                                    ...tree.speciesId,
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

        const result: React.ReactNode[] = [];
        Object.keys(tree).forEach(key => {
            let treeKey = key as keyof INewTree;
            // TODO: find other way to filter this case
            if (treeKey == 'fileIds') {
                // should be in else branch
                return;
            }
            if (tree[treeKey]) {
                if (Object.prototype.hasOwnProperty.call(tree[treeKey], 'values')) {
                    result.push(
                        <div key={tree[treeKey].title} className={cn([styles.blockWrapper, styles.blockWrapperDesktop])} /*key={key}*/>
                            <Select
                                onChange={this.handleChange(treeKey)}
                                onOpen={this.handleOpenSelect(key)}
                                item={tree[treeKey]}
                                id={key}
                            />
                        </div>
                    )
                } else if (tree[treeKey].title) {
                    result.push(
                        <div key={tree[treeKey].title} className={cn([styles.blockWrapper, styles.blockWrapperDesktop])} /*key={key}*/>
                            <TextField
                                item={tree[treeKey]}
                                id={key}
                                onChange={this.handleChange(treeKey)}
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

    uploadFiles (files: (string | Blob)[], key: FileGroupType) {
        const camelCaseKey = key.charAt(0).toUpperCase() + key.slice(1) as "Files" | "Images";
        uploadFiles(files)
            .then(fileIds => {
                getFilesByIds(fileIds)
                    .then(files => {
                        let newState: IAddNewTreeFormState = {
                            [key]: (this.state[key] === undefined) ? files : (this.state[key] ?? []).concat(files),
                            tree: {
                                ...this.state.tree,
                                fileIds: this.state.tree.fileIds.concat(fileIds)
                            },
                            [`uploading${camelCaseKey}` as ResourceAction]: false
                        }
                        this.setState(newState)
                    })
                    .catch(error => {
                        this.setState({
                            tree: {
                                ...this.state.tree,
                            },
                            [`uploading${camelCaseKey}` as ResourceAction]: false
                        })

                        throw `Произошла ошибка при получении загруженных файлов/картинок ${error}`;
                    })
            })
            .catch(error => {
                this.setState({
                    tree: {
                        ...this.state.tree,
                    },
                    [`uploading${camelCaseKey}` as ResourceAction]: false
                })
                console.error('Ошибка при загрузке файлов/картинок', error)
            })
    }

    handleUploadFiles = (key: FileGroupType) => (files: File[]) => {
        const camelCaseKey = key.charAt(0).toUpperCase() + key.slice(1);

        this.setState({
            tree: {
                ...this.state.tree,
            },
            [`uploading${camelCaseKey}` as ResourceAction]: true
        }, () => this.uploadFiles(files, key));
    }

    getFilesAfterDelete (id: string | number) {
        const {files} = this.state;
        return files?.filter((file: IFile) => file.id !== id);
    }

    getFileIdsAfterDelete (id: string | number) {
        const {tree} = this.state;
        return tree.fileIds.filter((fileId: string | number) => fileId !== id);
    }

    handleDeleteFile = (key: FileGroupType) => (id: string | number) => {
        this.setState({
            // Removed second parameter, func getFilesAfterDelete (id: any) uses only id
            [key]: this.getFilesAfterDelete(id),
            tree: {
                ...this.state.tree,
                fileIds: this.getFileIdsAfterDelete(id)
            }
        });
    }

    renderFiles () {
        const {files, uploadingFiles} = this.state;

        return (
            <>
                <h3 className={styles.title}> Файлы </h3>
                <FileUpload
                    files={files ?? []}
                    onDelete={this.handleDeleteFile('files')}
                    onUpload={this.handleUploadFiles('files')}
                    uploading={uploadingFiles}
                />
            </>
        )
    }

    renderImages () {
        const {images, uploadingImages} = this.state;

        return (
            <>
                <h3 className={styles.title}> Картинки </h3>
                <FileUpload
                    files={images ?? []}
                    onDelete={this.handleDeleteFile('images')}
                    onUpload={this.handleUploadFiles('images')}
                    type="image"
                    uploading={uploadingImages}
                />
            </>
        )
    }

    renderButtons () {
        return (
            <div className={styles.buttons}>
                <button onClick={this.handleAddTree}
                        disabled={this.state.uploadingFiles}
                        className={styles.addButton}
                >
                    Добавить
                </button>
                <button
                    onClick={this.props.history.goBack}
                    className={styles.cancelButton}
                >
                    Отмена
                </button>
            </div>
        )
    }


    render() {
        return (
            <div className={styles.formContainer}>
                <div className={styles.form}>
                    {this.renderMainInformation()}
                    {this.renderImages()}
                    {this.renderFiles()}
                    {this.renderButtons()}
                </div>
            </div>
        );
    }
};