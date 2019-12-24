import React from 'react';
import { StyleSheet, Text, ScrollView, Button, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import * as firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';
import { db } from '../firebase';

let addCategory = item => {
  db.ref('/categories').push({
    name: item
  });
};

let questionsRef = db.ref('/questions');

export default class DetailScreen extends React.Component {
  state = {
    name: '',
    category: '',
    questions: []
  };
  
  handleChange = e => {
    this.setState({
      name: e.nativeEvent.text
    });
  }

  handleSubmit = () => {
    addCategory(this.state.name);
    console.log(this.state.name);
  };

  componentDidMount(){
    questionsRef.on('value', snapshot => {
      let data = snapshot.val();
      if( data ){
        let questions = Object.values(data);
        this.setState({ questions });
      } else {
        console.log("Question data is empty");
        console.log(data)
      }
    });
    console.log(this.state.questions);
  }
  render(){
    this.props.navigation.getParam('category');
    return (
      <ScrollView>
        <Text>Name dieser Kategorie:</Text>
        <TextInput
          onChange={this.handleChange}
          editable/>
        <Text>Fragen in dieser Kategorie:</Text>
        <Button
          style={styles.button}
          title="Frage hinzufügen"
          onPress={() => this.props.navigation.navigate('detailquestions')}
        />
        <Text/>
        {this.state.questions.map((question,key)=> (<View style={styles.wrapper} key={key}>
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
          onPress={() => this.handleSubmit()}
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
