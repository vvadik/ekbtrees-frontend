import cn from 'classnames';
import React, { Component } from 'react';
import { getTreeAddUrl, fetchData } from '../ApiDataLoadHelper/DataLoadHelper';
import styles from "./AddNewTreeForm.module.css";

export default class AddNewTreeForm extends Component {
    constructor(props) {
        super(props);

        this.state = {speciesValues: [], buttonEnable: true, files: []};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeFilesInput = this.handleChangeFilesInput.bind(this);
    }

    componentDidMount() {
        fetchData("/api/species/get-all")
            .then((jsonData) => {
                this.setState({speciesValues: jsonData});
            });
    }

    handleChangeFilesInput(event) {
        this.setState({ files: event.target.files });
    }

    async handleSubmit(event) {
        event.preventDefault();
        this.setState({buttonEnable: false});

        const fileIds = await Promise.all(Array.from(this.state.files).map(async (file) => await this.uploadFile(file)));
        const formDataExcludedFields = ["created", "updated", "user", "species", "file"]
        const formData = new FormData(event.target);

        let data = {};
        formData.forEach((value, key) => {
            if (!formDataExcludedFields.includes(key)) {
                data[key] = value
            }
            if (key === "species") {
                data[key] = {"id": value}
            }
        });

        data["geographicalPoint"] = {
            "latitude": this.props.match.params.lat,
            "longitude": this.props.match.params.lng
        };

        data["fileIds"] = fileIds;
        data["title"] = 'title';

        const json = JSON.stringify(data);

        fetch(getTreeAddUrl(), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: json,
        })
            .then(response => {
                if (response.status === 201) {
                    alert("Дерево успешно добавлено");
                    this.props.history.goBack();
                } else {
                    alert("Возникла ошибка при попытке добавить дерево")
                    console.log(response.status);
                    console.log(json);
                    this.setState({buttonEnable: true});
                }
            });
    }

    async uploadFile(file) {
        const formData = new FormData();
        formData.append("file", file);

        let response = await fetch("/api/file/upload", {
            method: 'POST',
            body: formData
        });

        return await response.json();
    }

    renderGEOPosition () {
        const lat = this.props.match.params.lat;
        const lng = this.props.match.params.lng;

        return (
            <div className={styles.blockWrapper}>
                <span className={styles.blockPrefix}> Геопозиция </span>
                <div className={styles.geopositionWrapper}>
                    <span className={styles.geopositionItem}>{lat}</span>
                    <span className={styles.geopositionItem}>{lng}</span>
                </div>
            </div>
        )
    }

    renderTypesOfTrees () {
        return this.state.speciesValues
            .sort((first, second) => {
                if (first.title > second.title) return 1;
                if (first.title < second.title) return -1;
                return 0;
            })
            .map(item => <option className={styles.blockSelectOption} value={item.id}>{item.title}</option>);
    }

    renderMainInformation () {
        return (
            <figure className={styles.block}>
                {this.renderGEOPosition()}
                <div className={styles.blockWrapper}>
                    <span className={styles.blockPrefix}> Порода </span>
                    <select name="species" className={styles.blockSelect} dir="rtl">
                        {this.renderTypesOfTrees()}
                    </select>
                </div>
                <div className={styles.wrapperFlex}>
                    <div className={cn([styles.blockWrapper, styles.blockWrapperDesktop])}>
                        <span className={styles.blockPrefix}> Высота (в метрах)</span>
                        <input name="treeHeight" className={styles.blockValue} type="number" min="1" max="50"/>
                    </div>
                    <div className={cn([styles.blockWrapper, styles.blockWrapperDesktop])}>
                        <span className={styles.blockPrefix}>Диаметр кроны (в метрах)</span>
                        <input name="diameterOfCrown" className={styles.blockValue} type="number" min="1" max="50"/>
                    </div>
                    <div className={cn([styles.blockWrapper, styles.blockWrapperDesktop])}>
                        <span
                            className={styles.blockPrefix}> Обхват <wbr/> самого толстого ствола (в сантиметрах)</span>
                        <input name="trunkGirth" className={styles.blockValue} required type="number" min="1" max="200"/>
                    </div>
                    <div className={cn([styles.blockWrapper, styles.blockWrapperDesktop])}>
                        <span className={styles.blockPrefix}> Число стволов </span>
                        <input name="numberOfTreeTrunks" className={styles.blockValue} required type="number" min="1" max="50"
                               placeholder="1"/>
                    </div>
                    <div className={cn([styles.blockWrapper, styles.blockWrapperDesktop])}>
                        <span className={styles.blockPrefix}> Высота первой ветви от земли (в метрах)</span>
                        <input name="heightOfTheFirstBranch" className={styles.blockValue} type="number" min="1" max="50"/>
                    </div>
                    <div className={cn([styles.blockWrapper, styles.blockWrapperDesktop])}>
                        <span className={styles.blockPrefix}> Возраст (в годах)</span>
                        <input name="age" className={styles.blockValue} type="number" min="0"/>
                    </div>
                </div>
                <div className={styles.blockWrapper}>
                    <span className={styles.blockPrefix}>Визуальная  оценка состояния</span>
                    <select name="conditionAssessment" className={styles.blockSelect} dir="rtl">
                        <option value="1" className={styles.blockSelectOption}>1/5</option>
                        <option value="2" className={styles.blockSelectOption}>2/5</option>
                        <option value="3" className={styles.blockSelectOption}>3/5</option>
                        <option value="4" className={styles.blockSelectOption}>4/5</option>
                        <option value="5" className={styles.blockSelectOption}>5/5</option>
                    </select>
                </div>
            </figure>
        )
    }

    renderFiles () {
        return (
            <figure className={styles.block}>
                <form>
                    <input className={styles.blockFileItem} type="file" multiple name="file" onChange={this.handleChangeFilesInput}/>
                </form>
            </figure>
        )
    }

    renderAdditionalInformation () {
        return (
            <figure className={styles.block}>
                <div className={styles.wrapperFlex}>
                <div className={cn([styles.blockWrapper, styles.blockWrapperDesktop])}>
                    <span className={styles.blockPrefix}> Автоназначаемый  идентификатор </span>
                    <input className={styles.blockValue} type="text" disabled value="10321"/>
                </div>
                <div className={cn([styles.blockWrapper, styles.blockWrapperDesktop])}>
                    <span className={styles.blockPrefix}> Статус дерева </span>
                    <select dir="rtl" className={styles.blockSelect}>
                        <option className={styles.blockSelectOption}> Жив</option>
                        <option className={styles.blockSelectOption}> Цел</option>
                        <option className={styles.blockSelectOption}> Мертв</option>
                    </select>
                </div>
                    <div className={cn([styles.blockWrapper, styles.blockWrapperDesktop])}>
                        <span className={styles.blockPrefix}> Дата и время  добавления  записи  </span>
                        <input name="created" className={styles.blockValue} type="datetime-local"/>
                    </div>
                    <div className={cn([styles.blockWrapper, styles.blockWrapperDesktop])}>
                        <span className={styles.blockPrefix}> Дата и время  последнего  редактирования  </span>
                        <input name="updated" className={styles.blockValue} type="datetime-local"/>
                    </div>
                </div>
                <div className={styles.blockWrapper}>
                    <span className={styles.blockPrefix}> Ссылка на  автора </span>
                    <input name="user" className={styles.blockValue} type="email" autoCorrect="off" maxLength="60"/>
                </div>
            </figure>
        )
    }

    renderButtons () {
        return (
            <div>
                <button disabled={!this.state.buttonEnable} className={styles.addButton} type="submit">Отправить</button>
                <button onClick={this.props.history.goBack} className={styles.cancelButton}>Отмена</button>
            </div>
        )
    }


    render() {
        return (
            <div className={styles.formContainer}>
                <h3 className={styles.title}> Карточка дерева </h3>
                <div className={styles.subTitle}> пожалуйста, добавьте  всю информацию о дереве  </div>
                <h4 className={styles.blockTitle}> Основная информация</h4>
                <form className={styles.form} onSubmit={this.handleSubmit}>
                    {this.renderMainInformation()}
                    <h4 className={styles.blockTitle}>Фотографии и файлы </h4>
                    {this.renderFiles()}
                    {this.renderButtons()}
                </form>
            </div>
        );
    }
};
