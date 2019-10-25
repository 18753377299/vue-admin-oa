export default {
  // 千位符格式化
  toThousands: function (num) {
    var result = ''
    // if ((num.toString()).indexOf('.') === -1) {
    //   alert(num)
    //   result = num.toString().replace(/(\d{1,3})(?=(\d{3})+$)/g, '$1,')
    //   alert(result + 'fgh')
    // } else {
    var numP = ''
    var numS = ''
    if (num === '' || num === null) {
      return ''
    }
    if (((num || 0) + '').indexOf('.')) {
      numP = parseInt(num) + ''
      numS = (num + '').split('.')[1]
      while (numP.length > 3) {
        result = ',' + numP.slice(-3) + result
        numP = numP.slice(0, numP.length - 3)
      }
      if (numP) {
        result = numP + result
      }
      return result + '.' + numS + ''
    } else {
      numP = (num || 0) + ''
      while (numP.length > 3) {
        result = ',' + numP.slice(-3) + result
        numP = numP.slice(0, numP.length - 3)
      }
      if (numP) {
        result = numP + result
      }
      return result
    }
  },
  // 校验数值是否超出限制，最大10位，单位为万元
  checkNumber: function (value) {
    // value 是string类型，传入正数会出错
    console.log(value)
    var numValue
    if (value && value !== null && value.indexOf('.') > -1) {
      numValue = value.split('.')
    } else {
      numValue[0] = value
    }
    if (numValue !== null && numValue[0].length > 10) {
      return false
    }
    return true
  }
  // }
}

