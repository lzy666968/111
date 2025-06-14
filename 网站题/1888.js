var minFlips = function (s) {
  if (s.length < 2) return 0
  let m = (n = 0)
  for (let i = 0; i < s.length; i++) {
    if (i % 2 != Number(s[i])) {
      m++
    } else {
      n++
    }
  }
  if (s.length % 2 === 0) {
    return Math.min(m, n)
  } else {
    let res = Math.min(m, n)
    let m0 = (n0 = 0)
    // 依次计算移除某一位置字符时需要的翻转次数
    for (let i = 0; i < s.length; i++) {
      // 第一次循环时，以0开头，该位置是否发生了反转
      const val = i % 2 == Number(s[i]) ? 0 : 1
      // 以0开头，到前一位置的翻转次数：m0 + val
      // 以1开头，到前一位置的翻转次数：n0 + (1 - val)
      res = Math.min(m0 + n - (n0 + (1 - val)), n0 + m - (m0 + val), res)
      if (i % 2 != Number(s[i])) {
        m0++
      } else {
        n0++
      }
    }
    return res
  }
}

