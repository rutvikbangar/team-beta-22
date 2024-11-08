import React, { useState } from "react";
import axios from 'axios';

export default function AichatBot() {
    const apiKey = import.meta.env.GEMINI_API_KEY;

   const generator = async () => {
           console.log('loading')
           const response = await fetch(
               `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`,{
                method:"POST",
               data: { "contents": [{ "parts": [{ "text": "Explain how AI works" }] }] }
           });
           console.log(response)
        
   };

   return (
       <div>
           <h1>Chat Bot</h1>
           <button onClick={generator}>Generate</button>
       </div>
   );
}
