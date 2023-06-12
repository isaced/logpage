<script lang="ts">
  import { fade } from "svelte/transition";
  import fm from "./utils/front-matter";
  import markdown from "./utils/markdown";

  export let colors: Record<string, string> = {
    Fix: "#b26cee",
    New: "#3778ff",
    Breaking: "#ff9800",
  };
  export let changelog: string = undefined;

  let site = null;
  let html = null;

  async function loadData() {
    const res = await fetch(changelog ?? "/CHANGELOG.md");
    const markdownText = await res.text();
    const { body, attributes } = fm(markdownText);

    const html = markdown(body, {
      site: attributes,
      colors,
    });

    console.log({ body, attributes });

    return {
      site: attributes,
      html,
    };
  }

  loadData().then((data) => {
    site = data.site;
    html = data.html;
  });

  function getDomain(url: string) {
    return url.replace(/^https?:\/\//, "");
  }
</script>

<main>
  <div id="logpage-app">
    {#if site}
      <header class="logpage-header">
        <div class="container">
          <h1 class="logpage-title">
            <a href="url"><strong>{site.title} </strong> changelog</a>
          </h1>
          <div class="logpage-website"><a href={site.website}>{getDomain(site.website)}</a></div>
        </div>
      </header>

      <div class="logpage-body" in:fade>
        <div class="markdown-body container">{@html html}</div>
      </div>
    {:else}
      <div class="logpage-loading">
        <div class="loading-spin" />
      </div>
    {/if}
  </div>
</main>
