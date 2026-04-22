const imageHrefPattern = /\.(avif|gif|jpe?g|png|webp|svg)(\?.*)?$/i

function createLightbox() {
  const lightbox = document.createElement('div')
  lightbox.className = 'lightbox'
  lightbox.setAttribute('aria-hidden', 'true')
  lightbox.innerHTML = `
    <button class="lightbox-backdrop" type="button" aria-label="关闭图片预览"></button>
    <figure class="lightbox-surface" role="dialog" aria-modal="true" aria-label="图片预览">
      <button class="lightbox-close material-symbols-outlined" type="button" aria-label="关闭图片预览">close</button>
      <img class="lightbox-image" alt="">
      <figcaption class="lightbox-caption"></figcaption>
    </figure>
  `
  document.body.append(lightbox)
  return lightbox
}

export function initLightbox() {
  const lightbox = createLightbox()
  const image = lightbox.querySelector('.lightbox-image')
  const caption = lightbox.querySelector('.lightbox-caption')
  const closeButtons = lightbox.querySelectorAll('.lightbox-backdrop, .lightbox-close')
  let previousFocus

  const close = () => {
    lightbox.classList.remove('open')
    lightbox.setAttribute('aria-hidden', 'true')
    document.body.classList.remove('lightbox-open')
    image.removeAttribute('src')
    image.alt = ''
    caption.textContent = ''
    previousFocus?.focus()
  }

  const open = (link) => {
    previousFocus = document.activeElement
    const title = link.dataset.lightboxCaption || link.getAttribute('title') || link.textContent.trim()

    image.src = link.href
    image.alt = title
    caption.textContent = title
    lightbox.classList.add('open')
    lightbox.setAttribute('aria-hidden', 'false')
    document.body.classList.add('lightbox-open')
    lightbox.querySelector('.lightbox-close').focus()
  }

  document.addEventListener('click', (event) => {
    const link = event.target.closest('a')
    if (!link || !link.href || !imageHrefPattern.test(link.href)) return

    event.preventDefault()
    open(link)
  })

  closeButtons.forEach((button) => {
    button.addEventListener('click', close)
  })

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && lightbox.classList.contains('open')) close()
  })
}
