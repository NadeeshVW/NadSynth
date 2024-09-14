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


    const delayPara =(index,nextWord) => {
        setTimeout(function (){
            setResultData(prev=>prev+nextWord);
        },75*index)
    }

    const newChat = () => {
        setloading(false)
        setshowResult(false)
    }

    const onSent = async (prompt) => {
        setResultData("");
        setloading(true);
        setshowResult(true);
    
        let userPrompt = prompt !== undefined ? prompt : input;
    
        // Array of possible questions about the creator
        const creatorQuestions = [
            "who created you",
            "who made you",
            "who is your creator",
            "who developed you",
            "who built you",
            "who designed you",
            "who is responsible for your creation",
            "who is behind your development",
            "who programmed you",
            "who wrote your code",
            "who engineered you",
            "who initiated your project",
            "who is your author",
            "who is the mastermind behind you",
            "who created this chatbot",
            "who is the genius who made you"
        ];
    
        // Check if the user prompt contains any of the creator questions
        const isCreatorQuestion = creatorQuestions.some(question =>
            userPrompt.toLowerCase().includes(question)
        );
    
        if (isCreatorQuestion) {
            setrecentPrompt(userPrompt);
            let customResponse = "I was created by Nadeesh Waluskar.";
            
            // Simulate typing effect for custom response
            let customResponseArray = customResponse.split(" ");
            for (let i = 0; i < customResponseArray.length; i++) {
                const nextWord = customResponseArray[i];
                delayPara(i, nextWord + " ");
            }
            setloading(false);
            setInput("");
            return;  // Skip API call if custom response is provided
        }
    
        // Proceed with the normal API call if no match for custom prompt
        setrecentPrompt(userPrompt);
        setpreviousPrompts(prev => [...prev, userPrompt]);
    
        let response = await runChat(userPrompt);
    
        let responseArray = response.split("**");
        let newResponse = "";
        for (let i = 0; i < responseArray.length; i++) {
            if (i === 0 || i % 2 !== 1) {
                newResponse += responseArray[i];
            } else {
                newResponse += "<b>" + responseArray[i] + "</b>";
            }
        }
    
        let newResponse2 = newResponse.split("*").join("<br>");
        let newResponseArray = newResponse2.split(" ");
        for (let i = 0; i < newResponseArray.length; i++) {
            const nextWord = newResponseArray[i];
            delayPara(i, nextWord + " ");
        }
        
        setloading(false);
        setInput("");
    };

    /*const onSent = async (prompt) => {
        setResultData("");
        setloading(true);
        setshowResult(true);
    
        let userPrompt = prompt !== undefined ? prompt : input;
    
        // Check if the user asks "Who created you?"
        if (userPrompt.toLowerCase().includes("who built you?")) {
            setrecentPrompt(userPrompt);
            let customResponse = "I was created by Nadeesh Waluskar.";
            
            // Simulate typing effect for custom response
            let customResponseArray = customResponse.split(" ");
            for (let i = 0; i < customResponseArray.length; i++) {
                const nextWord = customResponseArray[i];
                delayPara(i, nextWord + " ");
            }
            setloading(false);
            setInput("");
            return;  // Skip API call if custom response is provided
        }
    
        // Proceed with the normal API call if no match for custom prompt
        setrecentPrompt(userPrompt);
        setpreviousPrompts(prev => [...prev, userPrompt]);
    
        let response = await runChat(userPrompt);
    
        let responseArray = response.split("**");
        let newResponse = "";
        for (let i = 0; i < responseArray.length; i++) {
            if (i === 0 || i % 2 !== 1) {
                newResponse += responseArray[i];
            } else {
                newResponse += "<b>" + responseArray[i] + "</b>";
            }
        }
    
        let newResponse2 = newResponse.split("*").join("<br>");
        let newResponseArray = newResponse2.split(" ");
        for (let i = 0; i < newResponseArray.length; i++) {
            const nextWord = newResponseArray[i];
            delayPara(i, nextWord + " ");
        }
        
        setloading(false);
        setInput("");
    };*/

    /*const onSent = async(prompt) => {

        setResultData("")
        setloading(true)
        setshowResult(true)
        let response;
        if (prompt!==undefined) {
            response = await runChat(prompt);
            setrecentPrompt(prompt)
        }
        else{
            setpreviousPrompts(prev => [...prev, input ])
            setrecentPrompt(input);
            response =  await runChat(input)
        }
 
        let responseArray = response.split("**");
        let newResponse="" ;
        for(let i = 0; i< responseArray.length; i++){
            if(i===0 || i%2 !==1) {
                newResponse += responseArray[i];
            }
            else{
                newResponse += "<b>"+responseArray[i]+"</b>"
            }
        }
        let newResponse2 = newResponse.split("*").join("<br>");

        let newResponseArray = newResponse2.split(" ");
        for(let i = 0; i<newResponseArray.length; i++){
            const nextWord = newResponseArray[i];
            delayPara(i, nextWord + " ")
        }
        setloading(false)
        setInput("")
    };*/
    


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
        setInput,
        newChat
    };
    return(
        <Context.Provider value={contextValue}>
            {props.children}
            {/* {console.log("previousPrompts",previousPrompts)} */}
        </Context.Provider>

    )
}

export default ContextProvider;