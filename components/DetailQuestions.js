import React from 'react';
import { StyleSheet, Text, ScrollView, Button } from 'react-native';
import { TextInput } from 'react-native-paper';
import * as firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

const answers = [];
var title = "";
export default class DetailScreen extends React.Component {
    async getAnswers() {
      const snapshot = await firebase.firestore().collection('categories').get();
      return snapshot.docs.map(doc => doc.data());
    } 
    async addQuestion (question){
      const snapshot = await firebase.firestore().collection('question').add(question)
    }
  componentDidMount(){
  }
  render(){
    this.props.navigation.getParam('question');
    return (
      <ScrollView>
        <Text>Name dieser Frage</Text>
        <TextInput
          onChangeText = {text => title = text}
          editable/>
        <Text>Antworten:</Text>
        <TextInput
          label="richtige Antwort"
          editable/>
        <Text/>
        <TextInput
          label="Falsche Antwort"
          editable/>
        <Text/>      
        <TextInput
          label="Falsche Antwort"
          editable/>
        <Text/>      
        <TextInput
          label="Falsche Antwort"
          editable/>
        <Text/>      
        <TextInput
          label="Falsche Antwort"
          editable/>
        <Text/>      
        <TextInput
          label="Falsche Antwort"
          editable/>
        <Text/>      
        <Button
          style={styles.button} 
          title="save"
          onpress={()=> this.addQuestion({name:title})}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    margin:15,
    borderColor: 'black',
  }
});
