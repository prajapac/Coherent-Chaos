// Prod specific settings
const prod = {
    ROOT_URL: 'http://52.14.173.109:5000',
};

// Dev specific settings
const dev = {
    // ROOT_URL: 'http://localhost:5000'
    ROOT_URL: 'http://18.191.224.215:5000',
};

// Settings that are shared between prod and dev
const selectedConfig = (process.env.NODE_ENV === 'production' ? prod : dev); //eslint-disable-line

const config = {
    ...selectedConfig,

    LOGO_URL: `${selectedConfig.ROOT_URL}/logo.png`,
    LOGO_LONG_URL: `${selectedConfig.ROOT_URL}/logo_long.png`,
    GAME_RESOURCE_URL: `${selectedConfig.ROOT_URL}/api/game`,
    GAME_PING_INTERVAL_MILLISECONDS: 1000 * 2
};

export default config;
