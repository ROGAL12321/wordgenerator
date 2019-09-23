import React, { Fragment } from 'react';
import { EditorState, convertToRaw } from "draft-js"; 
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';

import 'whatwg-fetch'

import "./Generator.css";

const options = {
  options: ['history', 'inline', 'blockType', 'fontSize', 'fontFamily', 'colorPicker', 'list', 'textAlign'],
  colorPicker: {
    colors: ['#61bd6d', '#1abc9c', '#54acd2', '#2c82c9',
      '#9365b8', '#475577', '#cccccc', '#41a85f', '#00a885',
      '#3d8eb9', '#2969b0', '#553982', '#28324e', '#000',
      '#f7da64', '#fba026', '#eb6b56', '#e25041', '#a38f84',
      '#efefef', '#ffffff', '#fac51c', '#f37934', '#d14841',
      '#b8312f', '#7c706b', '#d1d5d8'],
  },
}

//@TODO: Change endpoint URL
const API_URL = 'http://localhost:8085/generate'

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
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
      .then(r => r.json())
      .then(res => this.setState({ response: res }))
      .catch(error =>this.setState({ response: error }))
  }
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
        {response && <p><a href={response.url}>{response.url}</a> </p>}
        <button className="button" type="button" onClick={this.saveHTML}> Zapisz </button>
      </Fragment>
    )
  }
}

export default Generator;