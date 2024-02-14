import SendIcon from '@mui/icons-material/Send';
import { useContext, useState } from 'react';
import { Appstate } from '../App';
import { MagnifyingGlass } from 'react-loader-spinner'
import OpenAI from "openai";

// Inputoutput
const Inputoutput = () => {

    // internet connection
    const [error,setError]=useState(false);
    const useAppState = useContext(Appstate);
    //    fetch data from api
    const openai = new OpenAI({ apiKey: process.env.REACT_APP_API_KEY, dangerouslyAllowBrowser: true });
    function ApiCall() {
        async function main() {

            try {
                useAppState.setLoder(true);
                const completion = await openai.chat.completions.create({
                    messages: [{ role: "user", content: useAppState.inputData }],
                    model: "gpt-3.5-turbo",
                });
                useAppState.setLoder(false);
                useAppState.setData(completion.choices[0].message.content);
            }
            catch(err){
                setError(true);
            }
            
        }
        main();
    }

    const handleKeyDown = (event) => {
        if(event.key==='Enter'){
            if(useAppState.inputData && !useAppState.isLoader)
                ApiCall();
        }
    }

    return (
        <>
            <div className="pb-20 pt-4 px-1 md:px-48 md:h-custom-height-41 h-custom-per-h">
                <div className={useAppState.isDark ? 'p-4 h-full overflow-y-auto shadow-md shadow-white rounded-md ' : 'p-4 h-full overflow-y-auto shadow-md shadow-black rounded-md'}>
                    {useAppState.isLoader ?
                        <p className='flex justify-center items-center flex-col h-full'>
                           
                            <MagnifyingGlass
                                visible={true}
                                height="180"
                                width="180"
                                ariaLabel="magnifying-glass-loading"
                                wrapperStyle={{}}
                                wrapperClass="magnifying-glass-wrapper"
                                glassColor="#c0efff"
                                color="#e15b64"
                                
                            />
                            {error?<h1 className='text-xl'>Please Check Your Internet Connection</h1>:<h1 className='text-xl'>Please wait... It may take time</h1>}
                          
                            
                        </p>

                        :
                        <pre className='text-pretty font-mono'>
                            <code>
                                {useAppState.data}
                            </code>
                        </pre>
                    }
                </div>
                <div className='flex items-center justify-between'>
                    <input type='text' className={useAppState.isDark ? 'w-full my-4 py-2 px-5 text-2xl text-white bg-gray-700 rounded-l-3xl outline-none' : 'w-full my-4 py-2 px-5 text-2xl text-black bg-white shadow-sm shadow-black rounded-l-3xl outline-none'} placeholder='Puchho jo maan kare....'
                        value={useAppState.inputData}
                        onChange={(event) => {
                            useAppState.setInput(event.target.value);
                            
                        }}
                        onKeyDown={handleKeyDown}
                    />

                    {
                        useAppState.inputData && !useAppState.isLoader ?
                            <button onClick={ApiCall}  className={useAppState.isDark ? 'w-12 bg-gray-700 h-12 rounded-r-3xl' : 'w-12 bg-white shadow-sm shadow-black h-12 rounded-r-3xl'}>
                                <SendIcon />
                            </button>
                            :
                            <button className={useAppState.isDark ? 'w-12 bg-gray-700 h-12 rounded-r-3xl' : 'w-12 bg-white shadow-sm shadow-black h-12 rounded-r-3xl'}
                                disabled
                            >
                                <SendIcon />
                            </button>
                    }
                </div>
            </div>
        </>
    )
}

export default Inputoutput;