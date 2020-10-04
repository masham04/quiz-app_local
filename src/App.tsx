import React, { useEffect, useState } from "react";
import { Quizcard } from "./components/Quizcard";
import { Header } from "./components/Header";
import { actualdata } from "./types/Quiztypes";
import material from './services/material.json';
import './App.css';


function App() {
   let [data, setdata] = useState <actualdata[]>([]);
   let [current, setcurrent] = useState(0);
   let [score, setscore] = useState(0);
   let [result, setresult] = useState(false);
  
useEffect(()=> {
  setdata(material);
},[])
  
  
if(!data.length) return <h1 className='load'>Loading...</h1>

const handler = (ev: React.FormEvent<EventTarget>, userAns: string) => {
  ev.preventDefault();
  const currentanswer = data[current].answer;
  if(userAns === currentanswer){
    setscore(++score);
    console.log('Passed')
  }
  else{
    console.log('Failed')
  }

  if(current !== data.length-1)
  setcurrent(++current);
  else{
    alert('Quiz Completed');
    setresult(true);

  }
  
}
if(result){
  if(score === data.length){
    return(
      <div className='container'>
          <div className='content'>
          <h1 className='result'>Result</h1>
          <h2 className='result'>Congratulation! You Score 5 out of 5.</h2>
          </div>
      </div>
    )
  }
  else{
    return(
      <div className='container'>
          <div className='content'>
          <h1 className='result'>Result</h1>
          <h3 className='result'>Your result is {score} out of {data.length}.</h3>
          </div>
      </div>
    )
  }
  
}





  return(
   <div> 
     <Header />
      <Quizcard question={data[current].question}
       options={data[current].options} callback={handler} />
   </div>
   )
}

export default App;
