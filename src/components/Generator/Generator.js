import React from 'react';
import { Editor, EditorState } from 'draft-js';
import "./Generator.css";
import Toolbar from "../Toolbar/Toolbar";
import { RichUtils } from "draft-js";


class Generator extends React.Component {  
  state = {
    editorState: EditorState.createEmpty()
  }

  onChange = (newEditorState) => {
    this.setState({
      editorState: newEditorState
    })
  }
  
  handleKeyCommand = command => {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
    
    if (newState) {
      this.onChange(newState);
      return "handled";
    }

    return "not-handled";
  }

  render() {
    return (
      <div className="editor__wrapper">
        <Toolbar handleChange={this.onChange} editState={this.state.editorState}/>
        <div className="editor__container">
          <Editor 
            editorState={this.state.editorState}
            onChange={this.onChange}
            handleKeyCommand={this.handleKeyCommand}
          />
        </div>
      </div>
    )
  }
}

export default Generator;