import "./TreeForm.css";
import React from "react";

export const TreeForm = ({activeTree }) => {
    return (
        <>
        {activeTree &&
            <figure class="tree-form-main" onClick={e => e.stopPropagation()}>
                <h3 class="center h3"> Карточка дерева </h3>
                <form>
                        <label>
                            <span> Геопозиция </span>
                            <input type="text" maxlength="10" disabled value = {`${activeTree.geographicalPoint.latitude}, ${activeTree.geographicalPoint.longitude}`}/>
                        </label>
                        <div>
                            <span> Порода </span>
                            <label>
                                <input type="text" disabled value = {activeTree.species.title}/>
                            </label>
                        </div>
                        <div>
                            <label class="block">
                                <span> Высота в  метрах </span>
                                <label class="input-wrapper meter">
                                    <input type="number" min="1" max="50" value = {activeTree.treeHeight}/>
                                </label>
                                <label class="metric margin"> М </label>
                            </label>
                            <label class="block">
                                <span> Диаметр  кроны </span>
                                <label class="input-wrapper meter">
                                    <input type="number" min="1" max="50" disabled value = {activeTree.diameterOfCrown}/>
                                </label>
                                <label class="metric margin"> М </label>
                            </label>
                        </div>
                        <div>
                            <label class="block">
                                <span> Обхват <wbr/> (самого  толстого)   ствола </span>
                                <label class="input-wrapper centimeter">
                                    <input required type="number" min="1" max="10" disabled value = {activeTree.trunkGirth}/>
                                </label>
                                <label class="metric margincm"> СМ </label>
                            </label>
                            <label class="block">
                                <span> Число стволов </span>
                                <label>
                                    <input required type="number" min="1" max="5" placeholder="1" disabled value = {activeTree.numberOfTreeTrunks}/>
                                </label>
                            </label>
                        </div>
                        <div>
                            <label class="block">
                                <span> Высота первой  ветви от земли  в метрах  </span>
                                <label  class="input-wrapper meterForBranch">
                                    <input required type="number" min="1" max="50"  disabled value = {activeTree.heightOfTheFirstBranch}/>
                                </label>
                                <label class="metric margin"> М </label>
                            </label>
                            <label class="block">
                                <span> Возраст в годах </span>
                                <input required type="number" min="0" max="100" disabled value = {activeTree.age}/>
                            </label>
                        </div>
                        <div>
                            <span> Визуальная  оценка   состояния </span>
                            <label>
                                <input required type="text" disabled value = {activeTree.conditionAssessment}/>
                            </label>
                        </div>
                </form>
            </figure>}
        </>)
}