import { useState } from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import dummyData from "../../dummyData";
import { playSound } from "../../services/soundHandler";
import { COLORS } from "../../constants";

const LEARNED_STATUS = 2;

// index of the next word (going round the list) that is not learned yet,
// or -1 if every word is learned
function findNextIndex(list, from) {
  for (let step = 1; step <= list.length; step++) {
    const index = (from + step) % list.length;
    if (list[index].status < LEARNED_STATUS) {
      return index;
    }
  }
  return -1;
}

export default function Play({ words }) {
  const [items, setItems] = useState(() =>
    (words ?? dummyData).map((item) => ({ ...item, status: item.status ?? 0 }))
  );
  const [current, setCurrent] = useState(() =>
    items.findIndex((item) => item.status < LEARNED_STATUS)
  );
  const [revealed, setRevealed] = useState(false);

  function goTo(index) {
    setCurrent(index);
    setRevealed(false);
  }

  function onDidNotKnow() {
    goTo(findNextIndex(items, current));
  }

  function onKnew() {
    const updated = items.map((item, index) =>
      index === current ? { ...item, status: item.status + 1 } : item
    );
    setItems(updated);
    goTo(findNextIndex(updated, current));
  }

  if (current === -1) {
    return (
      <View style={styles.container}>
        <Text style={styles.congrats}>Congrats!</Text>
        <Text style={styles.congrats}>For now you have learned all the words</Text>
      </View>
    );
  }

  const item = items[current];

  return (
    <View style={styles.container}>
      <Pressable style={styles.card} onPress={() => setRevealed(true)}>
        <Text style={styles.word}>{item.word}</Text>
        {revealed && (
          <>
            {item.phonetics ? (
              <Text style={styles.text}>{item.phonetics}</Text>
            ) : null}
            <Pressable
              style={styles.soundButton}
              disabled={!item.audio}
              onPress={() => playSound(item.audio)}
            >
              <Ionicons
                name="volume-medium-outline"
                size={28}
                color={item.audio ? COLORS.primary900 : COLORS.grey300}
              />
            </Pressable>
            <Text style={styles.text}>{item.meaning}</Text>
          </>
        )}
      </Pressable>
      {revealed && (
        <View style={styles.buttons}>
          <Pressable
            style={[styles.button, { backgroundColor: COLORS.secondary800 }]}
            onPress={onDidNotKnow}
          >
            <Text style={styles.buttonText}>Didn't know it</Text>
          </Pressable>
          <Pressable
            style={[styles.button, { backgroundColor: COLORS.primary900 }]}
            onPress={onKnew}
          >
            <Text style={styles.buttonText}>Knew it</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.appBackground,
    padding: 12,
  },
  card: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0.5,
    borderColor: COLORS.primary200,
    borderRadius: 4,
    padding: 10,
  },
  word: {
    fontSize: 32,
    fontWeight: "800",
    color: COLORS.fontMain,
    marginVertical: 20,
  },
  text: {
    fontSize: 18,
    textAlign: "center",
    color: COLORS.fontMain,
    marginVertical: 20,
  },
  soundButton: {
    padding: 6,
    marginVertical: 10,
  },
  buttons: {
    flexDirection: "row",
    gap: 16,
    marginTop: 16,
  },
  button: {
    flex: 1,
    height: 44,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 18,
    color: COLORS.fontMain,
  },
  congrats: {
    fontSize: 22,
    textAlign: "center",
    color: COLORS.fontMain,
    marginTop: 40,
  },
});
