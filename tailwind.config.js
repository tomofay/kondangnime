const { heroui } = require("@heroui/react");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        // Netflix-style blue theme
        "netflix-bg": "#060B13",
        "netflix-surface": "#121c2b", 
        "netflix-surface-2": "#1a283d",
        "netflix-blue": "#47B2F6",
        "netflix-blue-light": "#b2cdfc",
        "netflix-accent": "#3B82F6"
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(to right, rgba(6,11,19,0.8), rgba(6,11,19,0.4), transparent)'
      }
    }
  },
  darkMode: "class",
  plugins: [
    heroui({
      defaultTheme: "dark",
      themes: {
        dark: {
          colors: {
            background: "#060B13",
            foreground: "#ffffff", 
            primary: "#47B2F6",
            secondary: "#3B82F6"
          }
        }
      }
    })
  ]
};
