import cn from 'classnames';
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import MapContain from '../Map/MapContain';
import styles from './Home.module.css';
import './Map.css';

export default class Home extends Component {
  renderMobileSection() {
    return (
      <section className={styles.mobile}>
        <div className={styles.mapContainer}>
          <div className={styles.map}>
            <MapContain />
          </div>
        </div>
      </section>
    )
  }
  renderDesktopSection() {
    return (
      <section className={styles.desktop}>
        <div className={styles.flexSearchMap}>
          <div className={styles.search}>
            <div className={cn([styles.green, styles.searchBlock])} />
            <div>
              <div className={styles.containerSearch}>
                <span className={styles.icon}><i className="fa fa-search" /></span>
                <input type="search" id="search" className={styles.inputSearch} placeholder="Искать..." />
              </div>
            </div>
            <p className={styles.slogan}>Защитим деревья вместе</p>
            <p className={styles.regular}>
              Lorem ipsum, or lipsum as it is sometimes known, is dummy text
              used in laying out print, graphic or web designs.
                </p>
          </div>
          <div className={styles.desktopMap}>
            <div className={cn([styles.green, styles.mapBlock])} />
            <div>
              <div className={styles.mapContainer}>
                <div className={styles.map}>
                  <MapContain/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
  renderGetStartSection() {
    return (
      <section className={cn([styles.green, styles.getStart, styles.desktop])}>
        <div className={styles.getStartLeft}>
          <p className={cn([styles.regular, styles.bold])}>Готовы начать?</p>
          <p className={styles.regular}>Войдите или зарегистрируйтесь</p>
        </div>
        <div className={styles.getStartRight}>
          <NavLink className={styles.logInDesktop} exact to='/login' activeclassname="active">Войти</NavLink>
          <NavLink className={styles.signUpDesktop} exact to='/registration' activeclassname="active">Зарегистрироваться</NavLink>
        </div>
      </section>
    )
  }
  renderLastPartSection() {
    return (
      <section className={cn([styles.desktop, styles.lastPart])}>
        <div className={styles.flexContainer}>
          <div className={styles.leftPart}>
            <h3 className={cn([styles.aboutTrees, styles.regular, styles.bold])}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. </h3>
            <div className={styles.flexContainer}>
              <div className={styles.leftPart}>
                <i className={cn([styles.fas, "fa-box-open"])} />
                <p className={styles.regularSmall}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, officia ea delectus distinctio neque et eius accusantium ipsa enim eligendi?</p>
              </div>
              <div className={styles.rightPart}>
                <i className={cn([styles.fas, "fa-truck"])} />
                <p className={styles.regularSmall}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, officia ea delectus distinctio neque et eius accusantium ipsa enim eligendi?</p>
              </div>
            </div>
          </div>
          <div className={styles.rightPartImg}>
            <img src="https://i.artfile.ru/1600x1200_601604_[www.ArtFile.ru].jpg" alt="" width="100%" />
          </div>
        </div>
      </section>
    )
  }
  render() {
    return (
      <div>
        {this.renderMobileSection()}
        {this.renderDesktopSection()}
        {this.renderGetStartSection()}
        {this.renderLastPartSection()}
      </div>
    )
  }
}
