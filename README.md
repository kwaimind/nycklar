# 🔑 `nycklar`

> A tiny proptype for keybindings, inspired by the [`tinykeys`](https://jamiebuilds.github.io/tinykeys/) lib

This is a tiny version of what `tinykeys` can do, and is more of a personal project than something you should use.

## Usage

```js
import { nycklar } from "nycklar";

nycklar(window, {
  "Shift+D": () => {
    console.log("pressed shift and d");
  },
  abc: () => {
    console.log("pressed the abc keys in order");
  },
});
```

### React Hooks Example

If you're using nycklar within a component, you should also make use of the returned `cleanup()` function.

```js
import { useEffect } from "react";
import { nycklar } from "nycklar";

const myKeybindingsHook = () => {
  useEffect(() => {
    let cleanup = nycklar(window, {
      // ...
    });
    return () => {
      cleanup();
    };
  });
};
```
