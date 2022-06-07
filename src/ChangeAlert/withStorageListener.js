import React from 'react';

const withStorageListener = (WrappedComponent) => {
    return function WrappedComponentWithStorageListener(props) {
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
            props.sincronize();
            setStorageChange(false);
        };

        return (
            <WrappedComponent show={storageChange} toggleShow={toggleShow} />
        );
    };
};

export { withStorageListener };
