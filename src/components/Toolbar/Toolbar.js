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
  
  changeInlineStyle = (event, style) => {
    event.preventDefault();
    this.props.handleChange(RichUtils.toggleInlineStyle(this.props.editState, style));
  }

  isActive = (style) => {
    const currentStyle = this.props.editState.getCurrentInlineStyle();
    return currentStyle.has(style) ? "toolbar__icon active" : "toolbar__icon"
  }

  isBlockActive = (style) => {
    let selection = this.props.editState.getSelection();
    const blockType = this.props.editState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey())
      .getType();

    return blockType === "header-one" ? "toolbar__icon active" : "toolbar__icon"
    
  }

  changeBlockStyle = (event) => {
    event.preventDefault();
    this.props.handleChange(RichUtils.toggleBlockType(this.props.editState, "header-one"))
  }

  render() {
    return (
      <div className="toolbar__container">
        {data.map((inlineStyle, index) => (
          <button 
            key={index} 
            className={this.isActive(inlineStyle.style)} 
            onClick={(event) => this.changeInlineStyle(event, inlineStyle.style)}
          >
            <FontAwesomeIcon icon={inlineStyle.icon}/>
          </button> 
        ))}
        <button className={this.isBlockActive()}onClick={(event) => this.changeBlockStyle(event)}>H1</button>
        <button onClick={(event) => this.changeBlockStyle(event)}>H2</button>
        <button onClick={(event) => this.changeBlockStyle(event)}>H3</button>
        <button onClick={(event) => this.changeBlockStyle(event)}>UL</button>
        <button onClick={(event) => this.changeBlockStyle(event)}>OL</button>
      </div>
    )
  }
}

export default Toolbar;
