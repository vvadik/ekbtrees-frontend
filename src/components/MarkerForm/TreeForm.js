import styles from "./TreeForm.module.css";
import React from "react";
import cn from "classnames";
import {NavLink} from "react-router-dom";

export const TreeForm = ({activeTree, onClose}) => {
    return (
        <figure className={styles.block}>
            <h3 className={styles.title}> Карточка дерева </h3>
            <div className={styles.wrapperFlex}>
                <div className={cn([styles.blockWrapper, styles.blockWrapperDesktop])}>
                    <span className={styles.blockPrefix}> Порода</span>
                    <input className={styles.blockValue} type="text" disabled value={activeTree?.species?.title}/>
                </div>
                <div className={cn([styles.blockWrapper, styles.blockWrapperDesktop])}>
                    <span className={styles.blockPrefix}>Визуальная  оценка состояния</span>
                    <input className={styles.blockValue} type="text" disabled value = {activeTree?.conditionAssessment}/>
                </div>
                <div className={cn([styles.blockWrapper, styles.blockWrapperDesktop])}>
                    <span className={styles.blockPrefix}> Высота (в метрах)</span>
                    <input className={styles.blockValue} type="text" disabled value = {activeTree?.treeHeight} />
                </div>
                <div className={cn([styles.blockWrapper, styles.blockWrapperDesktop])}>
                    <span className={styles.blockPrefix}>Диаметр кроны (в метрах)</span>
                    <input className={styles.blockValue} type="text" disabled value = {activeTree?.diameterOfCrown} />
                </div>
                {/*<div className={cn([styles.blockWrapper, styles.blockWrapperDesktop])}>*/}
                {/*    <span*/}
                {/*        className={styles.blockPrefix}> Обхват <wbr/> самого толстого ствола (в сантиметрах)</span>*/}
                {/*    <input className={styles.blockValue} disabled type="text" value = {activeTree.trunkGirth} />*/}
                {/*</div>*/}
                {/*<div className={cn([styles.blockWrapper, styles.blockWrapperDesktop])}>*/}
                {/*    <span className={styles.blockPrefix}> Число стволов </span>*/}
                {/*    <input className={styles.blockValue} type="text" disabled value = {activeTree.numberOfTreeTrunks}/>*/}
                {/*</div>*/}
                {/*<div className={cn([styles.blockWrapper, styles.blockWrapperDesktop])}>*/}
                {/*    <span className={styles.blockPrefix}> Высота первой ветви от земли (в метрах)</span>*/}
                {/*    <input className={styles.blockValue} type="text" disabled value = {activeTree.heightOfTheFirstBranch}/>*/}
                {/*</div>*/}
                {/*<div className={cn([styles.blockWrapper, styles.blockWrapperDesktop])}>*/}
                {/*    <span className={styles.blockPrefix}> Возраст (в годах)</span>*/}
                {/*    <input className={styles.blockValue} type="text" min="0" disabled value = {activeTree.age}/>*/}
                {/*</div>*/}
            </div>
            <div className={styles.navigation}>
                <NavLink to={`trees/tree=${activeTree?.id}`} className={styles.link} >Узнать подробнее</NavLink>
                <button className={styles.close} onClick={onClose}>Зыкрыть</button>
            </div>
        </figure>
    )
};

export default TreeForm;
