const { i18n } = require('./next-i18next.config')
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

module.exports = {
    i18n,
    experimental: {
        outputStandalone: true,
    },
    env: {
        imgUrl: 'https://api.myletter.app/StaticFiles/Images',
    },
    publicRuntimeConfig: {
        apiUrl: process.env.NODE_ENV === 'development'
            ? 'https://localhost:5001/v1' // development api
            : 'https://api.myletter.app/v1', // production api
        hubUrl: process.env.NODE_ENV === 'development'
            ? 'https://localhost:5001/hubs' // development api
            : 'https://api.myletter.app/hubs', // production api

        facebook: process.env.NODE_ENV === 'development'
            ? '380136030736866'
            : '527949172355502',



        imgUrl: process.env.NODE_ENV === 'development'
            ? 'https://localhost:5001/StaticFiles/Images' // development api
            : 'https://api.myletter.app/StaticFiles/Images' // production api

    },
    webpack: (config, { isServer }) => {
        if (!isServer) {
            // set 'fs' to an empty module on the client to prevent this error on build --> Error: Can't resolve 'fs'
            config.resolve.fallback = {
                fs: false,
                path: false
            }
        }

        return config;
    }
}
