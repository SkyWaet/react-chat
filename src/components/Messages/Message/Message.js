import React from 'react';
import { Col, Row } from 'reactstrap';
import './Message.css';
import { Avatar } from '@material-ui/core';

import ReactEmoji from 'react-emoji';

const Message = ({ message: { text, user, date }, name }) => {

  const trimmedName = name.trim().toLowerCase();

  if (user === "system") {
    return (
      <div className="messageContainer systemMessage justifyCenter">
        <p className="messageText colorGrey justifyCenter" >{text}</p>
      </div>)
  } else if (user === trimmedName) {
    return (
      <div className="messageContainer justifyEnd" >
        <div className="messageBody justifyEnd">
          <div className="messageBox backgroundBlue ">
            <p className="messageText  colorWhite">{ReactEmoji.emojify(text)}</p>
          </div>
        </div>
        <p className="sentText justifyEnd ">{date}</p>
      </div >)
  } else {
    return (
      <div className="messageContainer justifyStart">
        <div className="messageBody ">
          <Avatar >{name[0]}</Avatar>
          <div className="messageBox justifyStart backgroundLight">
            <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
          </div>
        </div>
        <p className="sentText justifyStart ">{date}</p>
      </div>)
  }
}

export default Message;