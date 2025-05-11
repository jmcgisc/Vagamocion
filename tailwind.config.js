module.exports = {
  darkMode: 'class', // 👈 esto activa el modo oscuro basado en clases
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'], 
        Montserrat: ['Montserrat'],
      },  
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: 0, transform: 'translateY(10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      colors: {
        primary: '#F17B21',   // NARANJA
        secondary: '#0C5170', // AZUL MARINO
        aqua: '#48bcd3',      // AZUL AGUA
        darkaqua: '#2AAAC3',      // Azul oscuro casi negro
        light: '#F3F4F6',     // Gris claro
      },
    },
  },
  plugins: [],
}