const ENV_VARS = {
    MAPBOX_SECRET: process.env.MAPBOX_SECRET,
    GOOGLE_PLACES: process.env.GOOGLE_KEY,
    FAUNA_SECRET: process.env.FAUNA_SECRET
}

module.exports = {
    env: {
        ...ENV_VARS,
    }
}