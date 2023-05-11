import React, { useState } from "react";
import HomeInput from "../components/HomeInput";
import Summary from "../components/Summary";
import axios from "axios";
import { Button } from "react-bootstrap";

export default function Home() {
  const [textInput, setTextInput] = useState("");
  const [audioInput, setAudioInput] = useState(null);
  const [videoInput, setVideoInput] = useState(null);
  const [summary, setSummary] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const handleTextInputChange = (event) => {
    setTextInput(event.target.value);
  }

  const handleAudioInputChange = (event) => {
    setAudioInput(event.target.files[0]);
  }

  const handleVideoInputChange = (event) => {
    setVideoInput(event.target.files[0]);
  }

  const generateSummary = async (text, audioFile, videoFile) => {
    //setIsLoading(true);
    let response = text;
    // Call backend and generate tweet here
    axios.get("http://localhost:5003/api/ai/summarize", { params: { text: text } })
      .then(res => {
        response = res.data.results;
        axios.get("http://localhost:5003/api/ai/createTweet", { params: { text: response } })
          .then(res => {
            setIsLoading(false);
            setSummary(res.data.results);
          })
          .catch(err => {
            setIsLoading(false);

            console.log(err);
          });
      })
      .catch(err => {
        setIsLoading(false);
        console.log(err);
      });
  }

  const postTweet = async (tweetContent) => {
    // Call backend to post to twitter
    alert("Tweet posted! (Lie)");
    alert(tweetContent);
  }

  const handleTweetText = (event) => {
    setSummary(event.target.value);
  }




  return <div>
    <div className="container">
      <div>
        <div className=" justify-content-around">
          <HomeInput textInput={textInput} audioInput={audioInput} videoInput={videoInput} tweetText={summary} isLoading={isLoading} setIsLoading={setIsLoading}
            handleAudioInputChange={handleAudioInputChange}
            handleTextInputChange={handleTextInputChange}
            handleVideoInputChange={handleVideoInputChange}
            generateSummary={generateSummary}
            handleTweetText={handleTweetText}
            postTweet={postTweet} />
          <br />
        </div>
      </div>


    </div>
  </div>;
}

//          <Summary summary={summary} />
