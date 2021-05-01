/** Class representing an Operation */
module.exports = class Operation {
/**
 * @constructor
 * @param {int} x - The x value
 * @param {int} y - The y value
 */
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  /**
   * Get the sum
   * @returns {int} Sum of x and y
   */
  sum() {
    return this.x + this.y;
  }
};
