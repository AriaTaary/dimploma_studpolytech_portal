export const matchBrowserLocale = (appLocales, browserLocales) => {
  /** @type {{ code: string, score: number }[]} */
  const matchedLocales = []

  // First pass: match exact locale.
  for (const [index, browserCode] of browserLocales.entries()) {
    const matchedCode = appLocales.find(
      appCode => appCode.toLowerCase() === browserCode.toLowerCase()
    )
    if (matchedCode) {
      matchedLocales.push({
        code: matchedCode,
        score: 1 - index / browserLocales.length
      })
      break
    }
  }

  // Second pass: match only locale code part of the browser locale (not including country).
  for (const [index, browserCode] of browserLocales.entries()) {
    if (browserCode.includes('-')) {
      // For backwards-compatibility, this is lower-cased before comparing.
      const languageCode = browserCode.split('-')[0].toLowerCase()

      if (appLocales.includes(languageCode)) {
        // Deduct a thousandth for being non-exact match.
        matchedLocales.push({
          code: languageCode,
          score: 0.999 - index / browserLocales.length
        })
        break
      }
    }
  }

  // Sort the list by score (0 - lowest, 1 - highest).
  if (matchedLocales.length > 1) {
    matchedLocales.sort((localeA, localeB) => {
      if (localeA.score === localeB.score) {
        // If scores are equal then pick more specific (longer) code.
        return localeB.code.length - localeA.code.length
      }

      return localeB.score - localeA.score
    })
  }

  return matchedLocales.length ? matchedLocales[0].code : null
}
