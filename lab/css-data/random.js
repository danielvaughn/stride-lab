
// quick utilities to just randomize some stuff

export const randomId = (prefix = 'id', postfix = '', length = 8) => {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('')

  if (!length) {
    length = Math.floor(Math.random() * chars.length)
  }

  let str = ''
  for (let i = 0; i < length; i++) {
    str += chars[Math.floor(Math.random() * chars.length)]
  }

  const pre = prefix ? `${prefix}_` : ''
  const post = postfix ? `_${postfix}` : ''

  return `${pre}${str}${post}`
}

export const randomNumber = (max, min = 100) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const randomPercent = (min = 0) => `${randomNumber(100, min)}%`

export const randomColor = (preferPastel = true) => {
  const h = randomNumber(360, 0)
  const s = preferPastel ? randomNumber(100, 70) : randomNumber(60, 20)
  const l = preferPastel ? randomNumber(100, 70) : randomNumber(50, 20)

  return `hsl(${h}deg, ${s}%, ${l}%)`
}

export const randomChar = () => {
  const chars = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
  ]

  const index = randomNumber(25, 0)

  return chars[index]
}
