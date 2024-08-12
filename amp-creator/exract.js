const sliders = [];
document.querySelectorAll(".wb_element > .wb_gallery").forEach((item) => {
  const jsDoc = item.parentNode.querySelector("script").innerHTML;
  const number = item.parentNode.parentNode
    .querySelector("a")
    .getAttribute("href")
    .replace("tel:", "");

  if (sliders.find((slider) => slider.number === number)) {
    return;
  }

  const imageMatches = jsDoc.match(/gallery_gen[^",]*/g) || [];
  const images = imageMatches
    .map((item) => item.split("?")[0].replace("gallery_gen\\/", "gallery_gen/"))
    .filter((image) => !image.endsWith("_fill.jpeg"));

  sliders.push({
    number,
    images,
  });
});
sliders;
