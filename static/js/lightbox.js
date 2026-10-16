// A tiny photo viewer ("lightbox") built on the native <dialog> element.
//
// Each thumbnail is a link to the full-size photo (templates/partials/gallery.html).
// This script opens the photo in a <dialog> on the same page instead.
// The browser gives us Esc-to-close and keyboard focus handling for free.

const dialog = document.querySelector("dialog.lightbox");

if (dialog) {
  const image = dialog.querySelector("img");
  const links = [...document.querySelectorAll("a.lightbox-link")];
  let current = 0;

  // Show photo number `index`, wrapping around at both ends of the list.
  function show(index) {
    current = (index + links.length) % links.length;
    const thumbnail = links[current].querySelector("img");
    image.srcset = thumbnail.srcset;   // same files the thumbnail chose from...
    image.sizes = "100vw";             // ...but now the photo fills the screen
    image.src = links[current].href;
    image.alt = thumbnail.alt;
  }

  // One listener for all thumbnails (event delegation, as in video.js).
  document.addEventListener("click", (event) => {
    const link = event.target.closest("a.lightbox-link");
    if (!link) return;
    event.preventDefault();
    show(links.indexOf(link));
    dialog.showModal();   // modal: page behind is inert, Esc closes
  });

  dialog.querySelector(".lightbox-close").addEventListener("click", () => dialog.close());
  dialog.querySelector(".lightbox-prev").addEventListener("click", () => show(current - 1));
  dialog.querySelector(".lightbox-next").addEventListener("click", () => show(current + 1));

  dialog.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") show(current - 1);
    if (event.key === "ArrowRight") show(current + 1);
  });

  // Clicking the dark area around the photo closes the viewer.
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
}
