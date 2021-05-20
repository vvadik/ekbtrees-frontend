import React, { Component } from 'react';
import styles from "./AddNewTreeForm.css";

export default class AddNewTreeForm extends Component {
    render() {
        return (
            <div class="add-tree-form-container">
                <h3 class="center h3"> Карточка дерева </h3>
                <div class="center p"> пожалуйста, добавьте  всю информацию о дереве  </div>
                <h4 class="center h4"> Основная информация</h4>
                <form>
                    <figure class="main">
                    <span> Геопозиция </span>
                        <label>
                            <input type="text" maxlength="10"/>
                        </label>
                        <div>
                            <span> Порода </span>
                            <label>
                                <select dir="rtl">
                                    <option> Дуб </option>
                                    <option> Клён </option>
                                    <option> Липа </option>
                                </select>
                            </label>
                        </div>
                        <div>
                            <label class="block">
                                <span> Высота в  метрах </span>
                                <label class="input-wrapper meter">
                                    <input type="number" min="1" max="50"/>
                                </label>
                            </label>
                            <label class="block">
                                <span> Диаметр  кроны </span>
                                <label class="input-wrapper meter">
                                    <input type="number" min="1" max="50"/>
                                </label>
                            </label>
                        </div>
                        <div>
                            <label class="block">
                                <span> Обхват <wbr/> (самого  толстого)   ствола </span>
                                <label class="input-wrapper centimeter">
                                    <input required type="number" min="1" max="10"/>
                                </label>
                            </label>
                            <label class="block">
                                <span> Число стволов </span>
                                <label>
                                    <input required type="number" min="1" max="5" placeholder="1"/>
                                </label>
                            </label>
                        </div>
                        <div>
                            <label class="block">
                                <span> Высота первой  ветви от земли  в метрах  </span>
                                <label  class="input-wrapper meterForBranch">
                                    <input required type="number" min="1" max="50"/>
                                </label>
                            </label>
                            <label class="block">
                                <span> Возраст в годах </span>
                                <input required type="number" min="0" max="100"/>
                            </label>
                        </div>
                        <div>
                            <span> Визуальная  оценка   состояния </span>
                            <label>
                                <select dir="rtl">
                                    <option> 1/5</option>
                                    <option> 2/5 </option>
                                    <option> 3/5 </option>
                                    <option> 4/5 </option>
                                    <option> 5/5 </option>
                                </select>
                            </label>
                        </div>
                        <div>
                            <span> Культурная  посадка   или самосев </span>
                            <label>
                                <select dir="rtl">
                                    <option> Культурная посадка </option>
                                    <option> Самосев</option>
                                </select>
                            </label>
                        </div>
                    </figure>
                    <h4 class="center h4"> фотографии и файлы </h4>
                    <figure class="main">
                        <div>
                        <form class="file">
                                <figure class="picture"> </figure>
                                <input type="file"  multiplie name="upload" class="fileform upload" onchange="getName(this.value, 'fileformlabel');" />
                                <div class="fileform">
                                    <label class="fileformlabel"  id="fileformlabel"></label>
                                    <label class="selectbutton">Browse..</label>
                                </div>
                        </form>
                    </div>
                    </figure>
                    <h4 class="center h4"> Дополнительная информация</h4>
                    <figure class="main">
                        <div>
                            <label class="block">
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
                                    <input type="datetime-local"/>
                                </label>
                            </label>
                            <label class="block">
                                <span> Дата и время  последнего  редактирования  </span>
                                <label>
                                    <input type="datetime-local"/>
                                </label>
                            </label>
                        </div>
                        <div>
                            <span> Ссылка на  автора </span>
                            <label>
                                <input type="email" name="login" autocorrect="off" maxlength="60"/>  
                            </label>
                        </div>
                    </figure>
                    <div class="submit">
                        <input type="submit" value="Отправить"/>
                    </div>
                </form>
            </div>
        );
    }
};