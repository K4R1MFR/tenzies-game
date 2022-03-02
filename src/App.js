import React, { useState } from 'react';
import './App.css';
import Die from './components/Die';

export default function App() {

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      let die = Math.floor(Math.random() * 6) + 1;
      newDice.push({ value: die, isHeld: false })
    }
    return newDice
  }
  const [dice, setDice] = useState(allNewDice())
  console.log(dice)

  const diceElements = dice.map(die => <Die value={die.value} isHeld={die.isHeld} />)

  return (
    <main>
      <section className="dice-container" >
        {diceElements}
        {console.log(diceElements)}
      </section>
      <button
        className='btn-roll'
        onClick={() => setDice(allNewDice())} >Roll</button>
    </main>
  );
} 