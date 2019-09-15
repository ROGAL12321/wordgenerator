import React from 'react';
import { Editor, EditorState } from 'draft-js';

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
        editorState={this.state.editorState}
        onChange={this.onChange} 
      />
    )
  }
}

export default Generator;