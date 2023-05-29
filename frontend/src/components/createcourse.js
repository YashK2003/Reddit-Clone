import React from "react";
import styles from "./mystylefile.module.css";

function Coursentry(props) {
    console.log("props are " , props);
  return (
    <div className={styles.term}>
      
      <dt>
        <span className={styles.emoji} role="img" aria-label="Tense Biceps">
        <img className={styles.img} src={props.Image} alt="img" />
        </span>    
        <span> {props.Name}  </span>
      </dt>
      
      <dd>  {props.Description}  </dd>
    
    </div>
  );
}

export default Coursentry;
