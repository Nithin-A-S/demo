import OpenAI from "openai";


const openai = new OpenAI({
  organization: 'org-5MTFRBr2wWnQv576FlbNrZVf',
  apiKey: 'Mfewefpief;iwpidlbjsbdfwefuwefkbwefwe'
});



async function callApi() {
  
}
callApi()
const express = require('express')
const app=express()
const port=3000
app.post('/',async(req,res)=>{
    const{message}=req.body;
    console.log(message)
    // const response = await openai.completions.create({
    //     model: "davinci-002",
    //     prompt: "Say this is a test.",
    //     max_tokens: 7,
    //     temperature: 0,
    //   });
    
    //   console.log(response.data.choices[0].text);
      res.json({
        // data:response.data
        data: message,
    })
});
app.listen(port,()=>{
    console.log('applistneing: ${port}')
});