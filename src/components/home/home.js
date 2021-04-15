import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import MapContain from '../Map/MapContain';
import MapButton from '../MapButton';
import './Home.css';

export default class Home extends Component {
  renderMobileSection() {
    return (
      <section className="container-2 mobile">
        <div className="map-container">
          <div className="map">
            <MapContain url="Park.geojson" />
            <MapButton name="Вход" link='/' />
          </div>
        </div>
      </section>
    )
  }
  renderDesktopSection() {
    return (
      <section className="desktop">
        <div className="flex-search-map">
          <div className="search">
            <div className="green search-block"></div>
            <div className="box">
              <div className="container-search">
                <span className="icon"><i className="fa fa-search"></i></span>
                <input type="search" id="search" placeholder="Искать..." />
              </div>
            </div>
            <p className="slogan">Защитим деревья вместе</p>
            <p className="regular">
              Lorem ipsum, or lipsum as it is sometimes known, is dummy text
              used in laying out print, graphic or web designs.
                </p>
          </div>
          <div className="desktop-map">
            <div className="green map-block"></div>
            <div className="container-2">
              <div className="map-container">
                <div className="map">
                  <MapContain url="Park.geojson" />
                  <MapButton name="Вход" link='/' />
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
      <section className="green get-start desktop">
        <div className="get-start-left">
          <p className="regular bold">Готовы начать?</p>
          <p className="regular">Войдите или зарегистрируйтесь</p>
        </div>
        <div className="get-start-right">
          <NavLink className="log-in-desktop" exact to='/' activeclassname="active">Войти</NavLink>
          <NavLink className="sign-up-desktop" exact to='/registration' activeclassname="active">Зарегистрироваться</NavLink>
        </div>
      </section>
    )
  }
  renderLastPartSection() {
    return (
      <section className="desktop last-part">
        <div className="flex-container">
          <div className="left-part">
            <h3 className="about-trees regular bold">Lorem ipsum dolor, sit amet consectetur adipisicing elit. </h3>
            <div className="flex-container">
              <div className="left-part">
                <i className="fas fa-box-open"></i>
                <p className="regular-small">Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, officia ea delectus distinctio neque et eius accusantium ipsa enim eligendi?</p>
              </div>
              <div className="right-part">
                <i className="fas fa-truck"></i>
                <p className="regular-small">Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, officia ea delectus distinctio neque et eius accusantium ipsa enim eligendi?</p>
              </div>
            </div>
          </div>
          <div className="right-part-img">
            <img src="https://i.artfile.ru/1600x1200_601604_[www.ArtFile.ru].jpg" alt="" width="100%"></img>
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