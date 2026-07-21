const categories = ["头像", "封面", "表情包", "摄影"];

async function loadJson(path) {
  const response = await fetch(`${path}?v=${Date.now()}`, { cache: "no-store" });
  if (!response.ok) throw new Error(`无法读取 ${path}`);
  return response.json();
}

function applyContent(content) {
  if (content.meta?.title) document.title = content.meta.title;
  const description = document.querySelector('meta[name="description"]');
  if (description && content.meta?.description) {
    description.setAttribute("content", content.meta.description);
  }

  for (const element of document.querySelectorAll("[data-copy]")) {
    const value = content.copy?.[element.dataset.copy];
    if (typeof value === "string") {
      element.textContent = value;
      element.classList.toggle("preserve-breaks", value.includes("\n"));
    }
  }
  for (const element of document.querySelectorAll("[data-link]")) {
    const value = content.links?.[element.dataset.link];
    if (typeof value === "string") element.setAttribute("href", value);
  }
}

function renderGallery(galleryData) {
  for (const category of categories) {
    const items = Array.isArray(galleryData[category]) ? galleryData[category] : [];
    const gallery = document.querySelector(`[data-gallery="${category}"]`);
    const count = document.querySelector(`[data-category="${category}"] span`);
    if (count) count.textContent = String(items.length);
    if (!gallery) continue;

    const section = gallery.closest(".gallery-section");
    for (const threshold of [2, 4, 6, 8]) {
      section?.classList.toggle(`count-over-${threshold}`, items.length > threshold);
    }

    if (!items.length) {
      const empty = document.createElement("div");
      empty.className = "works-empty compact";
      const message = document.createElement("strong");
      message.textContent = "暂无作品";
      empty.append(message);
      gallery.replaceWith(empty);
      continue;
    }

    items.forEach((item, index) => {
      const card = document.createElement("article");
      card.className = "gallery-card";
      const imageFrame = document.createElement("div");
      imageFrame.className = "gallery-image";
      const image = document.createElement("img");
      image.src = item.src;
      image.alt = `${category}作品 ${index + 1}`;
      image.loading = "lazy";
      imageFrame.append(image);
      card.append(imageFrame);
      gallery.append(card);
    });
  }
}

function setupGalleryControls() {
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

  for (const toggle of document.querySelectorAll(".gallery-toggle")) {
    toggle.addEventListener("click", () => {
      const section = toggle.closest(".gallery-section");
      const willExpand = section.classList.contains("is-collapsed");
      section.classList.toggle("is-collapsed", !willExpand);
      toggle.setAttribute("aria-expanded", String(willExpand));
      toggle.firstChild.textContent = willExpand ? "收起" : "展开全部";
      toggle.querySelector("span").textContent = willExpand ? "↑" : "↓";
    });
  }
}

async function start() {
  setupGalleryControls();
  const [contentResult, galleryResult] = await Promise.allSettled([
    loadJson("content.json"),
    loadJson("gallery.json"),
  ]);
  if (contentResult.status === "fulfilled") applyContent(contentResult.value);
  if (galleryResult.status === "fulfilled") renderGallery(galleryResult.value);
}

start();
