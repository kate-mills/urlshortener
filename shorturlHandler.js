function ShortUrlHandler() {
  this.urls = []

  this.isValidUrl = (url) => {
    let regex = /^(http|https):\/\/[^ "]+$/i
    return regex.test(url)
  }

  this.isValidId = (urlId) => {
    let regex = /(\d)/g
    let parsedId =  parseInt(urlId) 

    return (parsedId > this.urls.length -1)
      ? false
      : regex.test(parseFloat(urlId))
  }

  this.getSafeUrl = (url) => {
    let regex = /^(http|https):\/\/[^ "]+$/i
    let [matched, ...rest] = url.toLowerCase().trim().match(regex)

    if (matched[matched.length - 1] == '/') {
      matched = matched.slice(0, matched.length - 1)
      return matched
    }
    return url
  }

  this.findBySafeUrl = (url) => {
    let original_url = this.getSafeUrl(url)
    let short_url = this.urls.indexOf(original_url)

    if (!(short_url === -1)){
      return {short_url, original_url }
    }

    short_url = this.urls.length
    this.urls.push(original_url)
    return { short_url, original_url }
  }
}

module.exports = ShortUrlHandler
