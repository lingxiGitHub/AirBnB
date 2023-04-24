// frontend/src/components/Navigation/OpenModalMenuItem.js
import React from 'react';
import { useModal } from '../../context/Modal';
import { useState } from 'react';

function OpenModalMenuItem({
    modalComponent, // component to render inside the modal
    itemText, // text of the menu item that opens the modal
    onItemClick, // optional: callback function that will be called once the menu item that opens the modal is clicked
    onModalClose, // optional: callback function that will be called once the modal is closed
    // className
}) {
    const { setModalContent, setOnModalClose } = useModal();
    // const {className, setClassName} = useState()


    const onClick = () => {
        if (onModalClose) setOnModalClose(onModalClose);
        setModalContent(modalComponent);
        if (onItemClick) onItemClick();
     
    };

    return (
        <li onClick={onClick}>{itemText}</li>
    );
}

export default OpenModalMenuItem;