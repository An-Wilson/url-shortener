function shortenUrl(shortLength) {
  const usedChar = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  let result = ''

  for (let i = 0; i < shortLength; i++) {
    const randomIndex = Math.floor(Math.random() * usedChar.length)
    result += usedChar[randomIndex]
  }

  return result
}

module.exports = shortenUrl
