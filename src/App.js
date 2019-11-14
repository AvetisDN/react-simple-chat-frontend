import React from 'react';
import Chat from './Chat';
import './style.scss';
import './chat-client';

function App() {
  return (
    <div className="App bg-light p-3">
        <div className="container">
            <div className="row">
                <div className="col-12 col-sm-10 col-md-8 col-lg-6 rounded shadow mx-auto text-light py-3 bg-gradient-info" id="wrapper">
                    <Chat/>
                </div>
            </div>
        </div>
    </div>
  );
}

export default App;
