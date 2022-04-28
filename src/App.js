// import logo from './logo.svg';
// import './App.css';
import Wrapper from './components/Wrapper.js';
import ButtonBox from './components/ButtonBox.js';
import Display from './Display.js';
import Buttons from './components/Buttons.js';
import { useState } from 'react';


const btnDigits = ["MS","MC","MR","M+","M-","(", ")", "+/-", "/", "%", 7, 8, 9, "*", "√", 4, 5, 6, "-", "AC", 1, 2, 3, "+", "C", 0, ".", "="];
var dotCount = 0;

function App() {

  const [display, setDisplay] = useState('0');
  const [memory, newMemory] = useState('0');


  //function for numbers except 0
  function handleBtnPress(text){
    if(display === '0'){
      setDisplay(text);
    }else{
      setDisplay(`${display}${text}`);
    }
  }

  function handleDotPress(text) {
    //decimal place. If there's already a decimal place, ignore the button press
    if(dotCount === 1){
      //this space for rent.
    }else{
      //add a decimal to the formula, and make it so you can't do it again
      setDisplay(`${display}${text}`);
      dotCount = 1;
    }
  }

  function handleClearPress(text) {
    //backspace 1 digit (for mistakes)
    if(display === '0'){
      //this space for rent
    }else{
      if (display.length === 1 ) {
        setDisplay('0')
      } else {
      setDisplay(display.slice(0,-1));
      }
    }
  }


  function handleAllClearPress(text) {
    //clear all.
    setDisplay("0");
    dotCount = 0;
  }

  function handleSignPress(text) {
    setDisplay(`${display} ${text} `);
    //resets the decimal counter back to 0 to allow another argument with a decimal place.
    dotCount = 0;
}

  function handleBracketPress(text) {
    if(display === '0'){
    } else{
      setDisplay(`${display}${text}`);
    }
  }

  function handleSwitchPress(text) {
    if(display === '0'){
      setDisplay("0");
    }else{
      setDisplay((display) * -1);
    }
  }

  function handleSqrRtPress(text) {
    if(display <= '0'){
      setDisplay("EEE");
    }else{
      const square = (Math.sqrt(display));
      setDisplay(square);
        //This checks to see if the resulting nubmer contains a decimal place and sets the dot number (prevents a decimal being added to a result with a decimal already there)
        if(Number.isInteger(square)){
          dotCount = 0;
        } else {
          dotCount = 1 ;
        }
      }
   }


  function handleEqualsPress(text) {
    const toNumber = Function("return " + (display))();
    setDisplay(`${toNumber}`);
    //This checks to see if the resulting nubmer contains a decimal place and sets the dot number (prevents a decimal being added to a result with a decimal already there)
    if(Number.isInteger(toNumber)){
      dotCount = 0;
    } else {
      dotCount = 1 ;
    }
  }

  function handlePercentPress(text) {
    if(display === '0'){
      setDisplay('EEE');
    }else{
      const pct = (display / 100);
      setDisplay(pct);
          //This checks to see if the resulting nubmer contains a decimal place and sets the dot number (prevents a decimal being added to a result with a decimal already there)
    if(Number.isInteger(pct)){
      dotCount = 0;
    } else {
      dotCount = 1 ;
    }
    }
  }

  //ask about why this doesn't work.
  function handleZeroPress(text){
    if(display === '0' || display === '' ){
      setDisplay('0');
    } else {
      setDisplay(`${display}${text}`);
  }
}

  function handleMemoryStore(text) {
    newMemory(display);
  }

  function handleMemoryClear(text) {
    newMemory('0');
  }

  function handleMemoryRecall(text) {
    if(display === '0'){
    setDisplay(memory);
    } else
    setDisplay(`${display}${memory}`);
  }

  function handleMemoryAdd(text) {
    const toMemory = Function("return " + (`${display}+${memory}`))();
    newMemory(toMemory);
    // newMemory(eval(`${display}+${memory}`))    
  }


  function handleMemorySubtract(text) {
    const fromMemory = Function("return " + (`${memory}-${display}`))();
    newMemory(fromMemory);
  }

  return (
    <div className="App">

      <Wrapper>
        <Display displayNum={display} />


        <ButtonBox>
          { btnDigits.map((btn, i) => {
            return (
              <Buttons
                key={i}


                className={
                  btn === "C" || btn === "AC"
                  ? 'clear'
                  : btn === "M+" || btn === "M-" || btn === "MS" || btn === "MR" || btn === "MC"
                  ? 'memory'
                  : btn === "-" || btn === "+" || btn === "*" || btn === "/"
                  ? 'math'
                  : btn === "="
                  ? "equals"
                  : "default"
                }
                btnValue={btn}
              

                onClick={() =>
                  btn === "C"
                  ? handleClearPress(btn)
                  : btn === "AC"
                  ? handleAllClearPress(btn)
                  : btn === "%"
                  ? handlePercentPress(btn)
                  : btn === "+" || btn === "*" || btn === "-" || btn === "/"
                  ? handleSignPress(btn)
                  : btn === "(" || btn === ")"
                  ? handleBracketPress(btn)
                  : btn === "+/-" 
                  ? handleSwitchPress(btn)
                  : btn === "√"
                  ? handleSqrRtPress(btn)
                  : btn === "."
                  ? handleDotPress(btn)
                  : btn === "="
                  ? handleEqualsPress(btn)
                  : btn === "MS"
                  ? handleMemoryStore(btn)
                  : btn ==="MR"
                  ? handleMemoryRecall(btn)
                  : btn ==="M+"
                  ? handleMemoryAdd(btn)
                  : btn ==="MC"
                  ? handleMemoryClear(btn)
                  : btn ==="M-"
                  ? handleMemorySubtract(btn)
                  : btn === 0
                  ? handleZeroPress(btn)
                  : handleBtnPress(btn)
                }

                />
            );
          })
          }

        </ButtonBox>
      </Wrapper>

    </div>
  );
}

export default App;
