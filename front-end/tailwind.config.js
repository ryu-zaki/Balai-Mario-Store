/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {

    screens: {

      "xxs": "375px",

      "xs": "440px",
      
      'sm': '620px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '970px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1180px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1280px',
      // => @media (min-width: 1536px) { ... }
    },

     colors: {
      "ash": "#f8f8f8",
      "dark": "#0c0403",
      "darkBrown": "#2e2517",
      "darkRed": "#3b1c10",
      "red": "#F14247",
      "lightRed": 'rgba(244,104,108, .1)',
      "brown": "#90591a",
      "lightGray": "#bbb",
      "lightGreen": "#C0FDE0",
      "lighterGray": "#f0f0f0",
      "gray": "#555",
      "pitch": "#EEA88D",
      "green": "#7ac142",
      "lightOrange": "#c46e24",
      "pureWhite": "#fff",
      "transparent": "rgba(0,0,0,0.0)",

      /* Lighter Colors */
      "lighterGreen": "#E1FFEA",
      "lighterRed": "#FBD9DA",
      "lighterOrange": "#F3E2D3",
      "lighterPitch": "#FFD6C7",

      /* Overlay */
      "darkOverlay": "rgba(46,37,23, .7)",
      "darkerOverlay": "rgba(0,0,0, .85)",
      "lightOverlay": "rgba(46,37,23, .5)",
      "imgOverlay": "rgba(46,37,23, .4)"
     }
  },
  plugins: [],
}

