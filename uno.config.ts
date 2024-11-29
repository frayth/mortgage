import { defineConfig, presetUno } from 'unocss'

export default defineConfig({
  presets: [presetUno()],
  rules: [
    ['bg-primary-lime', { 'background-color': 'hsl(61, 70%, 52%)' }],
    ['primary-lime', { color: 'hsl(61, 70%, 52%)' }],
    ['primary-red', { color: 'hsl(4, 69%, 50%)' }],
    ['neutral-white', { color: 'hsl(0, 0%, 100%)' }],
    ['neutral-slate100', { 'background-color': 'hsl(202, 86%, 94%)' }],
    ['neutral-slate300', { 'background-color': 'hsl(203, 41%, 72%)' }],
    ['neutral-slate500', { color: 'hsl(200, 26%, 54%)' }],
    ['neutral-slate700', { color: 'hsl(200, 24%, 40%)' }],
    ['bg-neutral-slate700', { 'backgound-color': 'hsl(200, 26%, 54%)' }],
    ['neutral-slate900', { color: 'hsl(202, 55%, 16%)' }],
    ['bg-neutral-slate900', { 'backgound-color': 'hsl(202, 55%, 16%)' }],
  ],
  // ...UnoCSS options
})
