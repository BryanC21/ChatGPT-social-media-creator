import React, { useState } from "react";
import HomeInput from "../components/HomeInput";
import Summary from "../components/Summary";

export default function Home() {
  const [textInput, setTextInput] = useState("");
  const [audioInput, setAudioInput] = useState(null);
  const [videoInput, setVideoInput] = useState(null);
  const [summary, setSummary] = useState("");

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
    // Your API Call here
    // const response = await axios.post('URL');
    let response = text;
    setSummary(response);
  }



  return <div>
    <div className="container">
      <div>
        <div className=" justify-content-around">
          <HomeInput textInput={textInput} audioInput={audioInput} videoInput={videoInput}
            handleAudioInputChange={handleAudioInputChange}
            handleTextInputChange={handleTextInputChange}
            handleVideoInputChange={handleVideoInputChange}
            generateSummary={generateSummary} />
            <br/>
          <Summary summary={summary} />
        </div>
      </div>


    </div>
  </div>;
}
