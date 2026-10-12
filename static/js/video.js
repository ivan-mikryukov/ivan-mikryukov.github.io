// Click-to-load YouTube player (the "facade" pattern).
//
// Each video starts as a plain link with a thumbnail (templates/partials/video.html).
// When it is clicked, we replace the link with YouTube's real player.
// If this script doesn't run, the link still opens the video on YouTube.

document.addEventListener("click", (event) => {
  // One listener for the whole page ("event delegation"): find out whether
  // the click landed inside a video link, and ignore it otherwise.
  const link = event.target.closest("a.video-facade");
  if (!link) return;

  event.preventDefault(); // stay on this page instead of following the link

  const id = encodeURIComponent(link.dataset.videoId);
  const player = document.createElement("iframe");
  // youtube-nocookie.com: YouTube's privacy-enhanced mode (no tracking cookies
  // until the visitor plays the video). autoplay=1: the click already means "play".
  player.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1`;
  player.title = link.dataset.title;
  player.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
  player.allowFullscreen = true;
  // YouTube refuses to play embeds that don't say which site they're on.
  player.referrerPolicy = "strict-origin-when-cross-origin";

  link.replaceWith(player);
});
