import React, { useState, useEffect } from "react";
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // some check somehow
    axios.get("http://ec2-52-8-240-214.us-west-1.compute.amazonaws.com/api/checkLogin", { withCredentials: true })
      .then((response) => {
        if (response.status === 200) {
          console.log("logged in");
          setIsLoggedIn(true);
        } else {
          console.log("not logged in");
          setIsLoggedIn(false);
        }
      })
      .catch((error) => {
        console.log(error);
      }
      );
  }, [isLoggedIn]);

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
    axios.get("http://ec2-52-8-240-214.us-west-1.compute.amazonaws.com/api/ai/summarize", { params: { text: text } })
      .then(res => {
        response = res.data.results;
        axios.get("http://ec2-52-8-240-214.us-west-1.compute.amazonaws.com/api/ai/createTweet", { params: { text: response } })
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

  const postTweet = async (tweetContent, imgURL) => {
    // Call backend to post to twitter
    //alert("Tweet posted! (Lie)");
    //alert(tweetContent);

    axios.get("http://ec2-52-8-240-214.us-west-1.compute.amazonaws.com/api/post/twitter", { withCredentials: true }, { params: { message: tweetContent, img: imgURL } } )
      .then(res => {
        console.log(res);
        alert("Tweet posted!");
      })
      .catch(err => {
        console.log(err);
        alert("Tweet failed to post!");
      }
      );


  }

  const handleTweetText = (event) => {
    setSummary(event.target.value);
  }


  return <div>
    <div className="container">
      <div>
        {isLoggedIn ?
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
          :
          <div className=" justify-content-around">
            <h1 className="text-center">Please log in to use this application</h1>
          </div>
        }
      </div>


    </div>
  </div>;
}

//          <Summary summary={summary} />
