const buttons = [...document.querySelectorAll("[data-category]")];
const panels = [...document.querySelectorAll("[data-panel]")];

for (const button of buttons) {
  button.addEventListener("click", () => {
    const category = button.dataset.category;
    for (const item of buttons) {
      const active = item === button;
      item.classList.toggle("active", active);
      item.setAttribute("aria-pressed", String(active));
    }
    for (const panel of panels) {
      panel.hidden = panel.dataset.panel !== category;
    }
  });
}
