import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Mi Primera App de React</h1>
        <p>¡Bienvenido a tu nuevo proyecto!</p>
        <button onClick={() => alert('¡Hola desde React!')}>
          Hacer clic aquí
        </button>
      </header>
    </div>
  );
}

export default App;