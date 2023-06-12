import { marked } from "marked";
import createRender from "./renderer";

export default (text: string, opts: any) => {
  return marked(text, {
    renderer: createRender(opts),
  });
};
