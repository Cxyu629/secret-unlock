/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        blink: "myping 0.5s cubic-bezier(0.3, 0, 0.7, 1) ",
        "single-ping": "ping 0.5s cubic-bezier(0, 0, 0.2, 1) ",
      },
      keyframes: {
        myping: {
          "0%": {},
          "50%": {
            transform: "scale(1.3)",
            opacity: 60,
          },
          "100%": {
            transform: "scale(1)",
            opacity: 100,
          },
        },
      },
    },
  },
  plugins: [],
};
