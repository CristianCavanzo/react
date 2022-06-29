import React from 'react';

const initialState = ({ initialValue }) => ({
    error: false,
    loading: true,
    item: initialValue,
    sincronizedItem: true,
});

const actionTypes = {
    ERROR: 'ERROR',
    SUCCESS: 'SUCCESS',
    SAVE: 'SAVE',
    SINCRONIZE: 'SINCRONIZE',
};

const reducer = (state, action) => {
    switch (action.type) {
        case actionTypes.ERROR:
            return {
                ...state,
                error: action.payload,
            };
        case actionTypes.SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                sincronizedItem: true,
                item: action.payload,
            };
        case actionTypes.SAVE:
            return {
                ...state,
                item: action.payload,
            };
        case actionTypes.SINCRONIZE:
            return {
                ...state,
                loading: true,
                sincronizedItem: false,
            };

        default:
            return {
                ...state,
            };
    }
};

function useLocalStorage(itemName, initialValue) {
    const [state, dispatch] = React.useReducer(
        reducer,
        initialState({ initialValue })
    );
    const { error, loading, item, sincronizedItem } = state;

    const onError = (error) => {
        dispatch({ type: actionTypes.ERROR, payload: error });
    };
    const onSuccess = (parsedItem) => {
        dispatch({ type: actionTypes.SUCCESS, payload: parsedItem });
    };

    const onSave = (item) => {
        dispatch({ type: actionTypes.SAVE, payload: item });
    };

    const onSincronize = () => {
        dispatch({ type: actionTypes.SINCRONIZE });
    };

    React.useEffect(() => {
        setTimeout(() => {
            try {
                const localStorageItem = localStorage.getItem(itemName);
                let parsedItem;

                if (!localStorageItem) {
                    localStorage.setItem(
                        itemName,
                        JSON.stringify(initialValue)
                    );
                    parsedItem = initialValue;
                } else {
                    parsedItem = JSON.parse(localStorageItem);
                }
                onSuccess(parsedItem);
            } catch (error) {
                onError(error);
            }
        }, 3000);
    }, [sincronizedItem]);

    const saveItem = (newItem) => {
        try {
            const stringifiedItem = JSON.stringify(newItem);
            localStorage.setItem(itemName, stringifiedItem);
            onSave(newItem);
        } catch (error) {
            onError(error);
        }
    };
    const sincronize = () => {
        onSincronize();
    };

    return {
        item,
        saveItem,
        loading,
        error,
        sincronize,
        sincronizedItem,
    };
}

export { useLocalStorage };
