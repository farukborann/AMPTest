const fs = require("fs");

const main_template = fs.readFileSync("./templates/main_template.html", "utf8");
const slider_template = fs.readFileSync(
  "./templates/slider_template.html",
  "utf8"
);
const slider_image_template = fs.readFileSync(
  "./templates/slider_image_template.html",
  "utf8"
);

const values = JSON.parse(fs.readFileSync("./values.json", "utf8"));

function replaceVariable(template, variable, value) {
  return template.replace(new RegExp(`\\$\\{\\{${variable}\\}\\}`, "g"), value);
}

// Match ${{NORMAL}} and replace with values sliders in the template
const NormalSliderValues = values.filter((slider) => slider.type === "normal");
const GoldSliderValues = values.filter((slider) => slider.type === "gold");
const ClassSliderValues = values.filter((slider) => slider.type === "class");

const NormalSliders = GoldSliderValues.map((slider) => {
  const images = slider.images.map((image) =>
    replaceVariable(slider_image_template, "IMAGE", image)
  );

  const imagesReplaced = replaceVariable(
    slider_template,
    "IMAGES",
    images.join("")
  );
  return replaceVariable(imagesReplaced, "PHONE_NUMBER", slider.number);
}).join("");

const GoldSliders = NormalSliderValues.map((slider) => {
  const images = slider.images.map((image) =>
    replaceVariable(slider_image_template, "IMAGE", image)
  );

  const imagesReplaced = replaceVariable(
    slider_template,
    "IMAGES",
    images.join("")
  );
  return replaceVariable(imagesReplaced, "PHONE_NUMBER", slider.number);
}).join("");

const ClassSliders = ClassSliderValues.map((slider) => {
  const images = slider.images.map((image) =>
    replaceVariable(slider_image_template, "IMAGE", image)
  );

  const imagesReplaced = replaceVariable(
    slider_template,
    "IMAGES",
    images.join("")
  );
  return replaceVariable(imagesReplaced, "PHONE_NUMBER", slider.number);
}).join("");

const main = replaceVariable(main_template, "NORMAL", NormalSliders);
const main2 = replaceVariable(main, "GOLD", GoldSliders);
const main3 = replaceVariable(main2, "CLASS", ClassSliders);

fs.writeFileSync("./index.html", main3);
