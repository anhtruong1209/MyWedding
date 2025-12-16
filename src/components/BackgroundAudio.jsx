import React, { useEffect, useRef, useState } from 'react'

const BackgroundAudio = () => {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    // Cố gắng tự phát nhạc khi vừa mở trang
    audio.muted = false
    audio
      .play()
      .then(() => {
        setIsPlaying(true)
      })
      .catch(() => {
        // Nếu trình duyệt chặn autoplay, sẽ phát khi user tương tác
        setIsPlaying(false)
      })

    // Phòng trường hợp autoplay bị chặn: khi user click/touch lần đầu sẽ phát nhạc
    const handleUserInteraction = () => {
      if (!audio) return
      audio.muted = false
      audio
        .play()
        .then(() => {
          setIsPlaying(true)
        })
        .catch((err) => {
          console.log('Audio play failed:', err)
        })
    }

    document.addEventListener('click', handleUserInteraction, { once: true })
    document.addEventListener('touchstart', handleUserInteraction, { once: true })

    return () => {
      document.removeEventListener('click', handleUserInteraction)
      document.removeEventListener('touchstart', handleUserInteraction)
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
        autoPlay
        loop
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

