import styles from "./TreeForm.module.css";
import React from "react";
import cn from "classnames";
import {NavLink} from "react-router-dom";

export const TreeForm = ({activeTree, onClose}) => {
    return (
        <figure className={styles.block}>
            <div className={styles.closeWrapper}><button className={styles.close}><i className="fa fa-times" /></button></div>
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
            </div>
            <div className={styles.navigation}>
                <NavLink to={`trees/tree=${activeTree?.id}`} className={styles.link} >Узнать подробнее</NavLink>
            </div>
        </figure>
    )
};

export default TreeForm;
