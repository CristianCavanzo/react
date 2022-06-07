import React from 'react';
import { withStorageListener } from './withStorageListener';
import './withStorageListener.css';

const ChangeAlert = ({ show, toggleShow }) => {
    if (show) {
        return (
            <div className="ChangeAlert-bg">
                <div className="ChangeAlert-container">
                    <p>
                        Parece que cambiaste tus TODOs en otra pestaña o ventana
                    </p>
                    <button onClick={() => toggleShow(false)}>
                        Volver a cargar la información
                    </button>
                </div>
            </div>
        );
    } else {
        return null;
    }
};

const ChangeAlertWithStorage = withStorageListener(ChangeAlert);

export { ChangeAlertWithStorage };
