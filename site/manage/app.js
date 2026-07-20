const OWNER = "LocrI03";
const REPO = "emina";
const BRANCH = "main";
const CATEGORIES = ["头像", "封面", "表情包", "摄影"];

const state = {
  token: "",
  gallery: null,
  content: null,
  activeCategory: "头像",
  pendingUploads: new Map(),
  dirtyImages: false,
  dirtyContent: false,
  dragIndex: null,
};

const contentSections = [
  {
    title: "网站与导航",
    fields: [
      ["meta.title", "浏览器标题"], ["meta.description", "网站描述", "textarea"],
      ["copy.brandName", "左上角名称"], ["copy.brandSub", "左上角副标题"],
      ["copy.navExperience", "导航：经历"], ["copy.navWorks", "导航：图片"],
      ["copy.navVideos", "导航：视频"], ["copy.navContact", "导航：联系"],
      ["copy.navEmail", "导航：邮箱按钮"]
    ]
  },
  {
    title: "首页首屏",
    fields: [
      ["copy.heroEyebrow", "顶部英文标签", "wide"],
      ["copy.heroTitleMain", "主标题"], ["copy.heroTitleAccent", "强调标题"],
      ["copy.heroIntro", "个人介绍", "textarea wide"], ["copy.heroCta", "经历按钮"],
      ["copy.stickerTop", "贴纸文字一"], ["copy.stickerSide", "贴纸文字二"],
      ["copy.captionMain", "头像下方主文字"], ["copy.captionSub", "头像下方副文字"]
    ]
  },
  {
    title: "内容与经历",
    fields: [
      ["copy.experienceIndex", "章节编号"], ["copy.experienceTitle", "章节标题"],
      ["copy.overviewOne", "简介第一段", "textarea wide"], ["copy.overviewTwo", "简介第二段", "textarea wide"],
      ["copy.experienceOneMeta", "经历一类型"], ["copy.experienceOneTitle", "经历一标题"],
      ["copy.experienceOneBody", "经历一内容", "textarea wide"],
      ["copy.experienceOneTagOne", "经历一标签 1"], ["copy.experienceOneTagTwo", "经历一标签 2"],
      ["copy.experienceOneTagThree", "经历一标签 3"], ["copy.experienceOneTagFour", "经历一标签 4"],
      ["copy.experienceTwoMeta", "经历二类型"], ["copy.experienceTwoTitle", "经历二标题"],
      ["copy.experienceTwoBody", "经历二内容", "textarea wide"],
      ["copy.experienceTwoTagOne", "经历二标签 1"], ["copy.experienceTwoTagTwo", "经历二标签 2"],
      ["copy.experienceTwoTagThree", "经历二标签 3"], ["copy.experienceTwoTagFour", "经历二标签 4"]
    ]
  },
  {
    title: "技能",
    fields: [
      ["copy.skillsTitle", "技能标题"], ["copy.skillsDescription", "技能说明"],
      ["copy.skillOneMeta", "技能组一标题"], ["copy.skillOneText", "技能组一内容", "textarea"],
      ["copy.skillTwoMeta", "技能组二标题"], ["copy.skillTwoText", "技能组二内容", "textarea"],
      ["copy.skillThreeMeta", "技能组三标题"], ["copy.skillThreeText", "技能组三内容", "textarea"],
      ["copy.skillFourMeta", "技能组四标题"], ["copy.skillFourText", "技能组四内容", "textarea"]
    ]
  },
  {
    title: "图片与视频章节",
    fields: [
      ["copy.worksIndex", "图片章节编号"], ["copy.worksTitle", "图片章节标题"],
      ["copy.videosIndex", "视频章节编号"], ["copy.videosTitle", "视频章节标题"],
      ["copy.videosPageLink", "B 站主页按钮"], ["copy.collectionsTitle", "合集标题"],
      ["copy.collectionOneTitle", "合集一名称"], ["links.collectionOne", "合集一链接", "wide"],
      ["copy.collectionTwoTitle", "合集二名称"], ["links.collectionTwo", "合集二链接", "wide"],
      ["copy.collectionThreeTitle", "合集三名称"], ["links.collectionThree", "合集三链接", "wide"],
      ["copy.collectionFourTitle", "合集四名称"], ["links.collectionFour", "合集四链接", "wide"]
    ]
  },
  {
    title: "单个视频与同人制作",
    fields: [
      ["copy.singleVideosTitle", "单个视频标题"],
      ["copy.videoOneTitle", "视频一名称", "textarea"], ["copy.videoOneDuration", "视频一时长"], ["links.videoOne", "视频一链接", "wide"],
      ["copy.videoTwoTitle", "视频二名称", "textarea"], ["copy.videoTwoDuration", "视频二时长"], ["links.videoTwo", "视频二链接", "wide"],
      ["copy.videoThreeTitle", "视频三名称", "textarea"], ["copy.videoThreeDuration", "视频三时长"], ["links.videoThree", "视频三链接", "wide"],
      ["copy.fanVideosTitle", "同人制作标题"],
      ["copy.fanOneTitle", "同人作品一名称", "textarea"], ["copy.fanOneDuration", "同人作品一时长"], ["links.fanOne", "同人作品一链接", "wide"],
      ["copy.fanTwoTitle", "同人作品二名称", "textarea"], ["copy.fanTwoDuration", "同人作品二时长"], ["links.fanTwo", "同人作品二链接", "wide"]
    ]
  },
  {
    title: "联系与页尾",
    fields: [
      ["copy.contactIndex", "联系章节编号"], ["copy.contactTitle", "联系标题"],
      ["copy.emailLabel", "邮箱标签"], ["copy.email", "邮箱地址"],
      ["copy.platformLabel", "平台标签"], ["copy.xiaohongshuLabel", "小红书文字"],
      ["links.xiaohongshu", "小红书链接", "wide"], ["copy.bilibiliLabel", "哔哩哔哩文字"],
      ["links.bilibili", "哔哩哔哩链接", "wide"], ["links.bilibiliHome", "顶部 B 站主页链接", "wide"],
      ["copy.footerLeft", "页尾左侧"], ["copy.footerMiddle", "页尾中间"], ["copy.footerTop", "返回顶部文字"]
    ]
  }
];

const tokenInput = document.querySelector("#token");
const connectButton = document.querySelector("#connect");
const authStatus = document.querySelector("#auth-status");
const manager = document.querySelector("#manager");
const saveState = document.querySelector("#save-state");
const categoryTabs = document.querySelector("#category-tabs");
const imageList = document.querySelector("#image-list");
const uploadCategory = document.querySelector("#upload-category");
const fileInput = document.querySelector("#file-input");
const dropZone = document.querySelector("#drop-zone");
const uploadNote = document.querySelector("#upload-note");
const contentForm = document.querySelector("#content-form");
const toast = document.querySelector("#toast");

function showToast(message, error = false) {
  toast.textContent = message;
  toast.classList.toggle("error", error);
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 3200);
}

function updateSaveState() {
  const dirty = state.dirtyImages || state.dirtyContent;
  saveState.textContent = dirty ? "有尚未保存的修改" : "所有修改已保存";
}

function getPath(object, path) {
  return path.split(".").reduce((value, key) => value?.[key], object) ?? "";
}

function setPath(object, path, value) {
  const keys = path.split(".");
  const finalKey = keys.pop();
  const target = keys.reduce((current, key) => current[key], object);
  target[finalKey] = value;
}

function utf8ToBase64(text) {
  return bytesToBase64(new TextEncoder().encode(text));
}

function base64ToUtf8(base64) {
  const binary = atob(base64.replace(/\s/g, ""));
  const bytes = Uint8Array.from(binary, character => character.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

function bytesToBase64(bytes) {
  let binary = "";
  const chunkSize = 0x8000;
  for (let index = 0; index < bytes.length; index += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(index, index + chunkSize));
  }
  return btoa(binary);
}

async function github(path, options = {}) {
  const response = await fetch(`https://api.github.com${path}`, {
    ...options,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${state.token}`,
      "X-GitHub-Api-Version": "2026-03-10",
      ...(options.headers || {})
    }
  });
  const payload = response.status === 204 ? null : await response.json().catch(() => null);
  if (!response.ok) {
    const message = payload?.message || `GitHub 请求失败（${response.status}）`;
    throw new Error(message);
  }
  return payload;
}

async function loadJsonFile(path) {
  const file = await github(`/repos/${OWNER}/${REPO}/contents/${path}?ref=${BRANCH}`);
  return JSON.parse(base64ToUtf8(file.content));
}

async function commitFiles(files, message) {
  const reference = await github(`/repos/${OWNER}/${REPO}/git/ref/heads/${BRANCH}`);
  const parentSha = reference.object.sha;
  const parentCommit = await github(`/repos/${OWNER}/${REPO}/git/commits/${parentSha}`);

  const entries = await Promise.all(files.map(async file => {
    const blob = await github(`/repos/${OWNER}/${REPO}/git/blobs`, {
      method: "POST",
      body: JSON.stringify({ content: file.base64, encoding: "base64" })
    });
    return { path: file.path, mode: "100644", type: "blob", sha: blob.sha };
  }));

  const tree = await github(`/repos/${OWNER}/${REPO}/git/trees`, {
    method: "POST",
    body: JSON.stringify({ base_tree: parentCommit.tree.sha, tree: entries })
  });
  const commit = await github(`/repos/${OWNER}/${REPO}/git/commits`, {
    method: "POST",
    body: JSON.stringify({ message, tree: tree.sha, parents: [parentSha] })
  });
  await github(`/repos/${OWNER}/${REPO}/git/refs/heads/${BRANCH}`, {
    method: "PATCH",
    body: JSON.stringify({ sha: commit.sha, force: false })
  });
}

async function connect() {
  const token = tokenInput.value.trim();
  if (!token) {
    authStatus.textContent = "请先粘贴令牌。";
    authStatus.className = "status error";
    return;
  }
  state.token = token;
  connectButton.disabled = true;
  authStatus.textContent = "正在读取网站内容…";
  authStatus.className = "status";
  try {
    await github(`/repos/${OWNER}/${REPO}`);
    const [content, gallery] = await Promise.all([
      loadJsonFile("site/content.json"),
      loadJsonFile("site/gallery.json")
    ]);
    state.content = content;
    state.gallery = gallery;
    tokenInput.value = "";
    manager.hidden = false;
    authStatus.textContent = "已连接。关闭页面后需要重新输入令牌。";
    renderCategoryTabs();
    renderImages();
    renderContentForm();
    updateSaveState();
  } catch (error) {
    state.token = "";
    authStatus.textContent = `连接失败：${error.message}`;
    authStatus.className = "status error";
  } finally {
    connectButton.disabled = false;
  }
}

function renderCategoryTabs() {
  categoryTabs.replaceChildren();
  for (const category of CATEGORIES) {
    const button = document.createElement("button");
    button.type = "button";
    button.classList.toggle("active", category === state.activeCategory);
    button.append(document.createTextNode(category));
    const count = document.createElement("span");
    count.textContent = String(state.gallery[category]?.length || 0);
    button.append(count);
    button.addEventListener("click", () => {
      state.activeCategory = category;
      uploadCategory.textContent = category;
      renderCategoryTabs();
      renderImages();
    });
    categoryTabs.append(button);
  }
}

function markImagesDirty() {
  state.dirtyImages = true;
  updateSaveState();
}

function moveImage(from, to) {
  const items = state.gallery[state.activeCategory];
  if (to < 0 || to >= items.length || from === to) return;
  const [item] = items.splice(from, 1);
  items.splice(to, 0, item);
  markImagesDirty();
  renderImages();
}

function removeImage(index) {
  const items = state.gallery[state.activeCategory];
  const [item] = items.splice(index, 1);
  if (item?.pendingPath) state.pendingUploads.delete(item.pendingPath);
  if (item?.previewUrl) URL.revokeObjectURL(item.previewUrl);
  markImagesDirty();
  renderCategoryTabs();
  renderImages();
}

function renderImages() {
  imageList.replaceChildren();
  uploadCategory.textContent = state.activeCategory;
  const items = state.gallery[state.activeCategory] || [];
  items.forEach((item, index) => {
    const article = document.createElement("article");
    article.className = "image-item";
    if (state.activeCategory === "摄影") article.classList.add("photo");
    if (state.activeCategory === "封面") article.classList.add("cover");
    article.draggable = true;
    const image = document.createElement("img");
    image.src = item.previewUrl || `../${item.src}`;
    image.alt = `${state.activeCategory}作品 ${index + 1}`;
    const actions = document.createElement("div");
    actions.className = "image-actions";
    const handle = document.createElement("span");
    handle.className = "drag-handle";
    handle.textContent = `拖动 · ${index + 1}`;
    const up = document.createElement("button");
    up.type = "button"; up.textContent = "↑"; up.title = "向前移动";
    up.addEventListener("click", () => moveImage(index, index - 1));
    const down = document.createElement("button");
    down.type = "button"; down.textContent = "↓"; down.title = "向后移动";
    down.addEventListener("click", () => moveImage(index, index + 1));
    const remove = document.createElement("button");
    remove.type = "button"; remove.textContent = "×"; remove.title = "从主页删除"; remove.className = "delete";
    remove.addEventListener("click", () => removeImage(index));
    actions.append(handle, up, down, remove);
    article.append(image, actions);
    article.addEventListener("dragstart", () => {
      state.dragIndex = index;
      article.classList.add("dragging");
    });
    article.addEventListener("dragend", () => {
      state.dragIndex = null;
      article.classList.remove("dragging");
      document.querySelectorAll(".drop-target").forEach(node => node.classList.remove("drop-target"));
    });
    article.addEventListener("dragover", event => {
      event.preventDefault();
      article.classList.add("drop-target");
    });
    article.addEventListener("dragleave", () => article.classList.remove("drop-target"));
    article.addEventListener("drop", event => {
      event.preventDefault();
      article.classList.remove("drop-target");
      if (state.dragIndex !== null) moveImage(state.dragIndex, index);
    });
    imageList.append(article);
  });
}

async function optimizeImage(file) {
  const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif"];
  if (!allowed.includes(file.type)) throw new Error(`${file.name} 不是支持的图片格式`);
  if (file.size > 30 * 1024 * 1024) throw new Error(`${file.name} 超过 30MB`);
  if (file.type === "image/gif") {
    if (file.size > 12 * 1024 * 1024) throw new Error(`${file.name} 超过 GIF 的 12MB 限制`);
    return { bytes: new Uint8Array(await file.arrayBuffer()), extension: "gif", blob: file };
  }
  const bitmap = await createImageBitmap(file);
  const maxEdge = 2560;
  const scale = Math.min(1, maxEdge / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(bitmap.width * scale));
  canvas.height = Math.max(1, Math.round(bitmap.height * scale));
  canvas.getContext("2d").drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  const blob = await new Promise((resolve, reject) => {
    canvas.toBlob(result => result ? resolve(result) : reject(new Error("图片压缩失败")), "image/webp", 0.86);
  });
  return { bytes: new Uint8Array(await blob.arrayBuffer()), extension: "webp", blob };
}

async function addFiles(fileList) {
  const files = [...fileList];
  if (!files.length) return;
  uploadNote.textContent = `正在处理 ${files.length} 张图片…`;
  try {
    for (const file of files) {
      const optimized = await optimizeImage(file);
      const id = `${Date.now()}-${crypto.randomUUID().slice(0, 8)}`;
      const src = `works/uploads/${id}.${optimized.extension}`;
      const previewUrl = URL.createObjectURL(optimized.blob);
      state.pendingUploads.set(src, optimized.bytes);
      state.gallery[state.activeCategory].push({ src, previewUrl, pendingPath: src });
    }
    markImagesDirty();
    renderCategoryTabs();
    renderImages();
    uploadNote.textContent = `已加入 ${files.length} 张，点击“保存图片修改”后发布。`;
  } catch (error) {
    uploadNote.textContent = error.message;
    showToast(error.message, true);
  } finally {
    fileInput.value = "";
  }
}

function galleryForSaving() {
  const clean = {};
  for (const category of CATEGORIES) {
    clean[category] = state.gallery[category].map(item => ({ src: item.src }));
  }
  return clean;
}

async function saveImages() {
  if (!state.dirtyImages) return showToast("图片没有需要保存的修改");
  const button = document.querySelector("#save-images");
  button.disabled = true;
  button.textContent = "正在保存…";
  try {
    const files = [...state.pendingUploads.entries()].map(([src, bytes]) => ({
      path: `site/${src}`,
      base64: bytesToBase64(bytes)
    }));
    files.push({
      path: "site/gallery.json",
      base64: utf8ToBase64(`${JSON.stringify(galleryForSaving(), null, 2)}\n`)
    });
    await commitFiles(files, "content: update gallery from manager");
    for (const category of CATEGORIES) {
      state.gallery[category] = state.gallery[category].map(item => {
        if (item.previewUrl) URL.revokeObjectURL(item.previewUrl);
        return { src: item.src };
      });
    }
    state.pendingUploads.clear();
    state.dirtyImages = false;
    updateSaveState();
    renderImages();
    showToast("图片修改已保存，主页即将自动更新");
  } catch (error) {
    showToast(`保存失败：${error.message}`, true);
  } finally {
    button.disabled = false;
    button.textContent = "保存图片修改";
  }
}

function renderContentForm() {
  contentForm.replaceChildren();
  for (const section of contentSections) {
    const group = document.createElement("section");
    group.className = "content-group";
    const title = document.createElement("h3");
    title.textContent = section.title;
    const grid = document.createElement("div");
    grid.className = "field-grid";
    for (const [path, labelText, options = ""] of section.fields) {
      const field = document.createElement("div");
      field.className = "field";
      if (options.includes("wide")) field.classList.add("wide");
      const label = document.createElement("label");
      label.textContent = labelText;
      const control = options.includes("textarea") ? document.createElement("textarea") : document.createElement("input");
      control.value = getPath(state.content, path);
      control.dataset.path = path;
      if (path.startsWith("links.")) control.type = "url";
      control.addEventListener("input", () => {
        setPath(state.content, path, control.value);
        state.dirtyContent = true;
        updateSaveState();
      });
      field.append(label, control);
      grid.append(field);
    }
    group.append(title, grid);
    contentForm.append(group);
  }
}

async function saveContent() {
  if (!state.dirtyContent) return showToast("文字没有需要保存的修改");
  const button = document.querySelector("#save-content");
  button.disabled = true;
  button.textContent = "正在保存…";
  try {
    const email = state.content.copy.email.trim();
    if (email) {
      state.content.copy.heroEmail = email;
      state.content.links.email = `mailto:${email}`;
    }
    await commitFiles([{
      path: "site/content.json",
      base64: utf8ToBase64(`${JSON.stringify(state.content, null, 2)}\n`)
    }], "content: update site copy from manager");
    state.dirtyContent = false;
    updateSaveState();
    showToast("文字修改已保存，主页即将自动更新");
  } catch (error) {
    showToast(`保存失败：${error.message}`, true);
  } finally {
    button.disabled = false;
    button.textContent = "保存文字修改";
  }
}

connectButton.addEventListener("click", connect);
tokenInput.addEventListener("keydown", event => {
  if (event.key === "Enter") connect();
});
document.querySelectorAll("[data-tab]").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-tab]").forEach(item => item.classList.toggle("active", item === button));
    document.querySelectorAll(".tab-panel").forEach(panel => panel.classList.toggle("active", panel.dataset.panel === button.dataset.tab));
  });
});
fileInput.addEventListener("change", () => addFiles(fileInput.files));
for (const eventName of ["dragenter", "dragover"]) {
  dropZone.addEventListener(eventName, event => {
    event.preventDefault();
    dropZone.classList.add("dragging");
  });
}
for (const eventName of ["dragleave", "drop"]) {
  dropZone.addEventListener(eventName, event => {
    event.preventDefault();
    dropZone.classList.remove("dragging");
  });
}
dropZone.addEventListener("drop", event => addFiles(event.dataTransfer.files));
document.querySelector("#save-images").addEventListener("click", saveImages);
document.querySelector("#save-content").addEventListener("click", saveContent);
window.addEventListener("beforeunload", event => {
  if (state.dirtyImages || state.dirtyContent) {
    event.preventDefault();
    event.returnValue = "";
  }
});
