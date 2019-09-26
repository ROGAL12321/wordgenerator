import React from 'react';

import 'whatwg-fetch'

import $ from 'jquery';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Popper from 'popper.js';

import '../../../node_modules/summernote/dist/summernote.js'
import '../../../node_modules/summernote/dist/summernote.css'

import "./Generator.css";


//@TODO: Change endpoint URL
const API_URL = 'http://localhost:8085/generate'

class Generator extends React.Component {  
  state = {
    response: null,
    openHTML: false
  }

  componentDidMount() {
    $('#summernote').summernote({
      height: 500,
      fontNames: ['Arial', 'Arial Black', 'Comic Sans MS', 'Courier New', 'Times New Roman', 'Helvetica'],
      toolbar: [
        ['view', ['undo', 'redo']],
        ['style', ['style']],
        ['font', ['bold', 'underline', 'clear']],
        ['fontname', ['fontname']],
        ['color', ['color']],
        ['para', ['ul', 'ol', 'paragraph']],
        ['table', ['table']],
        ['view', ['codeview']],
      ],
    });
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
      body: $('#summernote').summernote('code')
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

  render() {
    const { openHTML, response } = this.state;

    return (
      <div className="generator">
        <div id="summernote" onKeyPress={e => console.log('das')}/>
        {/* <button className="button" onClick={this.toggleHTML}>Pokaż HTML</button> */}

        {openHTML && (
          <textarea
            className="textarea"
            disabled
            value={$('#summernote').summernote('code')}
          />
        )}
        {response && <p><a href={response.url}>{response.url}</a> </p>}
        <button className="button" type="button" onClick={this.saveHTML}> Zapisz </button>
      </div>
    )
  }
}

export default Generator;