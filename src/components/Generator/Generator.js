import React from 'react';
import { EditorState } from "draft-js"; 
import { Editor } from 'react-draft-wysiwyg';

import "./Generator.css";

const options = {
  options: ['history', 'inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker']
}

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
          <Editor
          toolbar={options}
          editorState={this.state.editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="editor__wrapper"
          editorClassName="editor__container"
          onEditorStateChange={this.onChange}
        />
    )
  }
}

export default Generator;