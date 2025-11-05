const path = require('path');

module.exports = {
  content: [
    path.join(__dirname, 'index.html'),
    path.join(__dirname, 'src/**/*.{ts,tsx,js,jsx}'),
  ],
  theme: { extend: {} },
  plugins: [],
};
