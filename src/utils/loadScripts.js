// Load external JavaScript libraries
export const loadScripts = () => {
  return new Promise((resolve, reject) => {
    // Check if jQuery is already loaded
    if (window.jQuery) {
      loadPlugins()
      resolve()
      return
    }

    // Load jQuery
    const jqueryScript = document.createElement('script')
    jqueryScript.src = '/js/jquery.min.js'
    jqueryScript.onload = () => {
      loadPlugins()
      resolve()
    }
    jqueryScript.onerror = () => {
      console.warn('jQuery failed to load, continuing without it')
      // Continue even if jQuery fails
      resolve()
    }
    document.body.appendChild(jqueryScript)
  })
}

const loadPlugins = () => {
  const plugins = [
    '/js/bootstrap.min.js',
    '/js/wow.min.js',
    '/js/owl.carousel.js',
    '/js/jquery.magnific-popup.min.js',
    '/js/jquery.countdown.js',
    '/js/jquery.stellar.min.js',
    '/js/custom.js',
    '/js/designesia.js',
  ]

  plugins.forEach((src) => {
    const script = document.createElement('script')
    script.src = src
    script.async = true
    document.body.appendChild(script)
  })
}

