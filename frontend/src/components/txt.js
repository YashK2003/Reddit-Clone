import React from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Edit from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";

  const styles = theme => ({
    container: {
      display: "flex",
      flexWrap: "wrap",
    },
    textField: {
      marginLeft: theme.spacing(),
      marginRight: theme.spacing(),
      width: 300,
      color: "black",
      fontSize: 50,
      opacity: 1,
      borderBottom: 0,
      "&:before": {
        borderBottom: 0
      }
    },
    disabled: {
      color: "black",
      borderBottom: 0,
      "&:before": {
        borderBottom: 0
      }
    },
    btnIcons: {
      marginLeft: 10
    }
  });

  var tempee = "hello";
  var strflag = "";
  // create variables for exporting to the profile page
  export var fnameexp = "";
  export var lnameexp = "";
  export var unameexp = "";
  export var ageexp = "";
  export var cnoexp = "";
  export var globalemail = "";
  export var changehua = "";
  var yt = 0;

  class EditableTextField extends React.Component {
  
    state = {
      email: "johndoe@domain.com",
      editMode: false,
      mouseOver: false
    };

    handleChange = event => {
 


      this.setState({ [event.target.name]: event.target.value });
      // console.log(" ----> " , event.target.name);
      // console.log(" ----> " , event.target.value);
           // ONCHANGE THE FUNCTION REACHES HERE
           changehua = "yes";
          //  console.log(changehua)

      // console.log( event.target.value);
      if(strflag === "fname"){
        fnameexp = event.target.value;
      }else  if(strflag === "lname"){
        lnameexp = event.target.value;
      }else  if(strflag === "uname"){
        unameexp = event.target.value;
      }else  if(strflag === "age"){
        ageexp = event.target.value;
      }else  if(strflag === "cno"){
        cnoexp = event.target.value;
      }
      // console.log("my data here is: ");
      // console.log(fnameexp);
      // console.log(lnameexp);
      // console.log(unameexp);
      // console.log(ageexp);
      // console.log(cnoexp);
    };

    handleMouseOver = event => {
      if (!this.state.mouseOver) {
        this.setState({ mouseOver: true });
        this.setState({ email: tempee });
      }
    };

    handleMouseOut = event => {
      // The problem is here!!!
      if (this.state.mouseOver) {
        this.setState({ mouseOver: false });
        this.setState({ email: tempee });
      }
    };

    handleClick = () => {
      this.setState({
        editMode: true,
        mouseOver: false,
        email: tempee
      });
    };

    

  render() {

    const { classes,value } = this.props;
    tempee = value;
    tempee = this.props.value;  
    strflag = this.props.class;

    // console.log("here OUT -> " , tempee );
    
    if(tempee !== undefined){
      // changehua = "idhar"
    if(yt === 0){
      if(strflag === "fname"){
        fnameexp = tempee;
      }else  if(strflag === "lname"){
        lnameexp = tempee;
      }else  if(strflag === "uname"){
        unameexp = tempee;
      }else  if(strflag === "age"){
        ageexp = tempee;
      }else  if(strflag === "cno"){
        cnoexp = tempee;
      }
      if(cnoexp !== ""){
        yt = 1;
      }
    }}
    
    return (
      <div className={classes.container} key={this.props.value} >
        <TextField  
          name="email"
          defaultValue={this.props.value}
          margin="normal"
          autoComplete="off"
          onChange={this.handleChange}
          disabled={!this.state.editMode}
          onMouseEnter={this.handleMouseOver}
          onMouseLeave={this.handleMouseOut}
          InputProps={{
              classes: {
                disabled: classes.disabled
              },
            endAdornment: this.state.mouseOver ? (
              <InputAdornment position="end">
                <IconButton onClick={this.handleClick}>
                  <Edit />
                </IconButton>
              </InputAdornment>
            ) : (
              ""
            )
          }}
        />
      </div>
    );
  }
}

export default withStyles(styles)(EditableTextField);
