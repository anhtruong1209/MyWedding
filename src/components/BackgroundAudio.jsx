import React, { useEffect, useRef, useState } from 'react'

const BackgroundAudio = () => {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (audio) {
      // Unmute and allow play on first user interaction (required on mobile)
      const handleUserInteraction = () => {
        if (audio.muted) {
          audio.muted = false
        }
      }

      document.addEventListener('click', handleUserInteraction, { once: true })
      document.addEventListener('touchstart', handleUserInteraction, { once: true })

      return () => {
        document.removeEventListener('click', handleUserInteraction)
        document.removeEventListener('touchstart', handleUserInteraction)
      }
    }
  }, [])

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      audio
        .play()
        .then(() => {
          setIsPlaying(true)
        })
        .catch((err) => {
          console.log('Audio play failed:', err)
        })
    }
  }

  return (
    <>
      <audio
        ref={audioRef}
        loop
        muted
        id="background-audio"
        style={{ display: 'none' }}
      >
        {/* Đổi sang bài nhạc biw.mp3, dài 3 phút 5 giây */}
        <source src="/music/biw.mp3" type="audio/mp3" />
      </audio>

      <button
        type="button"
        className={`music-toggle ${isPlaying ? 'playing' : 'paused'}`}
        onClick={togglePlay}
        aria-label={isPlaying ? 'Tắt nhạc' : 'Bật nhạc'}
      >
        <div className="music-icon" />
      </button>
    </>
  )
}

export default BackgroundAudio

