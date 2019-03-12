// Prod specific settings
const prod = {
    API_URL: 'http://52.14.173.109:5000/'
};

// Dev specific settings
const dev = {
    API_URL: 'http://18.191.224.215:5000/'
};

// Settings that are shared between prod and dev
const config = {

    ...(process.env.NODE_ENV === 'production' ? prod : dev) //eslint-disable-line
};

export default config;
