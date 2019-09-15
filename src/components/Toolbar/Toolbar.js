import React, { Component } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { FaBold } from '@fortawesome/free-solid-svg-icons';
import { faBold } from '@fortawesome/free-solid-svg-icons';
import "./Toolbar.css";
import { RichUtils } from "draft-js";

class Toolbar extends Component {
  
  changeTextStyle = () => {
    this.props.handleChange(RichUtils.toggleInlineStyle(this.props.editState, "BOLD"));
  }
  
  render() {
    return (
      <div className="toolbar__container">
        <button className="toolbar__icon" onClick={this.changeTextStyle}>
          <FontAwesomeIcon icon={faBold}/>
        </button>
      </div>
    )
  }
}

export default Toolbar;
