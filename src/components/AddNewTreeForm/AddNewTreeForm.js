import cn from 'classnames';
import React, { Component } from 'react';
import { getTreeAddUrl, fetchData } from '../ApiDataLoadHelper/DataLoadHelper';
import styles from "./AddNewTreeForm.module.css";

export default class AddNewTreeForm extends Component {
    constructor(props) {
        super(props);
        this.state = {speciesValues: [], buttonEnable: true};

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        fetchData("/api/species/get-all")
            .then((jsonData) => {
                this.setState({speciesValues: jsonData});
            });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({buttonEnable: false});

        const formDataExcludedFields = ["created", "updated", "user", "species"]
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

    renderGEOPosition () {
        const lat = this.props.match.params.lat;
        const lng = this.props.match.params.lng;

        return (
            <div className={styles.addTreeFormBlockWrapper}>
                <span className={styles.addTreeFormBlockPrefix}> Геопозиция </span>
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
            .map(item => <option className={styles.addTreeFormBlockSelectOption} value={item.id}>{item.title}</option>);
    }

    renderMainInformation () {
        return (
            <figure className={styles.addTreeFormBlock}>
                {this.renderGEOPosition()}
                <div className={styles.addTreeFormBlockWrapper}>
                    <span className={styles.addTreeFormBlockPrefix}> Порода </span>
                    <select name="species" className={styles.addTreeFormBlockSelect} dir="rtl">
                        {this.renderTypesOfTrees()}
                    </select>
                </div>
                <div className={styles.addTreeFormWrapperFlex}>
                    <div className={cn([styles.addTreeFormBlockWrapper, styles.addTreeFormBlockWrapperDesktop])}>
                        <span className={styles.addTreeFormBlockPrefix}> Высота (в метрах)</span>
                        <input name="treeHeight" className={styles.addTreeFormBlockValue} type="number" min="1" max="50"/>
                    </div>
                    <div className={cn([styles.addTreeFormBlockWrapper, styles.addTreeFormBlockWrapperDesktop])}>
                        <span className={styles.addTreeFormBlockPrefix}>Диаметр кроны (в метрах)</span>
                        <input name="diameterOfCrown" className={styles.addTreeFormBlockValue} type="number" min="1" max="50"/>
                    </div>
                    <div className={cn([styles.addTreeFormBlockWrapper, styles.addTreeFormBlockWrapperDesktop])}>
                        <span
                            className={styles.addTreeFormBlockPrefix}> Обхват <wbr/> самого толстого ствола (в сантиметрах)</span>
                        <input name="trunkGirth" className={styles.addTreeFormBlockValue} required type="number" min="1" max="10"/>
                    </div>
                    <div className={cn([styles.addTreeFormBlockWrapper, styles.addTreeFormBlockWrapperDesktop])}>
                        <span className={styles.addTreeFormBlockPrefix}> Число стволов </span>
                        <input name="numberOfTreeTrunks" className={styles.addTreeFormBlockValue} required type="number" min="1" max="5"
                               placeholder="1"/>
                    </div>
                    <div className={cn([styles.addTreeFormBlockWrapper, styles.addTreeFormBlockWrapperDesktop])}>
                        <span className={styles.addTreeFormBlockPrefix}> Высота первой ветви от земли (в метрах)</span>
                        <input name="heightOfTheFirstBranch" className={styles.addTreeFormBlockValue} type="number" min="1" max="50"/>
                    </div>
                    <div className={cn([styles.addTreeFormBlockWrapper, styles.addTreeFormBlockWrapperDesktop])}>
                        <span className={styles.addTreeFormBlockPrefix}> Возраст (в годах)</span>
                        <input name="age" className={styles.addTreeFormBlockValue} type="number" min="0"/>
                    </div>
                </div>
                <div className={styles.addTreeFormBlockWrapper}>
                    <span className={styles.addTreeFormBlockPrefix}>Визуальная  оценка состояния</span>
                    <select name="conditionAssessment" className={styles.addTreeFormBlockSelect} dir="rtl">
                        <option value="1" className={styles.addTreeFormBlockSelectOption}>1/5</option>
                        <option value="2" className={styles.addTreeFormBlockSelectOption}>2/5</option>
                        <option value="3" className={styles.addTreeFormBlockSelectOption}>3/5</option>
                        <option value="4" className={styles.addTreeFormBlockSelectOption}>4/5</option>
                        <option value="5" className={styles.addTreeFormBlockSelectOption}>5/5</option>
                    </select>
                </div>
            </figure>
        )
    }

    renderFiles () {
        return (
            <figure className={styles.addTreeFormBlock}>
                <form>
                    <input className={styles.addTreeFormBlockFileItem} type="file" multiple name="upload" />
                </form>
            </figure>
        )
    }

    renderAdditionalInformation () {
        return (
            <figure className={styles.addTreeFormBlock}>
                <div className={styles.addTreeFormWrapperFlex}>
                <div className={cn([styles.addTreeFormBlockWrapper, styles.addTreeFormBlockWrapperDesktop])}>
                    <span className={styles.addTreeFormBlockPrefix}> Автоназначаемый  идентификатор </span>
                    <input className={styles.addTreeFormBlockValue} type="text" disabled value="10321"/>
                </div>
                <div className={cn([styles.addTreeFormBlockWrapper, styles.addTreeFormBlockWrapperDesktop])}>
                    <span className={styles.addTreeFormBlockPrefix}> Статус дерева </span>
                    <select dir="rtl" className={styles.addTreeFormBlockSelect}>
                        <option className={styles.addTreeFormBlockSelectOption}> Жив</option>
                        <option className={styles.addTreeFormBlockSelectOption}> Цел</option>
                        <option className={styles.addTreeFormBlockSelectOption}> Орел</option>
                    </select>
                </div>
                    <div className={cn([styles.addTreeFormBlockWrapper, styles.addTreeFormBlockWrapperDesktop])}>
                        <span className={styles.addTreeFormBlockPrefix}> Дата и время  добавления  записи  </span>
                        <input name="created" className={styles.addTreeFormBlockValue} type="datetime-local"/>
                    </div>
                    <div className={cn([styles.addTreeFormBlockWrapper, styles.addTreeFormBlockWrapperDesktop])}>
                        <span className={styles.addTreeFormBlockPrefix}> Дата и время  последнего  редактирования  </span>
                        <input name="updated" className={styles.addTreeFormBlockValue} type="datetime-local"/>
                    </div>
                </div>
                <div className={styles.addTreeFormBlockWrapper}>
                    <span className={styles.addTreeFormBlockPrefix}> Ссылка на  автора </span>
                    <input name="user" className={styles.addTreeFormBlockValue} type="email" autoCorrect="off" maxLength="60"/>
                </div>
            </figure>
        )
    }

    renderButtons () {
        return (
            <div>
                <button disabled={!this.state.buttonEnable} className={styles.addTreeFormAddButton} type="submit">Отправить</button>
                <button onClick={this.props.history.goBack} className={styles.addTreeFormCancelButton} type="submit">Отмена</button>
            </div>
        )
    }


    render() {
        return (
            <div className={styles.addTreeFormContainer}>
                <h3 className={styles.addTreeFormTitle}> Карточка дерева </h3>
                <div className={styles.addTreeSubTitle}> пожалуйста, добавьте  всю информацию о дереве  </div>
                <h4 className={styles.addTreeFormBlockTitle}> Основная информация</h4>
                <form className={styles.addTreeForm} onSubmit={this.handleSubmit}>
                    {this.renderMainInformation()}
                    <h4 className={styles.addTreeFormBlockTitle}>Фотографии и файлы </h4>
                    {this.renderFiles()}
                    <h4 className={styles.addTreeFormBlockTitle}> Дополнительная информация</h4>
                    {this.renderAdditionalInformation()}
                    {this.renderButtons()}
                </form>
            </div>
        );
    }
};
