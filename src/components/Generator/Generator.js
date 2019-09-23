import React, { Fragment } from 'react';
import { EditorState, convertToRaw } from "draft-js"; 
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';

import 'whatwg-fetch'

import "./Generator.css";

const options = {
  options: ['history', 'inline', 'blockType', 'fontSize', 'fontFamily', 'colorPicker', 'list', 'textAlign']
}

//@TODO: Change endpoint URL
const API_URL = 'endpoint'

class Generator extends React.Component {  
  state = {
    editorState: EditorState.createEmpty(),
    response: null,
    openHTML: false
  }

  onChange = (newEditorState) => {
    this.setState({
      editorState: newEditorState
    })
  }

  toggleHTML = () => this.setState({ openHTML: !this.state.openHTML })

  saveHTML = (e) => {
    e.preventDefault();

    const data = {
      body: draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
    };

    fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data)
    })
      .then(res => this.setState({ response: res }))
      .catch(error =>this.setState({ response: error }))
  }

  render() {
    const { editorState, openHTML, response } = this.state;

    return (
      <Fragment>
        <Editor
          toolbar={options}
          editorState={editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="editor__wrapper"
          editorClassName="editor__container"
          onEditorStateChange={this.onChange}
        />
        <button className="button" onClick={this.toggleHTML}>Pokaż HTML</button>

        {openHTML && (
          <textarea
            className="textarea"
            disabled
            value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
          />
        )}
        {/* {response && <p> {response} </p>} */}
        <button className="button" type="button" onClick={this.saveHTML}> Zapisz </button>
      </Fragment>
    )
  }
}

export default Generator;