import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import queryString from 'query-string';

import './JoinPage.css';

export default function SignIn({ location }) {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [nameFromUrl, setNameFromUrl] = useState('');
  useEffect(() => {
    const urlParams = queryString.parse(location.search);
    
    if (urlParams.name) {
      setNameFromUrl(urlParams.name);
    }
    if (urlParams.room) {
      setRoom(urlParams.room);
    }
  }, [location.search])

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Join</h1>
        <div className="error">
          {nameFromUrl !== '' ? <p>Sorry, but the username {nameFromUrl} is taken. Please, choose another one. </p> : null}
        </div>
        <div>
          <input placeholder="Name" className="joinInput" type="text" onChange={(event) => setName(event.target.value)} />
        </div>
        <div>
          <input placeholder="Room" className="joinInput mt-20" type="text" value={room} onChange={(event) => setRoom(event.target.value)} />
        </div>
        <Link id="link" onClick={e => (!name || !room) ? e.preventDefault() : null}  to={`/chat?name=${name}&room=${room}`}>
          <button className={'button mt-20'} type="submit">Sign In</button>
        </Link>
      </div>
    </div>
  );
}