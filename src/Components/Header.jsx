import { MaterialUISwitch } from './MaterialUISwitch';
import { useContext } from 'react';
import { Appstate } from '../App';
const Header = () => {
    const useAppState = useContext(Appstate);
    return (
        <>
            <div className={useAppState.isDark ? "border-white p-4 flex justify-between border-b-2" : "border-black p-4 flex justify-between border-b-2"}>
                <h1 className="text-3xl text-red-700">ASK<span className="text-2xl text-blue-800">Anything</span></h1>
                <MaterialUISwitch onChange={({ target }) => useAppState.setDark(target.checked)} checked={useAppState.isDark} />
            </div>
        </>
    )
}

export default Header;
