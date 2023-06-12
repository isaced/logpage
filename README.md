# LogPage [![NPM version](https://img.shields.io/npm/v/logpage.svg?style=flat)](https://npmjs.com/package/logpage) [![NPM downloads](https://img.shields.io/npm/dm/logpage.svg?style=flat)](https://npmjs.com/package/loglive)

Helps you quickly deploy a live updated Changelog page based on a `CHANGELOG.md` file, inspired by [headwayapp.co](https://headwayapp.co/), [LogLive](https://github.com/egoist/loglive).

<img src="https://i.loli.net/2017/07/27/597995184bb02.png" width="800" alt="preview">

## Usage

You can simply create an `index.html` and include `logpage` there:

```html
<html>

<head>
    <title>LogPage Example</title>
    <link rel="stylesheet" href="https://unpkg.com/logpage/dist/style.css" />
</head>

<body>
  <div id="app"></div>
  <script src="https://unpkg.com/logpage"></script>
  <script>
    new LogPage({
      target: document.getElementById('app')
    });
  </script>
</body>

</html>
```

Then you can start to write a `CHANGELOG.md`, by default LogPage will read from `http://your-website/CHANGELOG.md`, however you can use a custom path:

```
new LogPage({
  target: document.getElementById('app'),
  props: {}
});
```

## Changelog Format

### Example

```md
# My Website

## Add TypeScript support (2016-07-23)

### New

- Now added Typescript support.
- Some other new stuffs.

### Fix

Fixed some babel problems.
```

### Site name

The value of `h1` heading will be used as website name:

```md
# My Website
```

### Changelog Title

Changelog title is an `h2` heading which consists of two parts, `title` and `date` and `date` is totally optional.

```md
## changelog title (date)
```

Sometime you just want to use semantic version as the changelog title:

```md
## 1.0.0 (2023-06-12)
```

### Change Type

Change type is an `h3` heading which describes the type of the change, eg: `Fix`. And it shows up like:

<img src="https://i.loli.net/2017/07/27/59797da5a89df.png" alt="change type" width="60">

By default we have pre-defined colors for specific types which include: `Fix` `Breaking` `New`, other types will get a random color.

You can also set color for custom change type:

```js
new LogPage({
    target: document.getElementById('app'),
    props: {
        colors: {
            'Bug fixes': '#342343'
        }
    }
});
```

## Front Matters

### website

You changelog is born for your product, so adding a link to your actual product is necessary:

```md
---
website: http://my-fantastic-app.com
---
```
