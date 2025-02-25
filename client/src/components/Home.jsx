import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState({ title: "A Parking Spot", content: "A very good Parking Spot" });

  return (
    <div className="cards">
      <div className="card">
        <h1>{data.title}</h1>
        <p>{data.content}</p>
      </div>
      <br /><br /><br />
     
     
      <div className="card">
        <h1>{data.title}</h1>
        <p>{data.content}</p>
      </div>
      <br /><br /><br />
     
      <div className="card">
        <h1>{data.title}</h1>
        <p>{data.content}</p>
      </div>
      <br /><br /><br />
      
      <div className="card">
        <h1>{data.title}</h1>
        <p>{data.content}</p>
      </div>
      <br /><br /><br />
      
      <div className="card">
        <h1>{data.title}</h1>
        <p>{data.content}</p>
      </div>
      <br /><br /><br />
    
      <div className="card">
        <h1>{data.title}</h1>
        <p>{data.content}</p>
      </div>
      <br /><br /><br />
     
    </div>
  );
};

export default Home;
