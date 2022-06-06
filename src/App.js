import './App.css';
import List from './List';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
          <h2>To-Do List</h2>
          <h6>Ben Levy</h6>

          <List />
      </header>
    </div>
  );
}

export default App;
