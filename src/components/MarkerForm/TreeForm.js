import styles from "./TreeForm.module.css";
import React, { useState, useEffect } from 'react';
import { fetchData } from '../ApiDataLoadHelper/DataLoadHelper';
import cn from "classnames";

export const TreeForm = ({ activeTree }) => {
    const [treeImages, setTreeImages] = useState([]);

    useEffect(() => {
        activeTree &&
        fetchData(`https://ekb-trees-help.ru/api/file/byTree/${activeTree.id}`)
            .then((jsonData) => {
                setTreeImages(jsonData);
            })
            .catch(err => {
                alert("Возникла ошибка при загрузке фотографий дерева");
                console.log(err);
            })
    }, [activeTree]);

    let images = treeImages.map(e => <a target="_blank" href={`/image/${e.id}`}><img src={e.uri}/></a>)

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
                <div>
                    <span> Фотографии </span>
                    <div className={styles.imagesBlock}>
                        {images}
                    </div>
                </div>
            </figure>}
        </>)
};

export default TreeForm;
