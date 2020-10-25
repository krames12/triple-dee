const ENV_VARS = {
    MAPBOX_SECRET: process.env.MAPBOX_SECRET,
    GOOGLE_PLACES: process.env.GOOGLE_KEY,
}

module.exports = {
    env: {
        ...ENV_VARS,
    }
}