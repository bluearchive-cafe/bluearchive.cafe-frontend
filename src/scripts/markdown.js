import MarkdownIt from 'markdown-it'
import MarkdownItGitHubAlerts from 'markdown-it-github-alerts'

export const markdown = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
}).use(MarkdownItGitHubAlerts)
