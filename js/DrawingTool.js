/**
 * @typedef {import('./Canvas.js').Canvas} Canvas
 */

export class DrawingTool {
  /**
   * @param {Canvas} canvas
   */
  constructor(canvas) {
    this.canvas = canvas;
    this.size = 5;
    this.color = "#000000"; // Default color
  }

  startDrawing(e) {
    this.canvas.ctx.lineWidth = this.size;
    const pos = this.canvas.getMousePos(e);
    this.canvas.ctx.beginPath();
    this.canvas.ctx.moveTo(pos.x, pos.y);
  }

  draw(e) {
    const pos = this.canvas.getMousePos(e);
    this.canvas.ctx.lineWidth = this.size;
    this.canvas.ctx.strokeStyle = this.color;
    this.canvas.ctx.lineTo(pos.x, pos.y);
    this.canvas.ctx.stroke();
  }

  setSize(size) {
    this.size = size;
  }

  getSize() {
    return this.size;
  }

  setColor(color) {
    this.color = color;
  }

}
