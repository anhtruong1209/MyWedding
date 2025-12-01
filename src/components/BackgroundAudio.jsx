import React, { useEffect, useRef } from 'react'

const BackgroundAudio = () => {
  const audioRef = useRef(null)

  useEffect(() => {
    const audio = audioRef.current
    if (audio) {
      // Unmute and play on user interaction
      const handleUserInteraction = () => {
        if (audio.muted) {
          audio.muted = false
          audio.play().catch((err) => {
            console.log('Audio play failed:', err)
          })
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

  return (
    <audio
      ref={audioRef}
      autoPlay
      loop
      muted
      id="background-audio"
      style={{ display: 'none' }}
    >
      <source src="/music/loop.mp3" type="audio/mp3" />
    </audio>
  )
}

export default BackgroundAudio

