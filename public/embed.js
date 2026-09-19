/*
 * Trademark Date Mate - embed loader.
 *
 * Usage (paste where the estimator should appear):
 *   <script src="https://YOUR-HOST/embed.js" data-accent="#1d4ed8"></script>
 *
 * Every data-* attribute is forwarded to the app as a URL option
 * (data-accent, data-theme, data-title, data-intro, data-disclaimer,
 *  data-logo, data-config, data-scenarios). See the README.
 */
(function () {
  var script = document.currentScript
  if (!script || !script.src) return

  var params = new URLSearchParams()
  params.set('embed', '1')
  for (var i = 0; i < script.attributes.length; i++) {
    var attr = script.attributes[i]
    if (attr.name.indexOf('data-') === 0) params.set(attr.name.slice(5), attr.value)
  }

  var frame = document.createElement('iframe')
  frame.src = new URL('./', script.src).href + '?' + params.toString()
  frame.title = 'Trademark registration timeline estimator'
  frame.loading = 'lazy'
  frame.style.cssText = 'width:100%;border:0;display:block;min-height:640px;background:transparent'

  window.addEventListener('message', function (event) {
    if (event.source !== frame.contentWindow) return
    var data = event.data
    if (data && data.type === 'trademark-date-mate:height' && typeof data.height === 'number') {
      frame.style.minHeight = '0'
      frame.style.height = Math.ceil(data.height) + 'px'
    }
  })

  script.parentNode.insertBefore(frame, script.nextSibling)
})()
