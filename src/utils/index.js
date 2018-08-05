
/**
 * 根据起点终点返回方向 1向上 2向下 3向左 4向右 0未滑动
 * @param startX
 * @param startY
 * @param endX
 * @param endY
 * @returns {number}
 */
export const getTouchDirection = (startX, startY, endX, endY) => {
  let angX = endX - startX
  let angY = endY - startY
  let result = 0
  /**
   * 获得角度
   * @param x
   * @param y
   * @returns {number}
   */
  const getAngle = (x, y) => Math.atan2(x, y) * 180 / Math.PI
  
  // 如果滑动距离太短
  if (Math.abs(angX) < 2 && Math.abs(angY) < 2) {
    return result
  }
  
  let angle = getAngle(angX, angY)
  if (angle >= -135 && angle <= -45) {
    result = 3
  } else if (angle > 45 && angle < 135) {
    result = 4
  } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
    result = 1
  } else if (angle >= -45 && angle <= 45) {
    result = 2
  }
  return result
}

