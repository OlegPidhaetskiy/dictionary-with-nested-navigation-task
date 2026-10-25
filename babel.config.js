module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    // must be the last plugin in the list
    plugins: ["react-native-reanimated/plugin"],
  };
};
