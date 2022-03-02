import React, { useState } from 'react';
import './App.css';
import Die from './components/Die';

export default function App() {

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      let die = Math.floor(Math.random() * 6) + 1;
      newDice.push(die)
    }
    return newDice
  }
  const [dice, setDice] = useState(allNewDice())

  const diceElements = dice.map(die => <Die value={die} />)

  return (
    <main>
      <section className="dice-container" >
        {diceElements}
      </section>
    </main>
  );
}