import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const questions = [];
let test = this.props.navigation.getparam("categories");
console.log(test);
export default function DetailScreen() {
  return (
    <View style={styles.container}>
      <Text>Fragen in dieser Kategorie:</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
