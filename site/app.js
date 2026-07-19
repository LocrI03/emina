const buttons = [...document.querySelectorAll("[data-category]")];
const panels = [...document.querySelectorAll("[data-panel]")];

const works = {
  头像: [
    "avatar-01.jpg", "avatar-02.jpg", "avatar-03.jpg", "avatar-04.jpg",
    "avatar-05.jpg", "avatar-06.jpg", "avatar-07.jpg", "avatar-08.jpg",
    "avatar-09.jpg", "avatar-10.jpg", "avatar-11.jpg", "avatar-12.webp",
    "avatar-13.webp", "avatar-14.webp",
  ],
  封面: [
    "cover-01.jpg", "cover-02.jpg", "cover-03.jpg", "cover-04.webp",
    "cover-05.webp", "cover-06.webp", "cover-07.webp", "cover-08.jpg",
    "cover-09.webp", "cover-10.jpg",
  ],
  表情包: [
    "meme-01.jpg", "meme-02.jpg", "meme-03.jpg", "meme-04.jpg",
    "meme-05.jpg", "meme-06.jpg", "meme-07.jpg", "meme-08.jpg",
    "meme-09.jpg", "meme-10.jpg", "meme-11.jpg", "meme-12.jpg",
    "meme-13.jpg", "meme-14.jpg", "meme-15.jpg", "meme-16.webp",
    "meme-17.jpg", "meme-18.webp", "meme-19.jpg", "meme-20.webp",
    "meme-21.webp",
  ],
};

for (const [category, files] of Object.entries(works)) {
  const gallery = document.querySelector(`[data-gallery="${category}"]`);
  if (!gallery) continue;
  files.forEach((file, index) => {
    const card = document.createElement("article");
    card.className = "gallery-card";
    const imageFrame = document.createElement("div");
    imageFrame.className = "gallery-image";
    const image = document.createElement("img");
    image.src = `works/restored/${file}`;
    image.alt = `${category}作品 ${index + 1}`;
    image.loading = "lazy";
    imageFrame.append(image);
    card.append(imageFrame);
    gallery.append(card);
  });
}

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
