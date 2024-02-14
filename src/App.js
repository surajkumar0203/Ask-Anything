import Header from "./Components/Header";
import Inputoutput from "./Components/Inputoutput";
import { createContext,useState } from 'react';



export const Appstate = createContext();
function App() {
  const [isDark,setDark]=useState(true);
  const [isLoader,setLoder]=useState(false);
  const [data,setData]=useState('');
  const [inputData,setInput]=useState('');
  const theme=document.querySelector("body").style;

    if(isDark){
      theme.color="white";
      theme.backgroundColor="black";
    }
    else{
      theme.color="black";
      theme.backgroundColor="white";
    }
  return (
    <Appstate.Provider value={{ isDark,setDark,isLoader,setLoder,data,setData,inputData,setInput }}>
      <div className='h-screen'>
        <Header />
        <Inputoutput/>
      </div>
    </Appstate.Provider>
  );
}

export default App;
