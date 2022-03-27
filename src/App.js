import React, { useState, useEffect } from 'react';
import './App.css';
import Die from './components/Die';
import { nanoid } from 'nanoid';
import { useStopwatch } from 'react-timer-hook';
import Confetti from 'react-confetti';

export default function App() {
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [rollNumber, setRollNumber] = useState(0);
  const {
    seconds,
    minutes,
    pause,
    reset
  } = useStopwatch({ autoStart: false });


  useEffect(() => {
    const allDiceHeld = dice.every(die => die.isHeld)
    const allSameVale = dice.every(die => die.value === dice[0].value)
    if (allDiceHeld && allSameVale) {
      setTenzies(true);
      pause();
    }

    if (!gameStarted && dice.some(die => die.isHeld)) {
      reset();
      setGameStarted(true);
    }

  }, [dice])


  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }
  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie())
    }
    return newDice
  }

  function holdDice(id) {
    setDice(prevDice => prevDice.map(die => {
      return die.id === id ?
        { ...die, isHeld: !die.isHeld } :
        die
    }))

  }

  const diceElements = dice.map(die => <Die
    key={die.id}
    value={die.value}
    isHeld={die.isHeld}
    holdDice={() => holdDice(die.id)} />)


  function rollDice() {
    setDice(prevDice => prevDice.map(die => {
      return die.isHeld ?
        die :
        generateNewDie()

    }))

    if (gameStarted) {
      setRollNumber(prevState => prevState + 1)
    }
  }

  const { innerWidth, innerHeight } = window;

  function resetAll() {
    setDice(allNewDice);
    setTenzies(false);
    setGameStarted(false);
    setRollNumber(0);
    reset();
    pause();
  }

  return (
    <main>
      {tenzies && <Confetti width={innerWidth} height={innerHeight} />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same.
        Click each die to freeze it at its current value between rolls.
      </p>

      <div className="dice-container" >
        {diceElements}
      </div>
      <button
        className='btn-roll'
        onClick={tenzies ? resetAll : rollDice}
      >{tenzies ? "New Game" : "Roll"}</button>

      <div className='stopwatch'>
        <span>{minutes}min:{seconds}sec</span>
        {tenzies && <p>You won with {rollNumber} dice rolls.</p>}
      </div>

    </main>
  );
}