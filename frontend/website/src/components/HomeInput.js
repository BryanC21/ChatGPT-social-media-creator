import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

function HomeInput(props) {
  const { textInput, handleTextInputChange, generateSummary, postTweet, tweetText, handleTweetText, isLoading, setIsLoading } = props;
  const [fileType, setFileType] = useState('text'); // Default file type is set to 'text'
  const [tweetInput, setTweetInput] = useState("");
  const [mediaFile, setMediaFile] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [invisToggle, setInvisToggle] = useState(true);
  const [imgURL, setImgURL] = useState('');

  const handleGenerateClick = () => {
    setIsLoading(true);
    if (fileType === 'audioVideo') {
      // Use whisper to get text from audio/video
      let dat = new FormData();
      dat.append('file', mediaFile);

      axios.post('http://ec2-52-8-240-214.us-west-1.compute.amazonaws.com/api/aiv2/useWhisper', dat)
        .then((response) => {
          console.log(response);
          generateSummary(response.data.text);
        }
        )
        .catch((error) => {
          setIsLoading(false);
          alert("Error generating summary");
          console.log(error);
        }
        );
    } else {
      generateSummary(textInput);
    }
  };

  const handleFileTypeChange = (event) => {
    setFileType(event.target.value);
  };

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const handleTweetInputChange = (event) => {
    //setTweetText(event.target.value);
  };

  const handlerTwitterLogin = async () => {
    window.location.replace("http://ec2-52-8-240-214.us-west-1.compute.amazonaws.com/api/auth/twitter");
  }

  const handlePostTweet = () => {
    if (!isChecked) {
      postTweet(tweetText, '');
    } else {
      postTweet(tweetText, imgURL);
    }
  };

  const handleFileChange = (event) => {
    setMediaFile(event.target.files[0]);
  };

  const handleImages = async () => {
    setInvisToggle(false);
    setIsLoading(true);
    axios.get("http://ec2-52-8-240-214.us-west-1.compute.amazonaws.com/api/aiv2/useDall-e", { params: { prompt: "A thumbnail for this: " + tweetText.substring(0, 140), count: 1 } })
      .then(res => {
        setIsLoading(false);
        console.log(res.data.data[0].url);
        setImgURL(res.data.data[0].url);
        //alert("Images Generated!" + res.data.data[0].url);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
        alert("Error generating images");
      });
  }

  return (
    <div>
      <div className="card">
        <div className="card-body">
          <div className="text-center">
            <h5 className="card-title">Generate Summary</h5>
            <h6 className="card-subtitle mb-2 text-muted">Text, Audio and Video are supported.</h6>
          </div>
          {!isLoading ?
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
                  <input type="file" id="media-input" accept="audio/*,video/*" multiple onChange={handleFileChange} />
                )}
              </Form.Group>

              <Button onClick={handleGenerateClick}>Generate</Button>

              <Form.Group className="mt-3" controlId="exampleForm.ControlTextarea2">
                <Form.Label>Generated Tweet:</Form.Label>
                <Form.Control as="textarea" rows={3} value={tweetText} onChange={handleTweetText} />
              </Form.Group>

              <br />
              <label>DISCLAIMER: OpenAI can refuse to generate images for any reason including using a person's likeness or copyright</label>
              <br></br>
              <br></br>
              <Button variant="primary" onClick={handleImages}>Make Image for tweet</Button>
              <br></br>
              <br></br>
              {!invisToggle ?
                <div>
                  <label>
                    <input type="checkbox"
                      checked={isChecked}
                      onChange={handleCheckboxChange} />
                    <span> Include Image for tweet</span>
                  </label>
                  <br></br>
                  <img src={imgURL} width='512' height='512' />
                </div>
                : null}
                <br></br>
                <Button variant="secondary" onClick={handlerTwitterLogin}>Link Twitter</Button>
              <br></br>
              <Button variant="primary" onClick={handlePostTweet}>Post Tweet</Button>
            </Form>
            : <div className="text-center">
              <h1>Loading...</h1>
            </div>}
        </div>
      </div>
    </div>
  );
}

export default HomeInput;

