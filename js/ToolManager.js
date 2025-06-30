import { DrawingTool } from "./DrawingTool.js";
import { EraserTool } from "./EraserTool.js";

/**
 * @typedef {import('./Canvas.js').Canvas} Canvas
 */

export class ToolManager {
  /**
   * @param {Canvas} canvas
   */
  constructor(canvas) {
    this.canvas = canvas;
    this.currentTool = null;
    this.toolbarElement = null;

    this.tools = [
      {
        name: "Draw",
        icon: "✏️",
        instance: new DrawingTool(this.canvas),
      },
      {
        name: "Eraser",
        icon: "🧹",
        instance: new EraserTool(this.canvas),
      },
    ];

    this.createToolbar();
    this.setActiveTool("Draw");
  }

  createToolbar() {
    this.toolbarElement = document.querySelector(".toolbar");
    const toolsContainer = document.querySelector(".tools-container");

    for (const tool of this.tools) {
      const toolButton = this.createToolButton(tool);
      toolsContainer.appendChild(toolButton);
    }
  }

  createToolButton(tool) {
    const button = document.createElement("button");
    button.className = "tool-button";
    button.dataset.tool = tool.name;

    const icon = document.createElement("span");
    icon.className = "tool-icon";
    icon.textContent = tool.icon;

    const name = document.createElement("span");
    name.className = "tool-name";
    name.textContent = tool.name;

    button.appendChild(icon);
    button.appendChild(name);

    button.addEventListener("click", () => this.setActiveTool(tool.name));

    return button;
  }

  setActiveTool(toolName) {
    const tool = this.tools.find((t) => t.name === toolName);
    const brushSizeInput = document.getElementById("brush-size");
    const brushColorInput = document.getElementById("brush-color");

    this.toolbarElement.querySelectorAll(".tool-button").forEach((btn) => {
      btn.classList.remove("active");
    });

    const activeButton = this.toolbarElement.querySelector(
      `[data-tool="${toolName}"]`
    );
    if (activeButton) {
      activeButton.classList.add("active");
    }

    if (tool.instance.getSize) {
      brushSizeInput.disabled = false;
      brushSizeInput.value = tool.instance.getSize();
    } else {
      brushSizeInput.disabled = true;
    }

    if (tool.instance.setColor) {
      brushColorInput.disabled = false;
      /// brushColorInput.value = tool.instance.getColor ? tool.instance.getColor() : "#000000";
    } else {
      brushColorInput.disabled = true;
    }

    this.currentTool = tool.instance;
  }

  getCurrentTool() {
    return this.currentTool;
  }
}
