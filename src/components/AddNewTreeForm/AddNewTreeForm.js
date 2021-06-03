import React, { Component } from 'react';
import { getTreeAddUrl, fetchData } from '../ApiDataLoadHelper/DataLoadHelper';
import styles from "./AddNewTreeForm.css";

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
            }
            else {
                alert("Возникла ошибка при попытке добавить дерево")
                console.log(response.status);
                console.log(json);
                this.setState({buttonEnable: true});
            }
        });
    }

    render() {
        const lat = this.props.match.params.lat;
        const lng = this.props.match.params.lng;
        const speciesValues = this.state.speciesValues
            .sort((first, second) => {
                if (first.title > second.title) return 1;
                if (first.title < second.title) return -1;
                return 0;
            })
            .map(item => <option value={item.id}>{item.title}</option>);

        return (
            <div class="add-tree-form-container">
                <h3 class="center h3"> Карточка дерева </h3>
                <div class="center p"> пожалуйста, добавьте  всю информацию о дереве  </div>
                <h4 class="center h4"> Основная информация</h4>
                <form onSubmit={this.handleSubmit}>
                    <figure class="main">
                        <label>
                            <span> Геопозиция </span>
                            <input name="geoposition" type="text" maxlength="10" disabled value = {`${lat}, ${lng}`}/>
                        </label>
                        <div>
                            <label>
                                <span> Порода </span>
                                <select name="species" dir="rtl">
                                    {speciesValues}
                                </select>
                            </label>
                        </div>
                        <div>
                            <label class="block">
                                <span> Высота в  метрах </span>
                                <label>
                                    <input name="treeHeight" type="number" min="1" max="50"/>
                                </label>
                                <label class="metric margin"> М </label>
                            </label>
                            <label class="block">
                                <span> Диаметр  кроны </span>
                                <label>
                                    <input name="diameterOfCrown" type="number" min="1" max="50"/>
                                </label>
                                <label class="metric margin"> М </label>
                            </label>
                        </div>
                        <div>
                            <label class="block">
                                <span> Обхват <wbr/> (самого  толстого)   ствола </span>
                                <label>
                                    <input name="trunkGirth" type="number" min="1" max="1000"/>
                                </label>
                                <label class="metric margincm"> СМ </label>
                            </label>
                            <label class="block">
                                <span> Число стволов </span>
                                <label>
                                    <input name="numberOfTreeTrunks" type="number" min="1" max="10"/>
                                </label>
                            </label>
                        </div>
                        <div>
                            <label class="block">
                                <span> Высота первой  ветви от земли  в метрах  </span>
                                <label>
                                    <input name="heightOfTheFirstBranch" type="number" min="1" max="50"/>
                                </label>
                                <label class="metric margin"> М </label>
                            </label>
                            <label class="block">
                                <span> Возраст в годах </span>
                                <input name="age" type="number" min="0"/>
                            </label>
                        </div>
                        <div>
                            <span> Визуальная  оценка   состояния </span>
                            <label>
                                <select name="conditionAssessment" dir="rtl">
                                    <option value="1"> 1/5</option>
                                    <option value="2"> 2/5 </option>
                                    <option value="3"> 3/5 </option>
                                    <option value="4"> 4/5 </option>
                                    <option value="5"> 5/5 </option>
                                </select>
                            </label>
                        </div>
                    </figure>
                    <h4 class="center h4"> фотографии и файлы </h4>
                    <figure class="main">
                        <div>
                        <form class="file">
                                <figure class="picture"> </figure>
                                <input type="file"  multiplie name="upload" class="fileform upload" />
                                <div class="fileform">
                                    <img src="/upload.png" class="center"/>
                                    <label class="fileformlabel"  id="fileformlabel"></label>
                                    <label class="selectbutton">Browse..</label>
                                </div>
                        </form>
                    </div>
                    </figure>
                    <h4 class="center h4"> Дополнительная информация</h4>
                    <figure class="main">
                        <div>
                            <label name="id" class="block">
                                <span> Автоназначаемый  идентификатор </span>
                                <label>
                                    <span class="identifier"> 10321 </span>
                                </label>
                            </label>
                            <label class="block">
                                <span> Статус дерева </span>
                                <select dir="rtl" class="status">
                                    <option> Жив </option>
                                    <option> Цел </option>
                                    <option> Орел </option>
                                </select>
                            </label>
                        </div>
                        <div>
                            <label class="block">
                                <span> Дата и время  добавления  записи  </span>
                                <label>
                                    <input name="created" type="datetime-local"/>
                                </label>
                            </label>
                            <label class="block">
                                <span> Дата и время  последнего  редактирования  </span>
                                <label>
                                    <input name="updated" type="datetime-local"/>
                                </label>
                            </label>
                        </div>
                        <div>
                            <span> Ссылка на  автора </span>
                            <label>
                                <input type="email" name="user" autocorrect="off" maxlength="60"/>  
                            </label>
                        </div>
                    </figure>
                    <div class="submit">
                        <input type="submit" value="Отправить" disabled={!this.state.buttonEnable}/>
                    </div>
                    <div class="cencel-button">
                        <input type="button" onClick={this.props.history.goBack} value="Отмена"/>
                    </div>
                </form>
            </div>
        );
    }
};