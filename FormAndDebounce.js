import React, { useRef } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

/*
  Instructions:
    part1:
    You're given the UI for a basic form. Your task is to 
    hook it all up using refs. 

    The `Focus X Input` buttons should focus that specific input
    field.

    The `Submit` button should log `name`, `email`, and `password`
    to the console.

    The `Reset` button should result all of the input fields to 
    empty strings.

    part2: 
    Develop a search tag with debounce functionality.
    Debouncing means that a function will not be called again until
    a certain amount of time has passed. So here the setsearch method
    is called repeatedly for every key stroke, instead it should
    be delayed by the time peroid mentioned in the debounce method (add some 
    console log to validate this no need to use any api mock). 
    It should avoid memory leaks and the solution provided should be scalable.
    
    For api integration create an account in https://developers.giphy.com/dashboard/
    Once you have got your API token refer the search api docs page

    eg: api endpoint
    https://api.giphy.com/v1/gifs/search?api_key=< your api token >&q=<search value>

    Display the result images below in a 4x4 grid box, you can choose any size of your preference

    NOTE: 
    do not use any external library like lodash

*/

function ReactForm() {
  const handleSubmit = (e) => {
          console.log(nameField.current.value);
            console.log(emailInput.current.value);
            console.log(passInput.current.value);
  };

  const handleReset = () => {
    nameField.current.value = "";
    emailInput.current.value = "";
    passInput.current.value = "";
  };

  const handleSearch = (value) => {
    // add your api logic here
    console.log('data: ', value[0]);
    const URL = "https://api.giphy.com/v1/gifs/search?api_key="+
    "MfwZLqWeh1YPrvrlULOqgzZfOlRkIR7r&q="+value[0];
    fetch(URL).then((response) => {
      console.log('response: ', response);
    });
  };

 
  const debounce = (callback, delay) => {
    // add your debounce logic here
    let timer;
    return function () {
      clearTimeout(timer);
      timer = setTimeout(() => {
        callback(arguments);
      }, delay);
    }
  };

  // do not modify this line
  const debouncedSearch = debounce(handleSearch, 1000);

  const nameField = useRef(null);
  const emailInput = useRef(null);
  const passInput = useRef(null);

  return (
    <React.Fragment>
      <div>
        <p>part 1</p>
        <label>
          Name:
          <input ref={nameField} placeholder="name" type="text" />
        </label>
        <label>
          Email:
          <input ref={emailInput} placeholder="email" type="text" />
        </label>
        <label>
          Password:
          <input ref={passInput} placeholder="password" type="text" />
        </label>
        <hr />
        <button
          onClick={() => {
            nameField.current.focus();
          }}
        >
          Focus Name Input
        </button>
        <button
          onClick={() => {
            emailInput.current.focus();
          }}
        >
          Focus Email Input
        </button>
        <button
          onClick={() => {
            passInput.current.focus();
          }}
        >
          Focus Password Input
        </button>
        <hr />
        <button onClick={() => {
            handleSubmit()
          }}>Submit</button>
        <button onClick={() => {
          handleReset()
        }}>Reset</button>
      </div>
      <div>
        <hr />
        <p>part 2</p>
        <label>
          Search:
          <input
            placeholder="search with debounce"
            type="text"
            // do not modify this line
            onChange={(e) => debouncedSearch(e.target.value)}
          />
        </label>
      </div>
    </React.Fragment>
  );
}
const rootElement = document.getElementById("root");
ReactDOM.render(<ReactForm />, rootElement);
