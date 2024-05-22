import { createContext, useState } from "react";

import runChat from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {

    const [input, setInput] = useState("");
    const [recentPrompt, setrecentPrompt] = useState("");
    const [previousPrompts, setpreviousPrompts] = useState([]);
    const [showResult, setshowResult] = useState(false);
    const [loading, setloading] = useState(false);
    const [ResultData, setResultData] = useState("");




    const onSent = async(prompt) => {

        setResultData("")
        setloading(true)
        setshowResult(true)
        setrecentPrompt(input)
        const response =  await runChat(input)
        setResultData(response)
        setloading(false)
        setInput(""

        )
    };
    


    const contextValue = {
        previousPrompts,
        setpreviousPrompts,
        onSent,
        setrecentPrompt,
        recentPrompt,
        showResult,
        loading,
        ResultData,
        input,
        setInput
    };
    return(
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>

    )
}

export default ContextProvider;