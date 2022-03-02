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
  console.log(allNewDice().toString())
  return (
    <main>
      <section className="dice-container" >
        <Die value={1} />
        <Die value={1} />
        <Die value={1} />
        <Die value={1} />
        <Die value={1} />
        <Die value={1} />
        <Die value={1} />
        <Die value={1} />
        <Die value={1} />
        <Die value={1} />
      </section>
    </main>
  );
}