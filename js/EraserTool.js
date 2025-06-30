/**
 * @typedef {import('./Canvas.js').Canvas} Canvas
 */

export class EraserTool {
  /**
   * @param {Canvas} canvas
   */
  constructor(canvas) {
    this.canvas = canvas;
    this.size = 5;
  }

  startDrawing(e) {
    const pos = this.canvas.getMousePos(e);
    this.canvas.ctx.beginPath();
    this.canvas.ctx.moveTo(pos.x, pos.y);
  }

  draw(e) {
    const pos = this.canvas.getMousePos(e);
    this.canvas.ctx.lineWidth = this.size;
    this.canvas.ctx.lineWidth = 30;
    this.canvas.ctx.strokeStyle = "#ffffff";
    this.canvas.ctx.lineTo(pos.x, pos.y);
    this.canvas.ctx.stroke();
  }

  setSize(size) {
    this.size = size;
  }

  getSize() {
    return this.size;
  }
  
}
