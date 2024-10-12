import React from "react";
import "./Hero.css";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const words = ["Life", "Health", "Future"];
  const [currentWord, setCurrentWord] = useState(words[0]);
  const [displayWord, setDisplayWord] = useState("");
  let index = 0; // Initialize index

  useEffect(() => {
    const interval = setInterval(() => {
      index = (index + 1) % words.length; // Cycle through words
      const nextWord = words[index];

      // Transition to next word
      transitionToNextWord(nextWord);
    }, 3000); // Change word every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const transitionToNextWord = (nextWord) => {
    // Instantly set the displayWord to an empty string
    setDisplayWord(""); // Remove previous word instantly

    // After a short delay, start bringing in the new word line by line
    setTimeout(() => {
      let tempWord = ""; // Start with an empty string
      for (let i = 0; i < nextWord.length; i++) {
        setTimeout(() => {
          tempWord += nextWord[i]; // Append the next character
          setDisplayWord(tempWord); // Update the displayed word
        }, i * 100); // Adjust timing for each character (300ms)
      }
    }, 500); // Delay before starting the new word (500ms)

    setCurrentWord(nextWord); // Update the current word
  };
  const navigate = useNavigate();
  return (
    <div
      className="hero container"
      style={{ backgroundImage: `url('/hero.png')` }}
    >
      <div className="banner">
        <h1>
          We Care About <br /> Your{" "}
          <span className="rotating-word">{displayWord}</span>
        </h1>
        <p className="slide-in">
          Welcome to HospitalManagementSystem, where technology meets compassion
          to transform healthcare. Our software streamlines hospital operations,
          empowering you to focus on patient care while we handle the rest.
          Together, were shaping a brighter, healthier future!
          <br />
          <br />
          <br />
          <button onClick={() => navigate("/appointment")}>
            Appointment <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </p>
      </div>
    </div>
  );
};

export default Hero;
