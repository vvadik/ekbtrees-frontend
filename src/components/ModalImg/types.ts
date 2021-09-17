import {MouseEventHandler} from "react";


export interface IModalImgProps {
    modalOpen: string | undefined;
    handleClose: MouseEventHandler<HTMLElement>;//(event: MouseEvent) => void;
    modalData: string | undefined;
}

export interface IModalImgState { }
