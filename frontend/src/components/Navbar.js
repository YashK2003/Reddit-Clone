import React from 'react';
import { withRouter } from "react-router-dom";

import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";


function myNavBar () {
    return(
        <div>
          <AppBar
            position="static"
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
                My Fun Website
              </Typography>
  
              <nav   style={{paddingLeft: "1000px" }}>
              <Link
                style={{paddingRight: "15px", paddingLeft: "15px", fontSize: "15px", fontFamily: "verdana" }}
                  variant="button"
                  color="textPrimary"
                  href="/main"
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
      
        </div>
      );
  }
  



export default myNavBar;