import express from 'express'
import cors from 'cors'
import puppeteer from 'puppeteer'
import axios from 'axios'

const app = express()
app.use(cors())

const PORT = process.env.PORT || 7777

const zorbasLinks = [
  { menuTitle: 'Статьи', address: 'https://zorbasmedia.ru/category/arbitrazh-trafika-stati/' },
]
const parse = async () => {
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()
  await page.goto('https://zorbasmedia.ru/category/arbitrazh-trafika-stati/')

  await page.waitForSelector('div.filter-navigation')

  const html = await page.evaluate(() => {
    const data = []

    const newsDetail = document.querySelectorAll('div.news_detail')

    newsDetail.forEach((elem) => {
      const title = elem.querySelector('h2.title_news').innerText
      const link = elem.querySelector('a.open_news.btn').href

      data.push({ title, link })
    })

    return data
  })
  console.log(html)

  // await browser.close()
}
parse()
