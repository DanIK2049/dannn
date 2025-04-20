document.addEventListener("DOMContentLoaded", () => {
  const el = document.getElementById("content");
  if (!el) return;

  const section = el.getAttribute("data-section");
  const data = JSON.parse(localStorage.getItem("eduContent") || "{}");

  if (data[section]) {
    el.innerHTML = data[section];
  } else {
    el.innerHTML = "<p style='color:gray;'>Контент табылмады.</p>";
  }
});


function convertYouTubeLinksToIframe(text) {
  const urlRegex = /(https?:\/\/www\.youtube\.com\/watch\?v=([\w-]{11}))/g;
  return text.replace(urlRegex, (_, full, id) => {
    return `<iframe src="https://www.youtube.com/embed/${id}" allowfullscreen></iframe>`;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const contentEl = document.getElementById("content");
  if (contentEl) {
    const section = contentEl.getAttribute("data-section");
    const data = JSON.parse(localStorage.getItem("eduContent") || "{}");
    const raw = data[section] || "Контент табылмады.";
    contentEl.innerHTML = convertYouTubeLinksToIframe(raw);
  }
});


// Патчим подстановку контента при загрузке
document.addEventListener("DOMContentLoaded", () => {
  const contentEl = document.getElementById("content");
  if (contentEl) {
    const section = contentEl.getAttribute("data-section");
    const data = JSON.parse(localStorage.getItem("eduContent") || "{}");
    const raw = data[section] || "Контент табылмады.";
    contentEl.innerHTML = convertYouTubeLinksToIframe(raw);
  }
});
