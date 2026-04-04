import { markdown } from './markdown'
import { assetUrls } from './asset-urls'

import docsRaw from '../content/docs.md?raw'
import guideRaw from '../content/guide.md?raw'
import homeRaw from '../content/home.md?raw'
import statusRaw from '../content/status.md?raw'
import aboutRaw from '../content/about.md?raw'

function resolveAssetUrls(rawContent) {
  return Object.entries(assetUrls).reduce((content, [rawPath, assetUrl]) => {
    if (!rawPath.startsWith('./assets/')) return content
    return content.split(rawPath).join(assetUrl)
  }, rawContent)
}

export function loadPages() {
  return {
    docs: markdown.render(resolveAssetUrls(docsRaw)),
    guide: markdown.render(resolveAssetUrls(guideRaw)),
    home: markdown.render(resolveAssetUrls(homeRaw)),
    status: markdown.render(resolveAssetUrls(statusRaw)),
    about: markdown.render(resolveAssetUrls(aboutRaw))
  }
}
