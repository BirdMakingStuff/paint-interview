export class Canvas {
  /**
   * @param {string} canvasId
   */
  constructor(canvasId, imgData) {
    /** @type {HTMLCanvasElement} */
    this.element = document.getElementById(canvasId);
    /** @type {CanvasRenderingContext2D} */
    this.ctx = this.element.getContext("2d");
    this.clearCanvasBtn = document.getElementById("erase-canvas");
    this.clearCanvasBtn.addEventListener("click", () => {
      this.clearCanvas();
    });
    if (imgData) {
      const img = new window.Image();
      img.onload = () => {
        this.ctx.clearRect(0, 0, this.element.width, this.element.height);
        this.ctx.drawImage(img, 0, 0);
      };
      img.src = imgData;
    }
  }

  getMousePos(e) {
    const rect = this.element.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.element.width, this.element.height);
  }
}
