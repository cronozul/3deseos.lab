/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        reem: ['"Reem Kufi"', 'sans-serif'],
        jost: ['"Jost"', 'sans-serif'],
      },
      colors: {
        background: '#050505', // Very dark for immersive feel
        surface: '#111111',
        brand: {
          purple: '#402C5A',
          blue: '#316DBC',
          green: '#92DE8B',
          yellow: '#F5C00C',
          red: '#B1311A',
        }
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #402C5A 0%, #316DBC 50%, #92DE8B 100%)',
        'noise': "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')"
      }
    },
  },
  plugins: [],
}
