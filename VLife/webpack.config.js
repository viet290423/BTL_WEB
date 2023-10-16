const path = require('path');

module.exports = {
  entry: './start_server.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
