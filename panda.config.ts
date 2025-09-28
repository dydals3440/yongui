import { defineConfig } from "@pandacss/dev";
import { globalCss } from "./src/styles/globalCss";
import { animationStyles } from "./src/tokens/animation-styles";
import { borders, borderWidths } from "./src/tokens/borders";
import { colors, semanticColors } from "./src/tokens/colors";
import { radii } from "./src/tokens/radii";
import { spacing } from "./src/tokens/spacing";
import {
  fontSizes,
  fonts,
  fontWeights,
  letterSpacings,
  lineHeights,
  textStyles,
} from "./src/tokens/typography";

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ["./src/**/*.{js,jsx,ts,tsx}"],

  // Files to exclude
  exclude: [],

  globalCss,

  globalVars: {
    "--font-pretendard": "Pretendard Variable",
  },

  staticCss: {
    css: [
      {
        properties: {
          textStyle: Object.keys(textStyles),
          fontSize: Object.keys(fontSizes),
          fontWeight: Object.keys(fontWeights),
          gap: Object.keys(spacing || {}),
        },
      },
    ],
  },

  // Useful for theme customization
  theme: {
    extend: {
      animationStyles,
      textStyles,
      tokens: {
        borders,
        borderWidths,
        colors,
        fonts,
        fontWeights,
        fontSizes,
        letterSpacings,
        lineHeights,
        radii,
        spacing,
      },
      semanticTokens: {
        colors: semanticColors,
      },
      keyframes: {
        spin: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        bounce: {
          "0%, 100%": {
            transform: "translateY(-25%)",
            animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            transform: "translateY(0)",
            animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
          },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "fade-out": {
          from: { opacity: "1" },
          to: { opacity: "0" },
        },
        "slide-from-top": {
          from: { transform: "translateY(-100%)" },
          to: { transform: "translateY(0)" },
        },
        "slide-from-bottom": {
          from: { transform: "translateY(100%)" },
          to: { transform: "translateY(0)" },
        },
        "slide-from-left": {
          from: { transform: "translateX(-100%)" },
          to: { transform: "translateX(0)" },
        },
        "slide-from-right": {
          from: { transform: "translateX(100%)" },
          to: { transform: "translateX(0)" },
        },
        "scale-in": {
          from: { transform: "scale(0.95)", opacity: "0" },
          to: { transform: "scale(1)", opacity: "1" },
        },
        "scale-out": {
          from: { transform: "scale(1)", opacity: "1" },
          to: { transform: "scale(0.95)", opacity: "0" },
        },
      },
    },
  },
  // The output directory for your css system
  outdir: "styled-system",
});
