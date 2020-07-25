import React, { useState, useEffect } from "react";
import Donation from "./components/Donation";

function App() {
  const [DoLi,setDoLi] = useState([]);
  useEffect(() => {
    donatedApi().then((response) => {
      setDoLi(response);
      console.log(response);
    });
  });
  
  const donatedApi = async () => {
    console.log(123);
    const response = await fetch("/api/general_donation_data",{
      method: "GET",
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    });
    const body = await response.json();

    return body;
  };

  return (
    <>
    {
      DoLi.map((data)=>{
        return(
          <Donation title={data.title} author={data.author} content={data.content} raised={data.raised} goal={data.goal} />
        );
      })
    }
    </>
  );
}

export default App;
