// Load external JavaScript libraries with minimal upfront cost.
// Only the essentials are loaded, and order is preserved where needed.
export const loadScripts = async () => {
  const loadScript = (src) =>
    new Promise((resolve) => {
      const s = document.createElement('script')
      s.src = src
      s.defer = true
      s.onload = () => resolve(true)
      s.onerror = () => {
        console.warn(`Failed to load script: ${src}`)
        resolve(false)
      }
      document.body.appendChild(s)
    })

  // Ensure jQuery exists
  if (!window.jQuery) {
    await loadScript('/js/jquery.min.js')
  }

  // Minimal set actually used:
  // - jquery.plugin.js (dependency for jquery.countdown)
  // - jquery.countdown.js (countdown in Events)
  // - jquery.magnific-popup.min.js (gallery lightbox)
  // - enquire.min.js (dependency for designesia.js)
  // - designesia.js (theme behaviors)
  //
  // Load dependency pairs in order, but run independent ones in parallel for speed.
  await loadScript('/js/jquery.plugin.js')

  await Promise.all([
    loadScript('/js/jquery.magnific-popup.min.js'),
    loadScript('/js/enquire.min.js'),
  ])

  await loadScript('/js/jquery.countdown.js')
  await loadScript('/js/designesia.js')
}

