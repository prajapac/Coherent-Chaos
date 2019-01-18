// Prod specific settings
const prod = {

};

// Dev specific settings
const dev = {

};

// Settings that are shared between prod and dev
const config = {

    ...(process.env.NODE_ENV === 'production' ? prod : dev)
};

export default config;
