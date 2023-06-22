import React, { useState, useEffect } from 'react';
import './GeneralStyling.css';
import './App.css';
import HelpMeDialog from './HelpMeDialog.jsx';
import Task from './Task.jsx';
import Header from "./components/Header";

import { useNavigate } from "react-router-dom";
import { Currency } from "@dataverse/runtime-connector";
import { useWallet, useStream } from "./hooks";
import ReactJson from "react-json-view";
// import { Model, StreamRecord } from "./types";
import { getModelByName } from "./utils";
import { useConfig } from "./context/configContext";


const App = () => {
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [loadRecipeData, setLoadRecipeData] = useState('');
  const [dishName, setDishName] = useState('<No Dish>');
  const [totalTime, setTotalTime] = useState('50min');
  const [steps, setSteps] = useState([
    { time: 1, description: 'hey 9ollef ' },
    { time: 2, description: '2' },
    { time: 3, description: '3' }
  ]);
  const navigate = useNavigate();
  const { output, appVersion } = useConfig();
  const [postModel, setPostModel] = useState();
  const [currentStreamId, setCurrentStreamId] = useState();
  const [publicPost, setPublicPost] = useState();



  const {
    pkh,
    createPublicStream,
  } = useStream();

  useEffect(() => {
    const postModel = getModelByName(`${output.createDapp.slug}_post`);
    setPostModel(postModel);
  }, [output]);

  useEffect(() => {
    // Perform any side effects or initialization logic here
  }, []);

  const handleRecipeDataChange = (event) => {
    setLoadRecipeData(event.target.value);
    event.preventDefault();
  };

  const loadSteps = () => {
    console.log("steps", steps)
    return steps.map((step, i) => (
      <Task
        key={i}
        step={i + 1}
        directions={step.description}
        first={i === 0}
        last={i === steps.length - 1}
      />
      
    ));
    
  };

  const loadRecipe = () => {
    if (loadRecipeData !== '') {
      const requestBody = { food: loadRecipeData };
      setLoading(true);

      fetch('http://localhost:3001/api/steps', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      })
        .then((response) => response.json())
        .then((data) => {
          const { name, steps } = data;
          console.log("this is ths data of steps", steps)
          const totalTime = steps.reduce((accumulator, step) => accumulator + Number(step.time), 0);
          console.log(totalTime);
          setDishName(name);
          setSteps(steps);
          setTotalTime(`${totalTime} Min`);
          setLoaded(true);
          
        });
        console.log("data", data)
    }
  };

  const data = loadSteps();
  console.log("text is as following", data)
  console.log("data description", data[0].props.directions)

  const formatStepsToString = () =>  {
    const steps = loadSteps();
    let formattedString = "";
  
    steps.forEach((step, index) => {
      console.log("this is what the loop have ", step )
      const stepNumber = index + 1;
      const stepText = step.props.directions;
      formattedString += `Step ${stepNumber}: ${stepText}\n`;
    });
  
    return formattedString;
  }
  
  const formattedSteps = formatStepsToString();
  console.log("formayyy", formattedSteps)

  const createPublicPost = async () => {
  
    if (!postModel) {
      console.error("postModel undefined");
      return;
    }

    const formattedSteps = formatStepsToString();

    console.log("logging formatted steps:", formattedSteps)

    const date = new Date().toISOString();
    const { streamId, ...streamRecord } = await createPublicStream({
      pkh,
      model: postModel,
      stream: {
        appVersion,
        text: formattedSteps,
        images: [
          "https://bafkreib76wz6wewtkfmp5rhm3ep6tf4xjixvzzyh64nbyge5yhjno24yl4.ipfs.w3s.link",
        ],
        videos: [],
        createdAt: date,
        updatedAt: date,
      },
    });

    setCurrentStreamId(streamId);
    setPublicPost(streamRecord );
  };

  if (!loaded) {
    return (
      <div className="grid" style={{ margin: '50px' }}>
        {!loading && (
          <>
            <span className="big-text human">Pick a dish:</span>
            <form style={{ margin: '50px auto 50px', display: 'grid' }}>
              <h3>Give me a recipe!</h3>
              <label>
                <textarea
                  type="text"
                  value={loadRecipeData}
                  onChange={handleRecipeDataChange}
                  className="box"
                >
                  {loadRecipeData}
                </textarea>
              </label>
            </form>
            <button onClick={loadRecipe} style={{ width: '100px', margin: 'auto' }}>
              Go!
            </button>
          </>
        )}
        {loading && (
          <>
            <img src="logo.png" alt="logo" className="loading-logo" />
            <br />
            <h1 className="loading-dots">Thinking</h1>
          </>
        )}
      </div>
    );
  } else {
    return (
      <>
      <Header />
        <div className="grid">
          <div style={{ width: 'min(700px, 80vw)', marginTop: '10px' }}>
            <br />
            <span className="big-text human">{dishName}</span>
          </div>
        
        </div>

        <div
          style={{
            width: '100%',
            marginTop: '50px',
            background: 'var(--background)',
            position: 'relative'
          }}
        >
          <div className="clock-container shadow">
            <img src="clock.png" alt="clock" width="5%" style={{ margin: '15px auto 0px' }} />
            <br />
            <span style={{ color: 'var(--primary)', margin: 'auto' }}>{totalTime}</span>
          </div>
          <div
            style={{
              width: '80%',
              margin: 'auto',
              textAlign: 'center',
              paddingTop: '100px'
            }}
          >
            {data}
          </div>
        </div>

        <div style={{ width: '100%', paddingBottom: '20px', position: 'fixed', bottom: '0' }}>
          <HelpMeDialog />
          <button onClick={createPublicPost}>createPublicPost</button>
        </div>

        <div style={{ height: '100px' }}></div>
      </>
    );
  }
};

export default App;
