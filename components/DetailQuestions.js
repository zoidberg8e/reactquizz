import React from 'react';
import { StyleSheet, Text, ScrollView, Button } from 'react-native';
import { TextInput } from 'react-native-paper';
import * as firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';
import { db } from '../firebase';

let addCategory = item => {
  db.ref('/questions').push({
    name: item
  });
};

let answersRef = db.ref('/answers');

export default class DetailScreen extends React.Component {
  state = {
    name: '',
    category: '',
    question: '',
    answer1: '',
    answer2: '',
    answer3: '',
    answer4: '',
    answer5: '',
    answer6: '',
    answer7: '',
    answer8: '',
    answer9: '',
    answers: []
  };
  
  handleChange = e => {
    this.setState({
      name: e.nativeEvent.text
    });
  }

  handleSubmit = () => {
    addCategory(this.state.name);
  };

  componentDidMount(){
    answersRef.on('value', snapshot => {
      let data = snapshot.val();
      if( data ){
        let answers = Object.values(data);
        this.setState({ answers });
      } else {
        console.log("Answers data is empty");
        console.log(data)
      }
    });
    console.log(this.state.answers);
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
          onPress={()=> this.addQuestion({name:title})}
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
