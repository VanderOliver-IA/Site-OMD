/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                dark: "#0a0a0a",
                card: "rgba(255, 255, 255, 0.05)",
                primary: {
                    cyan: "#00f3ff",
                    magenta: "#ff00ff",
                },
                omd: {
                    gray: "#a0a0a0",
                }
            },
            backgroundImage: {
                'omd-gradient': "linear-gradient(135deg, #00f3ff, #ff00ff)",
            },
            backdropBlur: {
                glass: "10px",
            }
        },
    },
    plugins: [],
}
