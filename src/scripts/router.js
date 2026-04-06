import { fillStatus } from './status'

function buildNavMarkup(pagesConfig, compact = false) {
  return pagesConfig.map((page) => {
    const href = page.href ?? `#${page.id}`
    if (compact) {
      const icon = `<span class="material-symbols-outlined" aria-hidden="true">${page.icon}</span>`
      const label = `<span class="nav-label">${page.label}</span>`
      return `<a href="${href}" data-page="${page.id}">${icon}${label}</a>`
    }

    const icon = `<span class="material-symbols-outlined" aria-hidden="true">${page.icon}</span>`
    const label = `<span class="nav-label">${page.label}</span>`
    return `<a href="${href}" data-page="${page.id}" class="top-tab">${icon}${label}</a>`
  }).join('')
}

export function initRouter(htmls, pagesConfig) {
  const main = document.querySelector('main')
  const topNav = document.querySelector('nav.top')
  const bottomNav = document.querySelector('nav.bottom')

  topNav.innerHTML = `
    <div class="site-top-tabs-shell">
      <div class="site-title" aria-label="站点标题">
        <!-- <span class="material-symbols-outlined" aria-hidden="true">local_cafe</span> -->
        <span class="site-title-text">蔚蓝咖啡厅</span>
      </div>
      <div class="site-top-tabs" role="tablist" aria-label="页面标签">${buildNavMarkup(pagesConfig)}</div>
    </div>
  `
  bottomNav.innerHTML = buildNavMarkup(pagesConfig, true)

  const navTargets = document.querySelectorAll('[data-page]')
  const topTabs = topNav.querySelectorAll('.top-tab')
  const bottomLinks = bottomNav.querySelectorAll('a')
  let renderTimer

  const getCurrentPage = () => location.hash.slice(1) || 'home'

  const getLinkPage = (link) => link.dataset.page || 'home'

  const render = () => {
    const page = getCurrentPage()

    clearTimeout(renderTimer)

    main.style.opacity = 0
    main.style.transform = 'translateY(50px)'

    topTabs.forEach((tab) => {
      tab.classList.toggle('active', getLinkPage(tab) === page)
    })

    bottomLinks.forEach((link) => {
      link.classList.toggle('active', getLinkPage(link) === page)
    })

    renderTimer = setTimeout(() => {
      main.innerHTML = htmls[page] || htmls.home
      main.style.opacity = 1
      main.style.transform = 'translateY(0)'
      if (page === 'status') fillStatus()
    }, 200)
  }

  window.addEventListener('hashchange', render)
  window.addEventListener('popstate', render)

  navTargets.forEach((link) => {
    link.addEventListener('click', (event) => {
      const targetPage = getLinkPage(link)
      const currentPage = getCurrentPage()

      if (targetPage === currentPage) {
        event.preventDefault()
        return
      }

      event.preventDefault()
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })

      const waitForTop = () => {
        const y = window.scrollY || document.documentElement.scrollTop
        if (!y) {
          if (targetPage === 'home') {
            history.pushState(null, '', location.pathname + location.search)
            render()
          } else {
            location.hash = `#${targetPage}`
          }
        } else {
          requestAnimationFrame(waitForTop)
        }
      }

      requestAnimationFrame(waitForTop)
    })
  })

  render()
}
