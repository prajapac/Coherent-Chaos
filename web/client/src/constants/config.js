// Prod specific settings
const prod = {
    API_ROOT_URL: 'http://52.14.173.109:5000/api'
};

// Dev specific settings
const dev = {
    // API_ROOT_URL: 'http://localhost:5000/api'
    API_ROOT_URL: 'http://18.191.224.215:5000/'
};

// Settings that are shared between prod and dev
const selectedConfig = (process.env.NODE_ENV === 'production' ? prod : dev); //eslint-disable-line

const config = {
    ...selectedConfig,

    GAME_RESOURCE_URL: `${selectedConfig.API_ROOT_URL}/game`,
};

export default config;
