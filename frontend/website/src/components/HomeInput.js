import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

function HomeInput(props) {

  const { textInput, audioInput, videoInput, handleAudioInputChange, handleTextInputChange, handleVideoInputChange, generateSummary } = props;

  const handleGenerateClick = () => {
    generateSummary(textInput);
  }

  return (
    <div>
      <div className="card" style={{ width: '35rem' }}>
        <div className="card-body">
          <div className="text-center">
            <h5 className="card-title">Generate Summary</h5>
            <h6 className="card-subtitle mb-2 text-muted">Text, Audio and Video are supported.</h6>
          </div>

          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Text input:</Form.Label>
              <Form.Control as="textarea" rows={3} value={textInput} onChange={handleTextInputChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <label htmlFor="audio-input">Audio Input:</label> &nbsp;&nbsp;&nbsp;
              <input type="file" id="audio-input" accept="audio/*" value={audioInput} onChange={handleAudioInputChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <label htmlFor="video-input">Video Input:</label>&nbsp;&nbsp;&nbsp;
              <input type="file" id="video-input" accept="video/*" value={videoInput} onChange={handleVideoInputChange} />
            </Form.Group>
          </Form>
          <div className='text-center'><Button onClick={handleGenerateClick}>Generate</Button></div>

        </div>
      </div>


    </div>
  );
}

export default HomeInput;