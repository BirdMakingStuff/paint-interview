import { Canvas } from "./Canvas.js";
import { ToolManager } from "./ToolManager.js";

const canvas = new Canvas("canvas", localStorage.getItem("canvasState"));
const toolManager = new ToolManager(canvas);
let isMouseDown = false;

// ...existing code...

setupEventListeners();

function setupEventListeners() {
  const canvasElement = canvas.element;
  const brushSizeInput = document.getElementById("brush-size");
  const brushColorInput = document.getElementById("brush-color");

  canvasElement.addEventListener("mousedown", (e) => {
    isMouseDown = true;
    console.log("mousedown");
    const currentTool = toolManager.getCurrentTool();
    currentTool.startDrawing(e);
  });

  canvasElement.addEventListener("mousemove", (e) => {
    if (isMouseDown) {
      console.log("mousemove");
      const currentTool = toolManager.getCurrentTool();
      currentTool.draw(e);
    }
  });

  canvasElement.addEventListener("mouseup", () => {
    console.log("mouseup");
    localStorage.setItem("canvasState", canvasElement.toDataURL());
    isMouseDown = false;
  });

  brushSizeInput.addEventListener("input", (e) => {
    const size = parseInt(e.target.value, 10);
    const currentTool = toolManager.getCurrentTool();
    if (currentTool.setSize) {
      currentTool.setSize(size);
    }
  });

  brushColorInput.addEventListener("input", (e) => {
    const color = e.target.value;
    const currentTool = toolManager.getCurrentTool();
    if (currentTool.setColor) {
      currentTool.setColor(color);
    }
  });


  canvasElement.addEventListener("mouseout", () => {
    console.log("mouseout");
    isMouseDown = false;
  });
}
