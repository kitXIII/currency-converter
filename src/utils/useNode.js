import { useState, useCallback } from 'react';

const useNode = () => {
    const [node, setNode] = useState(null);
    const ref = useCallback((el) => {
        if (el !== null) {
            setNode(el);
        }
    }, []);
    return [node, ref];
};

export default useNode;
