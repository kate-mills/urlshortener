function ShortUrlHandler() {
  this.db = []

  this.testShortUrl = (url) => {
    let regex = /^(http|https):\/\/[^ "]+$/i
    return regex.test(url)
  }

  this.testAllNumbers = (short_url) => {
    let regex = /(\d\d\d+)/g
    return regex.test(Number(short_url.trim))
  }

  this.getSafeUrl = (url) => {
    let regex = /^(http|https):\/\/[^ "]+$/i
    let [matched, ...rest] = url.match(regex)
    if (matched[matched.length - 1] == '/') {
      matched = matched.slice(0, matched.length - 1)
      return matched
    }
    return url
  }

  this.createOrUpdateUrl = (url) => {
    url = url.toLowerCase().trim()
    url = this.getSafeUrl(url)

    if (this.db[url]) {
      let { id } = this.db[url]
      return { short_url: id, original_url: url }
    }
    let id = this.db.length + 100
    this.db[url] = { url, id }
    this.db.push(this.db[url])

    return { short_url: id, original_url: url }
  }
}

module.exports = ShortUrlHandler
