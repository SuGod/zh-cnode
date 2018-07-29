import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'

const directives = {
  highlight (el) {
    let blocks = el.querySelectorAll('pre code')
    blocks.forEach((block) => {
      hljs.highlightBlock(block)
    })
  }
}

export default directives