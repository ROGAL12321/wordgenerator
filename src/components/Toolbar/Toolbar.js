import React, { Component } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBold, faUnderline, faItalic, faAlignRight } from '@fortawesome/free-solid-svg-icons';

import "./Toolbar.css";
import { RichUtils } from "draft-js";

class Toolbar extends Component {
  
  // changeTextStyle = () => {
  //   this.props.handleChange(RichUtils.toggleInlineStyle(this.props.editState, "BOLD"));
  // }

  changeBoldStyle = () => {
  this.props.handleChange(RichUtils.toggleInlineStyle(this.props.editState, "BOLD"));
  }

  changeItalicStyle = () => {
    this.props.handleChange(RichUtils.toggleInlineStyle(this.props.editState, "ITALIC"));
  }

  changeUnderlineStyle = () => {
    this.props.handleChange(RichUtils.toggleInlineStyle(this.props.editState, "UNDERLINE"));
  }

  isActiveBold = () => {
    const currentStyle = this.props.editState.getCurrentInlineStyle();
    return currentStyle.has("BOLD") ? "toolbar__icon active" : "toolbar__icon"
  }

  isActiveItalic = () => {
    const currentStyle = this.props.editState.getCurrentInlineStyle();
    return currentStyle.has("ITALIC") ? "toolbar__icon active" : "toolbar__icon"
  }

  isActiveUnderline = () => {
    const currentStyle = this.props.editState.getCurrentInlineStyle();
    return currentStyle.has("UNDERLINE") ? "toolbar__icon active" : "toolbar__icon"
  }

  isActiveAlignRight = () => {
    const currentStyle = this.props.editState.getCurrentInlineStyle();
    return currentStyle.has("ALIGNRIGHT") ? "toolbar__icon active" : "toolbar__icon"
  }

  render() {
    return (
      <div className="toolbar__container">
        <button className={this.isActiveBold()} onClick={this.changeBoldStyle}>
          <FontAwesomeIcon icon={faBold}/>
        </button>
        <button className={this.isActiveItalic()} onClick={this.changeItalicStyle}>
          <FontAwesomeIcon icon={faItalic}/>
        </button>
        <button className={this.isActiveUnderline()} onClick={this.changeUnderlineStyle}>
          <FontAwesomeIcon icon={faUnderline}/>
        </button>
        <button className={this.isActiveAlignRight()} onClick={this.changeAlignRightStyle}>
          <FontAwesomeIcon icon={faAlignRight}/>
        </button>
      </div>
    )
  }
}

export default Toolbar;
