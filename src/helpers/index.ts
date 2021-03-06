export function cloneVariable<T>(variable: T): T {
  return JSON.parse(JSON.stringify(variable))
}

export function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export async function playAudio(src: string) {
  const audio = new Audio(src)
  await audio.play()
}

export function getTotalSecondsFromISODate(date: string): number | null {
  const reptms = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/
  let hours = 0,
    minutes = 0,
    seconds = 0,
    totalSeconds = null

  if (reptms.test(date)) {
    const matches = reptms.exec(date)

    if (matches) {
      if (matches[1]) {
        hours = Number(matches[1])
      }

      if (matches[2]) {
        minutes = Number(matches[2])
      }

      if (matches[3]) {
        seconds = Number(matches[3])
      }
    }

    totalSeconds = hours * 3600 + minutes * 60 + seconds
  }

  return totalSeconds
}

export async function copyTextToClipboard(text?: string) {
  if (text === undefined) {
    return
  }

  await navigator.clipboard.writeText(text)
}
