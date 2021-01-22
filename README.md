# React Chat

This is the real-time chat powered by react, node and socket.io.

## Parts
<ul>
  <li>On the branch Client you may find the frontend part of the project</li>
  <li>On the branch Server you may find the backend part of the project</li>
</ul>

## Frontend
### Stack
The client part is powered by react, socket.io-client, partially bootstrap, material-ui and fontAwesome.

### Features
  The client app consists of 8 components:
    <ol>
      <li>App -- main component</li>
  <li>Join -- handles choosing the username and room</li>
  <li>Chat -- main chat component, stores all information about the user and current room in its state. Handles all socket.io operations. </li>
  <li>Infobar -- just a container for room name, share and sign out buttons</li>
  <li>Messages -- container for displaying messages</li>
  <li>Message -- message object</li>
  <li>Input -- used for typing new messages</li>
  <li>UsersList -- shows the list of users in the room</li>
    </ol>
   Each component lies in the separate folder with it's own .css file.
   
## Backend

### Stack
  The server is powered by express and socket.io

### Structure
  Main file is index.js. It handles the communication with the client.
  File users.js contains the array of users and methods for updating it:
  <ul>
  <li>addUser({id,room,name}) -- checks if user already exists and, if not, pushes new user to the array</li>
  <li>removeUser(id) -- removes the user (used for sign out operation)</li>
  <li>getUser(id) -- helper function for "addUser" method</li>
  <li>getUsersInRoom(room) -- returns all the users in the requested room </li>
  </ul>
