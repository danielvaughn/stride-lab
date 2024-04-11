
export function randomId(prefix: string = 'id', postfix: string = '', length: number = 8): string {
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

export function randomColor(): string {
  const hexChars = [7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f']
  const hexArr = [0, 0, 0, 0, 0, 0]

  const resultHexArr = hexArr.map(() => {
    const index = Math.floor(Math.random() * hexChars.length)
    return hexChars[index]
  })

  const result = `#${resultHexArr.join('')}`

  return result
}


