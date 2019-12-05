import React from 'react';
import { StyleSheet, Text, ScrollView, Button } from 'react-native';
import { TextInput } from 'react-native-paper';

const questions = [];



export default function DetailScreen(props) {
  props.navigation.getParam('category');
  return (
    <ScrollView>
      <Text>Name dieser Frage</Text>
      <TextInput
      editable/>
      <Text>Antworten:</Text>
      <TextInput
      placeholder="richtige Antwort"
      editable/>
      <Button 
      title="save"
      />
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
