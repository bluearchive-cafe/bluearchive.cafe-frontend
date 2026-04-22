import '../styles/tokens.css'
import '../styles/style.css'
import '../styles/navbar.css'
import '../styles/card.css'
import '../styles/button.css'
import '../styles/lightbox.css'

import { assetUrls } from './asset-urls'
import { initLightbox } from './lightbox'
import { loadPages } from './pages'
import { pagesConfig } from './pages-config'
import { initRouter } from './router'

const backgroundVideo = document.querySelector('#bg-video')
const lightLogo = document.querySelector('header .light')
const darkLogo = document.querySelector('header .dark')

backgroundVideo.src = assetUrls.backgroundVideo
lightLogo.src = assetUrls.logoLight
darkLogo.src = assetUrls.logoDark

const pages = loadPages()
initRouter(pages, pagesConfig)
initLightbox()
