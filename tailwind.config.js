const { heroui } = require("@heroui/react");

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@heroui/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'anime-primary': '#8B5CF6',
        'anime-secondary': '#06B6D4',
        'dark-surface': '#1a1a1a',
        'dark-surface-2': '#242424'
      }
    },
  },
  darkMode: 'class', // wajib!
  plugins: [
    heroui({
      defaultTheme: 'dark',
      themes: {
        dark: {
          colors: {
            background: '#0a0a0a',
            foreground: '#ffffff',
            primary: '#8B5CF6',
            secondary: '#06B6D4'
          }
        }
      }
    })
  ],
};
