import React, { Component } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBold, faUnderline, faItalic, faAlignRight } from '@fortawesome/free-solid-svg-icons';

import "./Toolbar.css";
import { RichUtils } from "draft-js";

const data = [
  {
    style: "BOLD",
    icon: faBold
  },
  {
    style: "ITALIC",
    icon: faItalic
  },
  {
    style: "UNDERLINE",
    icon: faUnderline
  }
]

class Toolbar extends Component {
  
  changeStyle = (event, style) => {
    event.preventDefault();
    this.props.handleChange(RichUtils.toggleInlineStyle(this.props.editState, style));
  }

  isActive = (style) => {
    const currentStyle = this.props.editState.getCurrentInlineStyle();
    return currentStyle.has(style) ? "toolbar__icon active" : "toolbar__icon"
  }

  render() {
    return (
      <div className="toolbar__container">
        {data.map((inlineStyle, index) => (
          <button 
            key={index} 
            className={this.isActive(inlineStyle.style)} 
            onClick={(event) => this.changeStyle(event, inlineStyle.style)}
          >
            <FontAwesomeIcon icon={inlineStyle.icon}/>
          </button> 
        ))}
      </div>
    )
  }
}

export default Toolbar;
