import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../index.js";
import axios from "axios";
import { Navigate } from "react-router-dom";
import "./Message.css"

const Message = ({messages}) => {
  const { isAuthenticated } = useContext(Context);

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }
  return (
    <section className="page messages">
      <h1>Messages</h1>
      <div className="banner">
        {messages && messages.length > 0 ? (
          messages.map((element) => {
            return (
              <div className="card">
                <div className="details">
                  <p>
                    First Name : <span>{element.firstName}</span>
                  </p>
                  <p>
                    Last Name : <span>{element.lastName}</span>
                  </p>
                  <p>
                    Email : <span>{element.email}</span>
                  </p>
                  <p>
                    Phone : <span>{element.phone}</span>
                  </p>
                  <p>
                    Message : <span>{element.message}</span>
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <h1> No Messages!</h1>
        )}
      </div>
    </section>
  );
};

export default Message;
