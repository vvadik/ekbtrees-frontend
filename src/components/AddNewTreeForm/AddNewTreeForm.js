import React, { Component } from 'react';
import { getTreeAddUrl, fetchData } from '../ApiDataLoadHelper/DataLoadHelper';
import "./AddNewTreeForm.css";

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
            <div className="addTreeFormBlockWrapper">
                <span className="addTreeFormBlockPrefix"> Геопозиция </span>
                <div className="geopositionWrapper">
                    <span className="geopositionItem">{lat}</span>
                    <span className="geopositionItem">{lng}</span>
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
            .map(item => <option className="addTreeFormBlockSelectOption" value={item.id}>{item.title}</option>);
    }

    renderMainInformation () {
        return (
            <figure className="addTreeFormBlock">
                {this.renderGEOPosition()}
                <div className="addTreeFormBlockWrapper">
                    <span className="addTreeFormBlockPrefix"> Порода </span>
                    <select name="species" className="addTreeFormBlockSelect" dir="rtl">
                        {this.renderTypesOfTrees()}
                    </select>
                </div>
                <div className="addTreeFormWrapperFlex">
                    <div className="addTreeFormBlockWrapper addTreeFormBlockWrapperDesktop">
                        <span className="addTreeFormBlockPrefix"> Высота (в метрах)</span>
                        <input name="treeHeight" className="addTreeFormBlockValue" type="number" min="1" max="50"/>
                    </div>
                    <div className="addTreeFormBlockWrapper addTreeFormBlockWrapperDesktop">
                        <span className="addTreeFormBlockPrefix">Диаметр кроны (в метрах)</span>
                        <input name="diameterOfCrown" className="addTreeFormBlockValue" type="number" min="1" max="50"/>
                    </div>
                    <div className="addTreeFormBlockWrapper addTreeFormBlockWrapperDesktop">
                        <span
                            className="addTreeFormBlockPrefix"> Обхват <wbr/> самого толстого ствола (в сантиметрах)</span>
                        <input name="trunkGirth" className="addTreeFormBlockValue" required type="number" min="1" max="10"/>
                    </div>
                    <div className="addTreeFormBlockWrapper addTreeFormBlockWrapperDesktop">
                        <span className="addTreeFormBlockPrefix"> Число стволов </span>
                        <input name="numberOfTreeTrunks" className="addTreeFormBlockValue" required type="number" min="1" max="5"
                               placeholder="1"/>
                    </div>
                    <div className="addTreeFormBlockWrapper addTreeFormBlockWrapperDesktop">
                        <span className="addTreeFormBlockPrefix"> Высота первой ветви от земли (в метрах)</span>
                        <input name="heightOfTheFirstBranch" className="addTreeFormBlockValue" type="number" min="1" max="50"/>
                    </div>
                    <div className="addTreeFormBlockWrapper addTreeFormBlockWrapperDesktop">
                        <span className="addTreeFormBlockPrefix"> Возраст (в годах)</span>
                        <input name="age" className="addTreeFormBlockValue" type="number" min="0"/>
                    </div>
                </div>
                <div className="addTreeFormBlockWrapper">
                    <span className="addTreeFormBlockPrefix">Визуальная  оценка состояния</span>
                    <select name="conditionAssessment" className="addTreeFormBlockSelect" dir="rtl">
                        <option value="1" className="addTreeFormBlockSelectOption">1/5</option>
                        <option value="2" className="addTreeFormBlockSelectOption">2/5</option>
                        <option value="3" className="addTreeFormBlockSelectOption">3/5</option>
                        <option value="4" className="addTreeFormBlockSelectOption">4/5</option>
                        <option value="5" className="addTreeFormBlockSelectOption">5/5</option>
                    </select>
                </div>
            </figure>
        )
    }

    renderFiles () {
        return (
            <figure className="addTreeFormBlock">
                <form className="addTreeFormBlockFile">
                    <input className="addTreeFormBlockFileItem" type="file" multiple name="upload" />
                </form>
            </figure>
        )
    }

    renderAdditionalInformation () {
        return (
            <figure className="addTreeFormBlock">
                <div className="addTreeFormWrapperFlex">
                <div className="addTreeFormBlockWrapper addTreeFormBlockWrapperDesktop">
                    <span className="addTreeFormBlockPrefix"> Автоназначаемый  идентификатор </span>
                    <input className="addTreeFormBlockValue" type="text" disabled value="10321"/>
                </div>
                <div className="addTreeFormBlockWrapper addTreeFormBlockWrapperDesktop">
                    <span className="addTreeFormBlockPrefix"> Статус дерева </span>
                    <select dir="rtl" className="addTreeFormBlockSelect">
                        <option className="addTreeFormBlockSelectOption"> Жив</option>
                        <option className="addTreeFormBlockSelectOption"> Цел</option>
                        <option className="addTreeFormBlockSelectOption"> Орел</option>
                    </select>
                </div>
                    <div className="addTreeFormBlockWrapper addTreeFormBlockWrapperDesktop">
                        <span className="addTreeFormBlockPrefix"> Дата и время  добавления  записи  </span>
                        <input name="created" className="addTreeFormBlockValue" type="datetime-local"/>
                    </div>
                    <div className="addTreeFormBlockWrapper addTreeFormBlockWrapperDesktop">
                        <span className="addTreeFormBlockPrefix"> Дата и время  последнего  редактирования  </span>
                        <input name="updated" className="addTreeFormBlockValue" type="datetime-local"/>
                    </div>
                </div>
                <div className="addTreeFormBlockWrapper">
                    <span className="addTreeFormBlockPrefix"> Ссылка на  автора </span>
                    <input name="user" className="addTreeFormBlockValue" type="email" autoCorrect="off" maxLength="60"/>
                </div>
            </figure>
        )
    }

    renderButtons () {
        return (
            <div className="addTreeFormButtons">
                <button disabled={!this.state.buttonEnable} className="addTreeFormAddButton" type="submit">Отправить</button>
                <button onClick={this.props.history.goBack} className="addTreeFormCancelButton" type="submit">Отмена</button>
            </div>
        )
    }


    render() {
        return (
            <div className="addTreeFormContainer">
                <h3 className="addTreeFormTitle"> Карточка дерева </h3>
                <div className="addTreeSubTitle"> пожалуйста, добавьте  всю информацию о дереве  </div>
                <h4 className="addTreeFormBlockTitle"> Основная информация</h4>
                <form className="addTreeForm" onSubmit={this.handleSubmit}>
                    {this.renderMainInformation()}
                    <h4 className="addTreeFormBlockTitle">Фотографии и файлы </h4>
                    {this.renderFiles()}
                    <h4 className="addTreeFormBlockTitle"> Дополнительная информация</h4>
                    {this.renderAdditionalInformation()}
                    {this.renderButtons()}
                </form>
            </div>
        );
    }
};
