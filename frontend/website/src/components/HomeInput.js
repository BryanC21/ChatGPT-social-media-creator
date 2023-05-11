import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

function HomeInput(props) {
  const { textInput, audioVideoInput, handleTextInputChange, handleMediaInputChange, generateSummary, handleTweetInputChange, postTweet } = props;
  const [fileType, setFileType] = useState('text'); // Default file type is set to 'text'
  const [tweetInput, setTweetInput] = useState('');

  const handleGenerateClick = () => {
    if (fileType === 'text') {
      generateSummary(textInput);
    } else {
      generateSummary(audioVideoInput);
    }
  };

  const handleFileTypeChange = (event) => {
    setFileType(event.target.value);
  };

  const handlePostTweet = () => {
    postTweet(tweetInput);
    setTweetInput('');
  };

  return (
    <div>
      <div className="card" style={{ width: '35rem' }}>
        <div className="card-body">
          <div className="text-center">
            <h5 className="card-title">Generate Summary</h5>
            <h6 className="card-subtitle mb-2 text-muted">Text, Audio and Video are supported.</h6>
          </div>

          <Form>
            <Form.Group className="mb-3" controlId="file-type-select">
              <Form.Label>Select File Type:</Form.Label>
              <Form.Select value={fileType} onChange={handleFileTypeChange}>
                <option value="text">Text</option>
                <option value="audioVideo">Audio/Video</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>{fileType === 'text' ? 'Text' : 'Audio/Video'} input:</Form.Label>
              {fileType === 'text' ? (
                <Form.Control as="textarea" rows={3} value={textInput} onChange={handleTextInputChange} />
              ) : (
                <input type="file" id="media-input" accept="audio/*,video/*" multiple onChange={handleMediaInputChange} />
              )}
            </Form.Group>

            <Button onClick={handleGenerateClick}>Generate</Button>

            <Form.Group className="mt-3" controlId="exampleForm.ControlTextarea2">
              <Form.Label>Generated Tweet:</Form.Label>
              <Form.Control as="textarea" rows={3} value={tweetInput} onChange={handleTweetInputChange} />
            </Form.Group>

            <Button variant="primary" onClick={handlePostTweet}>Post Tweet</Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default HomeInput;
