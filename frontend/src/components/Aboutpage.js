import React from 'react';
import { withRouter } from "react-router-dom";

import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import './abt.css';


class Aboutpg extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      
    };
    // console.log("hello" , props);
  }

  
  
  render() {
    return(
      <div>
        <AppBar
          position="fixed"
          color="default"
          style={{ background: '#f5ba13' }}
          elevation={0}
        >
          <Toolbar>
            <Typography
              variant="h6"
              color="inherit"
              noWrap
            >
              My Marvel Superheroes
            </Typography>

            <nav   style={{paddingLeft: "800px" }}>
            <Link
              style={{paddingRight: "15px", paddingLeft: "15px", fontSize: "15px", fontFamily: "verdana" }}
                variant="button"
                color="textPrimary"
                href="/"
              >
                HOME
              </Link>
              <Link
              style={{paddingRight: "15px", paddingLeft: "15px", fontSize: "15px", fontFamily: "verdana" }}
                variant="button"
                color="textPrimary"
                href="/main"
              >
                COURSES
              </Link>
              <Link
              style={{paddingRight: "15px", paddingLeft: "15px", fontSize: "15px", fontFamily: "verdana" }}
                variant="button"
                color="textPrimary"
                href="/add"
              >
                ADD
              </Link>
              <Link
              style={{paddingRight: "15px", paddingLeft: "15px", fontSize: "15px", fontFamily: "verdana" }}
                variant="button"
                color="textPrimary"
                href="/about"
              >
                ABOUT ME
              </Link>
            </nav>
            
        
          </Toolbar>
        </AppBar>
        <div>
        <header className="masthead">
  <p className="masthead-intro">Yash Kawade</p>
  <h1 className="masthead-heading">Developer and Designer</h1>
</header>
  <section className="introduction-section">
    <div className="container">
    <h1>Introduction</h1>
    <p>Hello! My name is Yash, and I'm a <strong>student</strong> and <strong>full stack dev</strong> studying at<a href="https://www.iiit.ac.in/"><span className='linking'> IIIT-H </span></a> here in Hyderabad, India.
    </p>
    
    <p>I think it's important to help make the internet a <strong>beautiful place</strong>, whether that be through words, photography, or web design. </p>
    
    <p>I also think it's important to push yourself and <strong>learn</strong> one new thing every day, no matter what that may be.</p>
    </div>
  </section>

  

  

  <footer className="content-footer">
    <div className="footer-container">
    <p>Say hi to me on these social networks:</p>
    
   
</div>
<div>

<a target="blank" href="https://github.com/YashK2003">
<img className="iconsty" src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="mygit"></img>
</a>

<a target="blank" href="https://github.com/YashK2003">
<img className="iconsty" src="https://t4.ftcdn.net/jpg/04/83/36/97/360_F_483369745_d9uQmdRaUGrZjuZC95rh10o64eYunK6c.jpg" alt="mygit"></img>
</a>

<a target="blank" href="https://github.com/YashK2003">
<img className="iconsty" src="https://img.freepik.com/free-vector/instagram-icon_1057-2227.jpg" alt="mygit"></img>
</a>
</div>
  </footer>
        </div>
      
      </div>
     
    );
  }
}

export default withRouter(Aboutpg);