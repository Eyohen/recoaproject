/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        'Open+Sans':['Open+Sans']
      }
    },
    backgroundImage: {
      'backcover': "url('https://newsverge.com/wp-content/uploads/2021/03/Shell.jpeg')",
     
    }
  },
  plugins: [],
}