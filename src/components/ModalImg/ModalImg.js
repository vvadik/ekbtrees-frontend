import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import './ModalImg.css';

export default class ModalImg extends Component{  
    render(){
        return ( 
                <Modal show={this.props.modalOpen} onHide={this.props.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Фото</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <img className="treeModal" src={this.props.modalData} alt="Tree"></img>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.handleClose}>
                            Закрыть
                        </Button>
                    </Modal.Footer>
                </Modal>
        )
    }
}