import cn from "classnames";
import React, {Component} from 'react';
import styles from './EditTreeForm.module.css';
import {getUrlParamValueByKey} from '../../helpers/url';
import {getTree} from "./actions";
import Spinner from "../Spinner/Spinner";

export class EditTreeForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tree: null,
            loading: true
        }
    }

    componentDidMount() {
        const id = getUrlParamValueByKey('tree');

        if (id) {
            getTree(id)
                .then(tree => {
                    this.setState({
                        tree,
                        loading: false
                    })
                })
                .catch(error => {
                    console.error(error, 'Ошибка!')
                })
        }
    }


    handleSubmit(event) {
        // event.preventDefault();
        // this.setState({buttonEnable: false});
        //
        // const formDataExcludedFields = ["created", "updated", "user", "species"]
        // const formData = new FormData(event.target);
        //
        // let data = {};
        // formData.forEach((value, key) => {
        //     if (!formDataExcludedFields.includes(key)) {
        //         data[key] = value
        //     }
        //     if (key === "species") {
        //         data[key] = {"id": value}
        //     }
        // });
        //
        // data["geographicalPoint"] = {
        //     "latitude": this.props.match.params.lat,
        //     "longitude": this.props.match.params.lng
        // };
        //
        // const json = JSON.stringify(data);
        // fetch(getTreeAddUrl(), {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: json,
        // })
        //     .then(response => {
        //         if (response.status === 201) {
        //             alert("Дерево успешно добавлено");
        //             this.props.history.goBack();
        //         } else {
        //             alert("Возникла ошибка при попытке добавить дерево")
        //             console.log(response.status);
        //             console.log(json);
        //             this.setState({buttonEnable: true});
        //         }
        //     });
    }

    renderGEOPosition () {
        const {tree} = this.state;

        if (tree && tree.geographicalPoint) {
            const {latitude, longitude} = tree.geographicalPoint;

            return (
                <div className={styles.blockWrapper}>
                    <span className={styles.blockPrefix}> Геопозиция </span>
                    <div className={styles.geopositionWrapper}>
                        <span className={styles.geopositionItem}>{latitude}</span>
                        <span className={styles.geopositionItem}>{longitude}</span>
                    </div>
                </div>
            )
        }

        return null;
    }

    renderMainInformation () {
        const {age, conditionAssessment, diameterOfCrown, heightOfTheFirstBranch, treeHeight} = this.state.tree;
        return (
            <figure className={styles.block}>
                <div className={styles.wrapperFlex}>
                    <div className={cn([styles.blockWrapper, styles.blockWrapperDesktop])}>
                        <span className={styles.blockPrefix}> Высота (в метрах)</span>
                        <input name="treeHeight" defaultValue={treeHeight} className={styles.blockValue} type="number" min="1" max="50"/>
                    </div>
                    <div className={cn([styles.blockWrapper, styles.blockWrapperDesktop])}>
                        <span className={styles.blockPrefix}>Диаметр кроны (в метрах)</span>
                        <input defaultValue={diameterOfCrown} name="diameterOfCrown" className={styles.blockValue} type="number" min="1" max="50"/>
                    </div>
                    <div className={cn([styles.blockWrapper, styles.blockWrapperDesktop])}>
                        <span
                            className={styles.blockPrefix}> Обхват <wbr/> самого толстого ствола (в сантиметрах)</span>
                        <input name="trunkGirth" className={styles.blockValue} required type="number" min="1" max="10"/>
                    </div>
                    <div className={cn([styles.blockWrapper, styles.blockWrapperDesktop])}>
                        <span className={styles.blockPrefix}> Число стволов </span>
                        <input name="numberOfTreeTrunks" className={styles.blockValue} required type="number" min="1" max="5"
                               placeholder="1"/>
                    </div>
                    <div className={cn([styles.blockWrapper, styles.blockWrapperDesktop])}>
                        <span className={styles.blockPrefix}> Высота первой ветви от земли (в метрах)</span>
                        <input name="heightOfTheFirstBranch" defaultValue={heightOfTheFirstBranch} className={styles.blockValue} type="number" min="1" max="50"/>
                    </div>
                    <div className={cn([styles.blockWrapper, styles.blockWrapperDesktop])}>
                        <span className={styles.blockPrefix}> Возраст (в годах)</span>
                        <input name="age" defaultValue={age} className={styles.blockValue} type="number" min="0"/>
                    </div>
                    <div className={cn([styles.blockWrapper, styles.blockWrapperDesktop])}>
                        <span className={styles.blockPrefix}>Визуальная  оценка состояния</span>
                        <select defaultValue={conditionAssessment} name="conditionAssessment" className={styles.blockSelect} dir="rtl">
                            <option value="1" className={styles.blockSelectOption}>1/5</option>
                            <option value="2" className={styles.blockSelectOption}>2/5</option>
                            <option value="3" className={styles.blockSelectOption}>3/5</option>
                            <option value="4" className={styles.blockSelectOption}>4/5</option>
                            <option value="5" className={styles.blockSelectOption}>5/5</option>
                        </select>
                    </div>
                    <div className={cn([styles.blockWrapper, styles.blockWrapperDesktop])}>
                        <span className={styles.blockPrefix}> Статус дерева </span>
                        <select dir="rtl" className={styles.blockSelect}>
                            <option className={styles.blockSelectOption}> Жив</option>
                            <option className={styles.blockSelectOption}> Цел</option>
                            <option className={styles.blockSelectOption}> Орел</option>
                        </select>
                    </div>
                </div>
            </figure>
        )
    }

    renderFiles () {
        return (
            <>
                <h4 className={styles.blockTitle}>Фотографии и файлы </h4>
                <figure className={styles.block}>
                    <form>
                        <input className={styles.blockFileItem} type="file" multiple name="upload"/>
                    </form>
                </figure>
            </>
        )
    }

    renderForm () {
        const {loading} = this.state;

        if (loading) {
            return <Spinner />
        }

        return (
            <form className={styles.form} onSubmit={this.handleSubmit}>
                {this.renderMainInformation()}
                {this.renderFiles()}
                {this.renderButtons()}
            </form>
        )
    }

    renderButtons () {
        return (
            <div className={styles.buttons}>
                <button disabled={!this.state.buttonEnable} className={styles.addButton} type="submit">Редактировать</button>
                <button onClick={this.props.history.goBack} className={styles.cancelButton}>Отмена</button>
            </div>
        )
    }


    render() {
        return (
            <div className={styles.formContainer}>
                {this.renderForm()}
            </div>
        );
    }
}

export default EditTreeForm;
