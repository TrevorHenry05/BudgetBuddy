import './App.css';
import Budget from './components/Budget';
import Expense from './components/Expense';
import GroupColab from './components/GroupColab';
import Navigate from './components/Navigate';

function App() {
  return (
    <>
    <Navigate/>
    <Expense/>
    <Budget/>
    <GroupColab/>
    </>
  );
}

export default App;
