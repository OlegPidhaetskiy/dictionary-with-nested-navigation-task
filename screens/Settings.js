import { useState } from "react";
import { View, StyleSheet, Text, Switch } from "react-native";

import { COLORS, COLORS_LIGHT } from "../constants";

function Settings() {
  const [isDark, setIsDark] = useState(true);
  const theme = isDark ? COLORS : COLORS_LIGHT;

  return (
    <View style={[styles.container, { backgroundColor: theme.appBackground }]}>
      <Text style={[styles.title, { color: theme.fontMain }]}>
        Choose color theme:
      </Text>
      <View style={styles.switchRow}>
        <Text style={[styles.label, { color: theme.fontMain }]}>Light</Text>
        <Switch
          value={isDark}
          onValueChange={setIsDark}
          trackColor={{ false: theme.grey300, true: theme.primary300 }}
          thumbColor={theme.primary900}
        />
        <Text style={[styles.label, { color: theme.fontMain }]}>Dark</Text>
      </View>
    </View>
  );
}

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    marginBottom: 30,
  },
  switchRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    fontSize: 18,
    marginHorizontal: 12,
  },
});
