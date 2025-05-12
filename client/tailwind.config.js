/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom-left': '-5px 5px 10px rgba(0, 0, 0, 0.3)',  // Shadow towards the left
        'custom-right': '5px 5px 10px rgba(0, 0, 0, 0.3)',   // Shadow towards the right
        'custom-top': '0 -5px 10px rgba(0, 0, 0, 0.3)',      // Shadow upwards
        'custom-bottom': '0 5px 10px rgba(0, 0, 0, 0.3)',    // Shadow downwards
      }
    },
  },
  plugins: [],
}

