import React, { useState, useEffect } from "react";
import "./word-scramble.sass";

const WORDS = [
  'Cheese',
  'Mozerlla',
  'Ginger',
  'Jobin',
  'I Am Doing It'

]

const WordScramble = () => {
  const [inputValue, setInputValue] = React.useState("");
  const [isPlayOn, setIsPlayOn] = React.useState(false);
  const [message, setMessage] = React.useState('');

  const [correctWord, setCorrectWord] = useState("");
  const [scrambleWord, setScrambleWord] = useState("");
  


  const handleInputChange = (event) => { 
    setInputValue(event.target.value.toUpperCase());

    //console.log(event.target.value);
    
  }

  const selectedWord = () => {
    const randomIndex = Math.floor(Math.random() * WORDS.length)
    return WORDS[randomIndex];

  }

  const handleButtonClick = () => { 
    console.log('button clicked');
    if (inputValue !== '') {
    if (correctWord === inputValue) {
      setMessage("Correct!");
    }else{
      setMessage("WRONG!");
    }
  }
    
  }

  const constructScrambleWord = (word) => {
    const shuffledArray = word.split("").reduce(
			(newArr, _, i) => {
				const j = Math.floor(Math.random() * (i + 1));
				[newArr[i], newArr[j]] = [newArr[j], newArr[i]];
				return newArr;
			},
			[...word]
		);

		return shuffledArray.join("");

  }


  const handleStartGame = () => {
    setIsPlayOn(true);
    setInputValue("");
    setMessage('');
    const word = selectedWord();
    setCorrectWord(word.toUpperCase());

    setScrambleWord(constructScrambleWord(word));
    
    
  };
  
  useEffect(() => {
		let clearMessage;
		if (message === "WRONG!") {
			clearMessage = setTimeout(() => setMessage(""), 800);
		}

		return () => {
			if (clearMessage) {
				clearTimeout(clearMessage);
			}
		};
	}, [message]);
  


  return (
    <div className=' word-scramble'>
        {!!message&& (
        <div className='message'> 
          <p> {message}</p>
        </div>
        )}
        <h1>Word Scramble</h1>
        <div className='content'>
          
          <p className='scrambled_word'>{scrambleWord}</p>
          {isPlayOn ? (
            <>
          <div className='board'>
            {correctWord.split("").map((el,i) => (
              <span key = {`${el}_${i}`}className='square_bg'> 
                {inputValue[i]}
              </span>
              ))}
            
            
          </div>
          
          <div className='field'>
            <input type='text' onChange={handleInputChange} value ={inputValue } placeholder='Enter a word' />
            <button type='button' onClick={handleButtonClick}> Enter </button>   
          </div>
          </>
          ) : (
          <button className='start_game' type='button' onClick={handleStartGame}>
             Start 
          </button>
          )}
          {isPlayOn && (
            <button className='start_game new' type='button' onClick={handleStartGame}>
            New Game 
         </button>
          )}
          
        </div>
    </div>
  )
}

export default WordScramble;
