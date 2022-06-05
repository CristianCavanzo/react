import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function App(props) {
  return (
    <h1>{props.saludo}, {props.nombre}</h1>
  )
}

function withSaludo(WrappedComponent) {
  return function WrappedComponentWithSaludo(saludo) {
    return function ComponenteDeVerdad(props) {
      return (<React.Fragment>
        <WrappedComponent {...props} saludo={saludo} />
        <p>Estamos acompaando al WrappedComponent</p>
      </React.Fragment>)
    }
  }
}

const AppWithSaludo = withSaludo(App)('hey')
ReactDOM.render(
  <AppWithSaludo  nombre="Pepe"/>,
  document.getElementById('root')
);
