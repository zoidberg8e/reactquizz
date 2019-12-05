import React from 'react';
import { StyleSheet, Text, ScrollView } from 'react-native';
import { TextInput } from 'react-native-paper';

const questions = [];



export default function DetailScreen(props) {
  props.navigation.getParam('category');
  return (
    <ScrollView>
      <Text>Name dieser Kategorie:</Text>
      <TextInput
      editable/>
      <Text>Fragen in dieser Kategorie:</Text>
      <TextInput
      editable/>
    </ScrollView>
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
