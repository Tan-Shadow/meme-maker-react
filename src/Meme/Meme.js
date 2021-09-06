import React, { useState, useEffect } from "react";
import styles from "./Meme.module.css";

export const Meme = () => {
  const [memes, setmemes] = useState([]);
  let [memeIndex, setmemeIndex] = useState(0)
  const [captions, setCaptions] = useState([])
  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => {
        const memes = data.data.memes;
        setmemes(memes);
      })
      .catch((err) => console.log(err));

      setmemeIndex(Math.floor(Math.random() * 101))
  }, []);

  useEffect(() => {
    if (memeIndex < 0) setmemeIndex(100)
    if (memeIndex > 100) setmemeIndex(0) 

    setCaptions(memes.length && Array(memes[memeIndex].box_count).fill(' '))
    }, [memeIndex, memes])

  // useEffect(() => {
  //   console.log(captions);
  // }, [captions])

  return (
    memes.length && (
      <div className={styles.container}>
        <button onClick = {() => {
          setmemeIndex(memeIndex - 1)
        }} 
        className={styles.btn}>
          Previous</button>

        <button onClick={() => {
          setmemeIndex(memeIndex + 1)
        }} className={styles.btn}>Skip</button>

        <button onClick={() => {
        }} className={styles.generate}>Genrate</button>

        {/* {
          captions.map((c, i) => (
            <input key={i}/>
          ))
        } */}

        <img src={memes[memeIndex].url} alt="meme pic" />
      </div>
    )
  );
};
