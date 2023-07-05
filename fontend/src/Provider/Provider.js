import { useState, createContext } from 'react';
export const Context = createContext();
function Provider({ children }) {
    const [isLogin, setIsLogin] = useState(false);
    return <Context.Provider value={[isLogin, setIsLogin]}>{children}</Context.Provider>;
}
export default Provider;
