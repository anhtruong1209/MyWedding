// Load external JavaScript libraries in sequence to guarantee dependency order
export const loadScripts = async () => {
  // Small helper to load one script and await finish
  const loadScript = (src) =>
    new Promise((resolve) => {
      const s = document.createElement('script')
      s.src = src
      s.defer = true
      s.onload = () => resolve(true)
      s.onerror = () => {
        console.warn(`Failed to load script: ${src}`)
        resolve(false) // continue even if a script fails
      }
      document.body.appendChild(s)
    })

  // If jQuery already present, skip loading it again
  if (!window.jQuery) {
    await loadScript('/js/jquery.min.js')
  }

  // Load plugins in a strict order so that each one sees jQuery ready
  const plugins = [
    '/js/bootstrap.min.js',
    '/js/wow.min.js',
    '/js/owl.carousel.js',
    '/js/jquery.magnific-popup.min.js',
    // Required by jquery.countdown.js (Keith Wood) — provides createPlugin
    '/js/jquery.plugin.js',
    '/js/jquery.countdown.js',
    '/js/jquery.stellar.min.js',
    '/js/custom.js',
    // designesia.js depends on enquire
    '/js/enquire.min.js',
    '/js/designesia.js',
  ]

  for (const src of plugins) {
    await loadScript(src)
  }
}

