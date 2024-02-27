import React from "react"
import { Modal } from "react-bootstrap"

export default function ModalDialog({show, onClose,children}){
    <Modal show={show} onHide={onClose}>
    <Modal.Body>
        {children}
    </Modal.Body>
   
</Modal>
}