import React from "react";
import Header from "./components/Header";
import ProfileCard from "./components/ProfileCard";
import Feed from "./components/Feed";
import "./styles/App.css";
import backgroundSvg from "./assets/bgground.svg";
import background2 from "./assets/Group.svg";
import { PostProvider } from "./context/PostContext";
import { UserProvider } from "./context/UserContext";
//main app
function App() {
  return (
    <UserProvider>
      <PostProvider>
        <div className="App">
          <div
            className="background-image"
            style={{ backgroundImage: `url(${backgroundSvg})` }}
          ></div>
          <div
            className="background-image-bottom-left"
            style={{ backgroundImage: `url(${background2})` }}
          ></div>
          <Header />
          <div className="content">
            <ProfileCard />
            <div className="feed-container">
              <Feed />
            </div>
          </div>
          <footer className="footer">
            <p>
              © Copyright 2022 HackSoft Ltd. All rights reserved. No part of
              this site may be reproduced without our written permission.
            </p>
          </footer>
        </div>
      </PostProvider>
    </UserProvider>
  );
}

export default App;
