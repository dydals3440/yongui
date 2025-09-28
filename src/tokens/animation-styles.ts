import { defineAnimationStyles } from "@pandacss/dev";

export const animationStyles = defineAnimationStyles({
  spin: {
    value: {
      animation: "spin 1s linear infinite",
    },
  },
  "spin-fast": {
    value: {
      animation: "spin 0.5s linear infinite",
    },
  },
  "spin-slow": {
    value: {
      animation: "spin 2s linear infinite",
    },
  },
  pulse: {
    value: {
      animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
    },
  },
  bounce: {
    value: {
      animation: "bounce 1s infinite",
    },
  },
  "fade-in": {
    value: {
      animation: "fade-in 0.2s ease-out",
    },
  },
  "fade-out": {
    value: {
      animation: "fade-out 0.2s ease-in",
    },
  },
  "slide-from-top": {
    value: {
      animation: "slide-from-top 0.3s ease-out",
    },
  },
  "slide-from-bottom": {
    value: {
      animation: "slide-from-bottom 0.3s ease-out",
    },
  },
  "slide-from-left": {
    value: {
      animation: "slide-from-left 0.3s ease-out",
    },
  },
  "slide-from-right": {
    value: {
      animation: "slide-from-right 0.3s ease-out",
    },
  },
  "scale-in": {
    value: {
      animation: "scale-in 0.2s ease-out",
    },
  },
  "scale-out": {
    value: {
      animation: "scale-out 0.2s ease-in",
    },
  },
});
