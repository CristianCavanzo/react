import React from 'react';

const useStorageListener = ({ sincronize }) => {
    const [storageChange, setStorageChange] = React.useState(false);
    React.useEffect(() => {
        window.addEventListener('storage', (change) => {
            if (change.key === 'TODOS_V1') {
                console.log('hubo cambios en TODOS_V1');
                setStorageChange(true);
            }
        });
    }, [storageChange]);

    const toggleShow = () => {
        sincronize();
        setStorageChange(false);
    };

    return { show: storageChange, toggleShow };
};

export { useStorageListener };
