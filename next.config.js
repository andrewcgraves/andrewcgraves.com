module.exports = {
  async redirects() {
    // public/ has no directory-index resolution, so /greek-kana would 404
    // (or serve unstyled HTML on hosts that resolve it, since relative asset
    // paths break without the trailing slash)
    return [
      {
        source: "/greek-kana",
        destination: "/greek-kana/index.html",
        permanent: false,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "f004.backblazeb2.com",
        port: "",
        pathname: "/b2api/v1/**",
      },
    ],
  },
};
