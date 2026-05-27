import { markdown } from './markdown'

const autoCloseMs = 15000

const notificationContent = `
欢迎来到 **蔚蓝咖啡厅**。

从游戏内公告面板访问时，请在浏览器打开：

\`https://control.bluearchive.cafe/?uid=你的UID\`

用于管理汉化功能启用状态。

> “蔚蓝档案”是上海星啸网络科技有限公司的注册商标，版权所有。  
> 「ブルーアーカイブ」は株式会社Yostarの登録商標です。著作権はすべて保有されています。  
> “蔚蓝咖啡厅”是由爱好者创立并维护的民间项目，与以上游戏及公司并无官方关联。  
`

export function initNotification() {
  const notification = document.createElement('section')
  notification.className = 'site-notification'
  notification.setAttribute('role', 'status')
  notification.setAttribute('aria-live', 'polite')
  notification.innerHTML = `
    <div class="site-notification-copy">
      <span class="site-notification-title">提示</span>
      <div class="site-notification-message">${markdown.render(notificationContent)}</div>
    </div>
    <button class="site-notification-close material-symbols-outlined" type="button" aria-label="关闭通知">close</button>
    <span class="site-notification-progress" aria-hidden="true"></span>
  `

  document.body.append(notification)

  const progress = notification.querySelector('.site-notification-progress')
  const closeButton = notification.querySelector('.site-notification-close')
  let startedAt = performance.now()
  let elapsed = 0
  let paused = false
  let closed = false
  let animationId

  const close = () => {
    if (closed) return
    closed = true
    cancelAnimationFrame(animationId)
    notification.classList.add('closing')
    notification.addEventListener('transitionend', () => notification.remove(), { once: true })
    setTimeout(() => notification.remove(), 300)
  }

  const tick = (now) => {
    if (!paused) {
      elapsed = now - startedAt
      const progressRatio = Math.min(elapsed / autoCloseMs, 1)
      progress.style.transform = `scaleX(${1 - progressRatio})`

      if (progressRatio >= 1) {
        close()
        return
      }
    }

    animationId = requestAnimationFrame(tick)
  }

  const pause = () => {
    if (paused) return
    elapsed = performance.now() - startedAt
    paused = true
    notification.classList.add('paused')
  }

  const resume = () => {
    if (!paused || notification.contains(document.activeElement)) return
    paused = false
    startedAt = performance.now() - elapsed
    notification.classList.remove('paused')
  }

  closeButton.addEventListener('click', close)
  notification.addEventListener('pointerenter', pause)
  notification.addEventListener('pointerleave', resume)
  notification.addEventListener('focusin', pause)
  notification.addEventListener('focusout', () => requestAnimationFrame(resume))
  notification.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') close()
  })

  requestAnimationFrame(() => {
    notification.classList.add('open')
    animationId = requestAnimationFrame(tick)
  })
}
