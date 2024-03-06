import React, { useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import io from 'socket.io-client';

import './index.scss';

function App() {
  const socket = useRef();

  useEffect(() => {
    socket.current = io('?device=admin');
    socket.current.on('connected', (state) => {
      console.log('state from server', state);
    });

    return () => {
      socket.current.off('connected');
    };
  }, []);

  const sendMessage = (e) => {
    console.log('emit message', e.target.id);
    socket.current.emit('message', e.target.id);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={(
            <div>
              <h1>Multiplayer Template</h1>
              <button type="button" id="one" onClick={sendMessage}>One</button>
              <button type="button" id="two" onClick={sendMessage}>Two</button>
              <button type="button" id="three" onClick={sendMessage}>Three</button>
            </div>
          )}
        />
      </Routes>
    </Router>
  );
}

export default App;
