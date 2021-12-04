

module.exports = {
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false, 
      net: false, 
      stream: false, 
      crypto: false, 
      http: false,
      child_process: false,
      process: false,
      fs: false,
      util: false,
      https: false,
      tls: false,
      path: false,
      os: false,
      zlib: false,
      
     };

    return config;
  },
  images: {
    domains: ['i.postimg.cc'],
  },

}
