/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      spacing: {
        sm: "8px",
        md: "16px",
        lg: "24px",
      },
      colors: {
        primary: "#474e56",
        secondary: "#b4bcc3",
        error: "#f78166",

        "income-card-background": "#ffffff",
        "outcome-card-background": "#fcf6c5",
        "input-container-background": "#3798d4",
        "button-background": "#ff876d",

        "input-border": "#2e77a4",
        "message-card-border": "#d6dcdf",
      },
    },
  },
  plugins: [],
};
