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
          el.dataset.statusState = 'loading'
        } else if (official === localized) {
          el.textContent = '已同步'
          el.dataset.statusState = 'success'
        } else {
          el.textContent = '未同步'
          el.dataset.statusState = 'error'
        }
        return
      }

      const value = keyPath.split('/').reduce((obj, key) => obj?.[key], statusData)
      if (value !== undefined) el.textContent = value
    })
  } catch {
    document.querySelectorAll('[data-key]').forEach((el) => {
      el.textContent = '获取失败'
      if (el.dataset.key.endsWith('/status')) el.dataset.statusState = 'error'
    })
  }
}
