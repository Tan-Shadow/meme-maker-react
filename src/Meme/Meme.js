import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import styles from "./Meme.module.css";

export const Meme = () => {
  const [memes, setmemes] = useState([]);
  let [memeIndex, setmemeIndex] = useState(0);
  const [captions, setCaptions] = useState([]);

  const history = useHistory()

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => {
        const memes = data.data.memes;
        setmemes(memes);
      })
      .catch((err) => console.log(err));

    setmemeIndex(Math.floor(Math.random() * 100));
  }, []);

  useEffect(() => {
    memes.length && setCaptions(Array(memes[memeIndex].box_count).fill(""));
  }, [memeIndex, memes]);

  const updateCaption = (e, index) => {
    const text = e.target.value || "";
    setCaptions(
      captions.map((c, i) => {
        if (index === i) return text;
        else return c;
      })
    );
  };

  const generateMeme = () => {
    const currentMeme = memes[memeIndex]
    const formData = new FormData();

    formData.append('username', 'tanshadow')
    formData.append('password', 'tanissexy')
    formData.append('template_id', currentMeme.id)
    captions.forEach((c, i) => formData.append(`boxes[${i}][text]`, c))

    fetch('https://api.imgflip.com/caption_image' ,{
      method: 'POST',
      body: formData,
    })
    .then(res => res.json()
    .then(data => {
      history.push(`/generated?url=${data.data.url}`)
    })).catch(err => alert('Either I had an error or you didn\'t provide all captions ;('))
  };

  return (
    memes.length && (
      <div className={styles.container}>
        <button
          onClick={() => {
            setmemeIndex(memeIndex - 1 < 0 ? 99 : memeIndex - 1);
          }}
          className={styles.btn}
        >
          Previous
        </button>

        <button
          onClick={() => {
            setmemeIndex(memeIndex + 1 > 99 ? 0 : memeIndex + 1);
          }}
          className={styles.btn}
        >
          Skip
        </button>

        <button
          className={styles.generate}
          onClick={generateMeme}
        >
          Genrate
        </button>

        {
          // console.log(captions)
          captions.map((c, i) => (
            <input key={i} onChange={(e) => updateCaption(e, i)} />
          ))
        }

        <div className={styles.memeCounterDiv}>
          Currently on meme
          <span className={styles.memeCount}>#{memeIndex}</span>
        </div>

        <img src={memes[memeIndex].url} alt="meme pic" />
      </div>
    )
  );
};
