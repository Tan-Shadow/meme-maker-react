import React from "react";
import { useState } from "react";
import { useHistory, useLocation } from "react-router";
import styles from "./MemeGenerated.module.css"

export const MemeGenerated = () => {

  const [copied, setCopied] = useState(0)

  const history = useHistory()
  const location = useLocation()
  const url = new URLSearchParams(location.search).get('url')

  return (
    // <>Hello</>
    <div className={styles.container}>
      <button className={styles.homeBtn} onClick={() => history.push('/')}>home</button>
      <button className={styles.copyBtn} onClick={() => {
        navigator.clipboard.writeText(url)
        setCopied(true)
      }}>{copied ? "Copied ;)" : "Copy Image URL"}</button>
      { url && <img src={url} alt="generated meme" /> }

    </div>
  )
}