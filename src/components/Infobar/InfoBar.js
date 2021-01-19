import React,{useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt, faShareAlt } from '@fortawesome/free-solid-svg-icons'


import './InfoBar.css';

const InfoBar = ({ room }) => {
  const [share,showShare] = useState(false);

  const handleClick = (event) => {
    event.preventDefault();
    showShare(!share);
  }
  return (
    <div className="infoBar">
      <div className="leftInnerContainer">
        <h3>{room}</h3>
      </div>
      <div className="middleInnerContainer">
        <button className="shareButton" onClick={(event)=>handleClick(event)}> <FontAwesomeIcon icon={faShareAlt} size= "lg" /> {!share ? "Invite friends" : null}</button>
        {share ? <p id="hrefholder" className="hrefHolder"  >{window.location.href.replace(/name=\w+&/,"").replace("/chat","/join")}</p> : null}
      </div>
      <div className="rightInnerContainer">
        <a href="/" className="signOutButton">Sign Out <FontAwesomeIcon icon={faSignOutAlt} size="lg" /></a>
      </div>
    </div>
  )
};

export default InfoBar;