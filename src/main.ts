import App from "./App.svelte";

import "github-markdown-css/github-markdown.css";
import "./app.css";

// interface LogPageOptions {
//   el: Element | Document | ShadowRoot;
//   changelog: string;
//   colors: Record<string, string>;
// }

// export default class LogPage {
//   constructor({ el, changelog, colors }: LogPageOptions) {
//     return new App({
//       target: el,
//       props: {
//         changelog,
//         colors,
//       },
//     });
//   }
// }

export default App;
