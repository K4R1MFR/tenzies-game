import React, { useState, useEffect } from 'react';
import './App.css';
import Die from './components/Die';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';

export default function App() {
  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)

  useEffect(() => {
    const allDiceHeld = dice.every(die => die.isHeld)
    const allSameVale = dice.every(die => die.value === dice[0].value)
    if (allDiceHeld && allSameVale) {
      setTenzies(true)
      console.log("You won!!!")
    }
  }, [dice])
  //!tenzies && console.log("Dice state changed")


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
  }

  const { innerWidth, innerHeight } = window;

  function reset() {
    setDice(allNewDice)
    setTenzies(false)
  }

  return (
    <main>
      {tenzies && <Confetti width={innerWidth} height={innerHeight} />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>

      <section className="dice-container" >
        {diceElements}
      </section>
      <button
        className='btn-roll'
        onClick={tenzies ? reset : rollDice} >{tenzies ? "New Game" : "Roll"}</button>
    </main>
  );
} 