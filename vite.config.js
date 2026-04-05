import { defineConfig } from 'vite'

const githubPagesBase = '/bluearchive.cafe-frontend/'

export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? githubPagesBase : '/',
  server: {
    port: 1208
  },
  preview: {
    port: 1394
  }
})
