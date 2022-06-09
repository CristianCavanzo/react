import React from 'react';
import { useStorageListener } from './useStorageListener';
import './withStorageListener.css';

const ChangeAlert = () => {
    const { show, toggleShow } = useStorageListener();
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

export { ChangeAlert };
