export async function fillStatus() {
  try {
    const res = await fetch('https://api.bluearchive.cafe/status/list')
    const statusData = await res.json()
    const elements = document.querySelectorAll('[data-key]')

    elements.forEach((el) => {
      const keyPath = el.dataset.key

      if (keyPath.endsWith('/status')) {
        const type = keyPath.split('/')[0]
        const official = statusData[type]?.official?.version
        const localized = statusData[type]?.localized?.version

        if (!official || !localized) {
          el.textContent = '未获取'
          el.style.color = 'rgb(245, 180, 0)'
        } else if (official === localized) {
          el.textContent = '已同步'
          el.style.color = 'rgb(46, 204, 113)'
        } else {
          el.textContent = '未同步'
          el.style.color = 'rgb(231, 76, 60)'
        }
        return
      }

      const value = keyPath.split('/').reduce((obj, key) => obj?.[key], statusData)
      if (value !== undefined) el.textContent = value
    })
  } catch {
    document.querySelectorAll('[data-key]').forEach((el) => {
      el.textContent = '获取失败'
      el.style.color = 'rgb(231, 76, 60)'
    })
  }
}
