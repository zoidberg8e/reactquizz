import React from 'react';
import { StyleSheet, Text, ScrollView, Button, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import * as firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

var questions = [ 
  {key: 'Devin'},
  {key: 'Dan'},
  {key: 'Dominic'},
  {key: 'Jackson'},
  {key: 'James'},
  {key: 'Joel'},
  {key: 'John'},
  {key: 'Jillian'},
  {key: 'Jimmy'},
  {key: 'Julie'},];
  var title = "";

export default class DetailScreen extends React.Component {
  async getQuestions() {
    const snapshot = await firebase.firestore().collection('categories').get();
    return snapshot.docs.map(doc => doc.data());
  } 
  async addCategory(category){
    const snapshot = await firebase.firestore().collection('categories').add(category)
  }
  componentDidMount(){
   questions = this.getQuestions(); 
  }
  render(){
    this.props.navigation.getParam('category');
    return (
      <ScrollView>
        <Text>Name dieser Kategorie:</Text>
        <TextInput
          onChangeText = {text => title = text}
          editable/>
        <Text>Fragen in dieser Kategorie:</Text>
        <Button
          style={styles.button}
          title="Frage hinzufügen"
          onPress={() => this.props.navigation.navigate('detailquestions')}
        />
        <Text/>
        {questions.map((question,key)=> (<View style={styles.wrapper} key={key}>
          <Button
            style={styles.button}
            title={question.key}
            onPress={() => this.props.navigation.navigate('detailquestions',{question:question})}
          />
        <Text/>
        </View>))}
        <Button
          style={styles.button}
          title="Quizz starten"
          onPress={() => this.props.navigation.navigate('quizz')}
        />
        <Text/>
        <Button
          style={styles.button} 
          title="save"
          onpress={()=> this.addCategory({name:title})}
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
