import { Renderer } from "marked";
import { formatDistanceToNow, parseISO } from "date-fns";

const COLORS = [
  "#9e0734",
  "#016b18",
  "#4e6d00",
  "#42890c",
  "#457c0b",
  "#d1b908",
  "#a000d1",
  "#458704",
  "#0a1172",
  "#4c0172",
  "#377705",
  "#10a870",
  "#047531",
  "#870004",
  "#149903",
  "#01722c",
  "#073870",
  "#0f0d87",
  "#bf07bf",
  "#af0002",
];

const randomColor = () => {
  return COLORS[Math.floor(Math.random() * 20)];
};

const TITLE_REGEX = /^([^(]+)(?:\(([^)]+)\))?$/;

const matchChangelogTitle = (title) => {
  return TITLE_REGEX.exec(title);
};

export default ({ site, colors }) => {
  const renderer = new Renderer();

  const originalHeading = renderer.heading.bind(renderer);

  renderer.heading = (text, level, raw, slugger) => {
    if (level === 1) {
      site.title = text;
      return "";
    }

    if (level === 2) {
      const matched = matchChangelogTitle(raw);
      if (matched) {
        let [, title, date = ""] = matched;
        const dateParsed = date && parseISO(date);
        title = title.trim();
        return `<div class="logpage-logtitle">${originalHeading(
          title,
          level,
          title,
          slugger
        )}<time class="logpage-date" datetime="${dateParsed}">${
          date && formatDistanceToNow(dateParsed, { addSuffix: true })
        }</time></div>`;
      }
    }

    if (level === 3) {
      let res = '<div class="logpage-sep"></div>';
      const color = colors[raw.trim()] || randomColor();
      res +=
        originalHeading(text, level, raw, slugger).replace(
          /^<h3/,
          `<h3 style="background-color: ${color}" class="logpage-h3"`
        ) + '<div class="clearfix"></div>';
      return res;
    }

    return originalHeading(text, level, raw, slugger);
  };

  return renderer;
};
