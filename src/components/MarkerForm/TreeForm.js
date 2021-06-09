import styles from "./TreeForm.module.css";
import React from "react";
import cn from "classnames";

export const TreeForm = ({activeTree }) => {
    return (
        <>
        {activeTree &&
            <figure className={styles.treeFormMain} onClick={e => e.stopPropagation()}>
                <h3 className={cn([styles.center, styles.h3])}> Карточка дерева </h3>
                <form>
                        <label>
                            <span> Геопозиция </span>
                            <input type="text" maxLength="10" disabled value = {`${activeTree.geographicalPoint.latitude}, ${activeTree.geographicalPoint.longitude}`}/>
                        </label>
                        <div>
                            <span> Порода </span>
                            <label>
                                <input type="text" disabled value = {activeTree.species.title}/>
                            </label>
                        </div>
                        <div>
                            <label className={styles.block}>
                                <span> Высота в  метрах </span>
                                <label className={styles.inputWrapper}>
                                    <input type="number" min="1" max="50" value = {activeTree.treeHeight}/>
                                </label>
                                <label className={cn([styles.metric, styles.margin])}> М </label>
                            </label>
                            <label className={styles.block}>
                                <span> Диаметр  кроны </span>
                                <label className={styles.inputWrapper}>
                                    <input type="number" min="1" max="50" disabled value = {activeTree.diameterOfCrown}/>
                                </label>
                                <label className={cn([styles.metric, styles.margin])}> М </label>
                            </label>
                        </div>
                        <div>
                            <label className={styles.block}>
                                <span> Обхват <wbr/> (самого  толстого)   ствола </span>
                                <label className={styles.inputWrapper}>
                                    <input required type="number" min="1" max="10" disabled value = {activeTree.trunkGirth}/>
                                </label>
                                <label className={cn([styles.metric, styles.margincm])}> СМ </label>
                            </label>
                            <label className={styles.block}>
                                <span> Число стволов </span>
                                <label>
                                    <input required type="number" min="1" max="5" placeholder="1" disabled value = {activeTree.numberOfTreeTrunks}/>
                                </label>
                            </label>
                        </div>
                        <div>
                            <label className={styles.block}>
                                <span> Высота первой  ветви от земли  в метрах  </span>
                                <label  className={styles.inputWrapper}>
                                    <input required type="number" min="1" max="50"  disabled value = {activeTree.heightOfTheFirstBranch}/>
                                </label>
                                <label className={cn([styles.metric, styles.margin])}> М </label>
                            </label>
                            <label className={styles.block}>
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
};

export default TreeForm;
