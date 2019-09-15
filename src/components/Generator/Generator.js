import React from 'react';
import { Editor, EditorState } from 'draft-js';
import "./Generator.css";
import Toolbar from "../Toolbar/Toolbar";

class Generator extends React.Component {  
  state = {
    editorState: EditorState.createEmpty()
  }

  onChange = (newEditorState) => {
    this.setState({
      editorState: newEditorState
    })
  }
  
  render() {
    return (
      <div className="editor__wrapper">
        <Toolbar handleChange={this.onChange} editState={this.state.editorState}/>
        <div className="editor__container">
          <Editor 
            placeholder="Wpisz...."
            editorState={this.state.editorState}
            onChange={this.onChange}
          />
        </div>
      </div>
    )
  }
}

export default Generator;