import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";
import Messages from '../Messages/Messages';
import InfoBar from '../Infobar/InfoBar';
import Input from '../InputMessage/InputMessage';
import UsersList from '../UsersList/UsersList';
import { Row, Col, Container } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopyright } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from "@fortawesome/free-brands-svg-icons"
import { Redirect } from "react-router-dom";

import './Chat.css';

const ENDPOINT = 'localhost:5000';

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [connError, setConnError] = useState(false);

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setRoom(room);
    setName(name)

    socket.emit('join', { name, room }, (error) => {
      if (error === 'Username is taken.') {
      
        setConnError(true);
      }
    });
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on('message', message => {
      console.log(message.date)
      setMessages(messages => [...messages, message]);
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }

  if (connError) {
    return (<Redirect to={`/join?name=${name}&room=${room}`} />)
  }
  else {
    return (
      <div className="outerContainer">
        <Container xs="12">
          <Row className="header"><InfoBar room={room} /></Row>
          <Row className="mainRow">
            <Col sm="8" className="container">
              <Messages messages={messages} name={name} />
              <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </Col>
            <Col sm="3" className="usersList">
              <UsersList users={users} />
            </Col>
          </Row>
          <Row className="footer">
            <p><FontAwesomeIcon icon={faCopyright} /> 2021 SkyWaet </p>
            <p><a href="https://github.com/SkyWaet/react-chat.git" className="githubRef"><FontAwesomeIcon icon={faGithub} /> SkyWaet</a></p>
          </Row>
        </Container>
      </div>
    );
  }

}

export default Chat;