import '../styles/tokens.css'
import '../styles/style.css'
import '../styles/navbar.css'
import '../styles/card.css'
import '../styles/button.css'
import '../styles/lightbox.css'
import '../styles/notification.css'

import { assetUrls } from './asset-urls'
import { initLightbox } from './lightbox'
import { initNotification } from './notification'
import { loadPages } from './pages'
import { pagesConfig } from './pages-config'
import { initRouter } from './router'

const brandConfig = {
  mode: 'text'
}

const backgroundVideo = document.querySelector('#bg-video')
const header = document.querySelector('header')
const lightLogo = document.querySelector('header .brand-image.light')
const darkLogo = document.querySelector('header .brand-image.dark')

backgroundVideo.src = assetUrls.backgroundVideo
lightLogo.src = assetUrls.logoLight
darkLogo.src = assetUrls.logoDark
header.dataset.brandMode = brandConfig.mode

const pages = loadPages()
initRouter(pages, pagesConfig)
initLightbox()
initNotification()
