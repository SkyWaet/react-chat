import React from 'react';
import "./UsersList.css"
import { Avatar } from '@material-ui/core';
const UsersList = ({ users }) => {
    return (
        <div className="textContainer">
            {
                users
                    ? (
                        <div>
                            <h1>Users online:</h1>
                            <div className="activeContainer">
                                <h2>
                                    {users.map(({ fullName }) => (
                                        <div key={fullName} className="activeItem">
                                            <Avatar className="avatar">{fullName[0]}</Avatar>
                                            {fullName}
                                        </div>
                                    ))}
                                </h2>
                            </div>
                        </div>
                    )
                    : null
            }
        </div>)
}

export default UsersList;