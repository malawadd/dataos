import React, { useState, useEffect } from 'react';
import './GeneralStyling.css';
import './App.css';
import HelpMeDialog from './HelpMeDialog.jsx';
import Task from './Task.jsx';
import Header from "./components/Header";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(true);
  const [loadRecipeData, setLoadRecipeData] = useState('');
  const [dishName, setDishName] = useState('<No Dish>');
  const [totalTime, setTotalTime] = useState('50min');
  const [steps, setSteps] = useState([
    { time: 1, description: '1' },
    { time: 2, description: '2' },
    { time: 3, description: '3' }
  ]);

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
        </div>

        <div style={{ height: '100px' }}></div>
      </>
    );
  }
};

export default App;
