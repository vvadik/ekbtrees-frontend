import React, { Component } from 'react';
import "./AddNewTreeForm.css";

export default class AddNewTreeForm extends Component {
    render() {
        const lat = this.props.match.params.lat;
        const lng = this.props.match.params.lng;
        return (
            <div class="add-tree-form-container">
                <h3 class="center h3"> Карточка дерева </h3>
                <div class="center p"> пожалуйста, добавьте  всю информацию о дереве  </div>
                <h4 class="center h4"> Основная информация</h4>
                <form className="addTreeForm">
                    <figure class="main">
                        <label>
                            <span className="addTreeFormMainTitle"> Геопозиция </span>
                            <input type="text" maxlength="10" disabled value = {`${lat}, ${lng}`}/>
                        </label>
                        <div>
                            <label>
                                <span className="addTreeFormMainTitle"> Порода </span>
                                <select dir="rtl">
                                    <option> Дуб </option>
                                    <option> Клён </option>
                                    <option> Липа </option>
                                </select>
                            </label>
                        </div>
                        <div>
                            <label class="block">
                                <span className="addTreeFormMainTitle"> Высота (в метрах)</span>
                                <label>
                                    <input type="number" min="1" max="50"/>
                                </label>
                            </label>
                            <label className="block">
                                <span className="addTreeFormMainTitle">Диаметр кроны (в метрах)</span>
                                <label>
                                    <input type="number" min="1" max="50"/>
                                </label>
                            </label>
                        </div>
                        <div>
                            <label class="block">
                                <span className="addTreeFormMainTitle"> Обхват <wbr/> самого толстого ствола (в сантиметрах)</span>
                                <label>
                                    <input required type="number" min="1" max="10"/>
                                </label>
                            </label>
                            <label className="block">
                                <span className="addTreeFormMainTitle"> Число стволов </span>
                                <label>
                                    <input required type="number" min="1" max="5" placeholder="1"/>
                                </label>
                            </label>
                        </div>
                        <div>
                            <label className="block">
                                <span className="addTreeFormMainTitle"> Высота первой ветви от земли (в метрах)</span>
                                <label>
                                    <input required type="number" min="1" max="50"/>
                                </label>
                            </label>
                            <label className="block">
                                <span className="addTreeFormMainTitle"> Возраст (в годах)</span>
                                <input required type="number" min="0" max="100"/>
                            </label>
                        </div>
                        <div>
                            <span className="addTreeFormMainTitle">Визуальная  оценка состояния</span>
                            <label>
                                <select dir="rtl">
                                    <option>1/5</option>
                                    <option>2/5</option>
                                    <option>3/5</option>
                                    <option>4/5</option>
                                    <option>5/5</option>
                                </select>
                            </label>
                        </div>
                        <div>
                            <span className="addTreeFormMainTitle">Культурная  посадка или самосев</span>
                            <label>
                                <select dir="rtl">
                                    <option> Культурная посадка </option>
                                    <option> Самосев</option>
                                </select>
                            </label>
                        </div>
                    </figure>
                    <h4 className="center h4"> фотографии и файлы </h4>
                    <figure className="main">
                        <div>
                        <form className="file">
                                <figure className="picture"> </figure>
                                <input type="file"  multiplie name="upload" className="fileform upload" />
                                <div className="fileform">
                                    <img src="/upload.png" className="center"/>
                                    <label className="fileformlabel"  id="fileformlabel" />
                                    <label class="selectbutton">Browse..</label>
                                </div>
                        </form>
                    </div>
                    </figure>
                    <h4 className="center h4"> Дополнительная информация</h4>
                    <figure className="main">
                        <div>
                            <label className="block">
                                <span className="addTreeFormMainTitle"> Автоназначаемый  идентификатор </span>
                                <label>
                                    <span className="identifier"> 10321 </span>
                                </label>
                            </label>
                            <label className="block">
                                <span className="addTreeFormMainTitle"> Статус дерева </span>
                                <select dir="rtl" className="status">
                                    <option> Жив </option>
                                    <option> Цел </option>
                                    <option> Орел </option>
                                </select>
                            </label>
                        </div>
                        <div>
                            <label className="block">
                                <span className="addTreeFormMainTitle"> Дата и время  добавления  записи  </span>
                                <label>
                                    <input type="datetime-local"/>
                                </label>
                            </label>
                            <label className="block">
                                <span className="addTreeFormMainTitle"> Дата и время  последнего  редактирования  </span>
                                <label>
                                    <input type="datetime-local"/>
                                </label>
                            </label>
                        </div>
                        <div>
                            <span className="addTreeFormMainTitle"> Ссылка на  автора </span>
                            <label>
                                <input type="email" name="login" autoCorrect="off" maxLength="60"/>
                            </label>
                        </div>
                    </figure>
                    <div className="submit">
                        <input type="submit" value="Отправить"/>
                    </div>
                </form>
            </div>
        );
    }
};
