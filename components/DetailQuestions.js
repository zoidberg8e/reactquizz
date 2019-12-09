import React from 'react';
import { StyleSheet, Text, ScrollView, Button } from 'react-native';
import { TextInput } from 'react-native-paper';

const answers = [];

export default class DetailScreen extends React.Component {
  componentDidMount(){
    
  }
  render(){
    this.props.navigation.getParam('question');
    return (
      <ScrollView>
        <Text>Name dieser Frage</Text>
        <TextInput
          editable/>
        <Text>Antworten:</Text>
        <TextInput
          placeholder="richtige Antwort"
          editable/>
        <Text/>
        <TextInput
          placeholder="Falsche Antwort"
          editable/>
        <Text/>      
        <TextInput
          placeholder="Falsche Antwort"
          editable/>
        <Text/>      
        <TextInput
          placeholder="Falsche Antwort"
          editable/>
        <Text/>      
        <TextInput
          placeholder="Falsche Antwort"
          editable/>
        <Text/>      
        <TextInput
          placeholder="Falsche Antwort"
          editable/>
        <Text/>      
        <Button
          style={styles.button} 
          title="save"
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
