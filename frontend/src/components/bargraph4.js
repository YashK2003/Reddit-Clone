import React from 'react';
import { withRouter } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import axios from "axios";
import {Line} from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart }            from 'react-chartjs-2'
import {CategoryScale} from 'chart.js'; 

var datearray = [];
var dataarray = [];
var dataarray2 = [];

// const state = 

class linegraph4 extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      userData: {},
      mydataraay1: [],
      mydataraay2: [],
      mydates: [],
    };
    console.log("in the constructor");
  }


componentDidMount() {

    // first extract the ID 
  // ------------------------------------------------
  var url = window.location.pathname;
  url =   url.slice(0, -6);
  var id = url.substring(url.lastIndexOf('/') + 1);
  console.log(id);
  // ------------------------------------------------

// NOW ASK FOR THE DATA
//..............................................................
const sendobj = {
  // subid: "63e4bad7e6cf0813ac9f3b37"
  // subid: "63e4c58fdb1e035538636682"
  subid: id
}
axios
  .post("http://localhost:4000/data/getallstats" , sendobj)
  .then(respe => {
    if (respe.data === "Invalid Credentials") {
      console.log("invalid");
  
    } else {
      var ytt = respe.data.sort((a, b) => {
        const nameB = new Date(a.date);
        const nameA = new Date(b.date);
        // console.log(nameA);
        // console.log(nameB);
        if (nameA > nameB) {
          return -1;
        }
        if (nameA < nameB) {
          return 1;
        }
        // names must be equal
        return 0;
    });

    respe.data = ytt;
    console.log(" -- > data in bargraph" , respe.data);

    
    // ******************* set the date array **************************
      var temparr = [];
      for (let i = 0; i < respe.data.length; i++) {
        temparr.push(respe.data[i].date);
    }
    // console.log((temparr));
    datearray = temparr;
    this.setState({mydates: temparr});
    // ******************* set the date array **************************
    
    // ******************* set the data array **************************
    var temparr2 = [];
    for (let i = 0; i < respe.data.length; i++) {
      temparr2.push(respe.data[i].deletedposts);
    }
    // console.log((temparr2));
    dataarray = temparr2;
    this.setState({mydataraay: temparr2});
    // ******************* set the date array **************************

    // ******************* set the data array 2 **************************
    var temparr22 = [];
    for (let i = 0; i < respe.data.length; i++) {
      temparr22.push(respe.data[i].reportedposts);
    }
    // console.log((temparr2));
    dataarray2 = temparr22;
    this.setState({mydataraay2: temparr22});
    // ******************* set the date array 2 **************************
    
    // Final check
    // console.log("dates are: " , this.state.mydataraay)
    // console.log("data is: " , this.state.mydates)
      
      
      // console.log(typeof(mysubgres));
    //   this.setState({mypostarray: temparr});
      // console.log((this.state.mypostarray[3])
      
    }
  })
  .catch(err => {
    console.log(" ----------> here we got an error");
  });
}

render() {
    return (
      <div>
        {/* <h1> HEllo {datearray.length}</h1> */}
        <Line
          data={{
                labels: datearray,
                datasets: [
                    {
                    label: 'Reported Posts',
                    fill: false,
                    lineTension: 0.5,
                    backgroundColor: 'rgba(75,192,192,1)',
                    borderColor: 'rgba(0,0,0,1)',
                    borderWidth: 2,
                    data: dataarray2
                  },
                  {
                    label: 'Deleted Posts',
                    fill: false,
                    lineTension: 0.5,
                    backgroundColor: 'rgba(255,0,0,1)',
                    borderColor: 'rgba(0,0,0,1)',
                    borderWidth: 2,
                    data: dataarray
                    
                  },
                  
                ]
              }}
          options={{
            title:{
              display:true,
              text:'',
              fontSize:20,
            },
            legend:{
              display:true,
              position:'right',
            }
          }}
        />
      </div>
    );
  }
}

export default withRouter(linegraph4);