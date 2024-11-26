---
title: useScroll
---

`useScroll` is used to create scroll-linked animations, like progress indicators and parallax effects.

```ts
const { scrollYProgress } = useScroll()

<Motion :style="{ scaleX: scrollYProgress }" />

```

## Usage

```ts
import { useScroll } from 'motion-v'
```
`useScroll` returns four motion values:

- `scrollX`/`Y`: The absolute scroll position, in pixels.
- `scrollXProgress`/`YProgress`: The scroll position between the defined offsets, as a value between 0 and 1.

## Page scroll

By default, `useScroll` tracks the page scroll.

```ts
const { scrollY } = useScroll()

useMotionValueEvent(scrollY, 'change', (latest) => {
  console.log('Page scroll: ', latest)
})
```

For example, we could show a page scroll indicator by passing `scrollYProgress` straight to the `scaleX` style of a progress bar.

<iframe src="https://stackblitz.com/edit/vitejs-vite-eseump?ctl=1&embed=1&file=src%2FApp.vue&hideExplorer=1"
     style="width:100%; height: 500px; border:0; border-radius: 4px; overflow:hidden;"
     title="motion-use-spring"
    allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts allow-downloads allow-pointer-lock"
   ></iframe>

As `useScroll` returns motion values, we can compose this scroll info with other motion value hooks like `useTransform` and `useSpring`:

## for more

[motion-dev docs](https://motion.dev/docs/react-use-scroll)
