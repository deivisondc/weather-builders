module.exports = {
  setupFilesAfterEnv: ["./jest.setup.ts"],
  moduleNameMapper: {
    '\\.(scss|sass|css)$': 'identity-obj-proxy',
  },
};
