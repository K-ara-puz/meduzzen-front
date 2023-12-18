const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const https = require('https')
const fs = require("fs");

const dev = process.env.NODE_ENV !== 'production'

// when using middleware `hostname` and `port` must be provided below
const app = next({
  dev,
  hostname: 'localhost',
  port: process.env.NEXT_PUBLIC_DEV_PORT
})
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      // Be sure to pass `true` as the second argument to `url.parse`.
      // This tells it to parse the query portion of the URL.
      const parsedUrl = parse(req.url, true)
      const { pathname, query } = parsedUrl

      if (pathname === '/a') {
        await app.render(req, res, '/a', query)
      } else if (pathname === '/b') {
        await app.render(req, res, '/b', query)
      } else {
        await handle(req, res, parsedUrl)
      }
    } catch (err) {
      res.statusCode = 500
      res.end('internal server error')
    }
  })
    .once('error', (err) => {
      process.exit(1)
    })
    .listen(process.env.NEXT_PUBLIC_DEV_PORT, () => {
      console.log(`> Ready on http://localhost:${process.env.NEXT_PUBLIC_DEV_PORT}`)
    })
})