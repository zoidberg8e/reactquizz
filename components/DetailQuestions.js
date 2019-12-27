import React from 'react';
import { StyleSheet, Text, ScrollView, Button } from 'react-native';
import { TextInput } from 'react-native-paper';
import * as firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';
import { db } from '../firebase';

const questionsRef = db.ref('/questions');
var gotParam = 0;
var answers = [];

let addQuestion = item => {
  console.log(item);
  questionsRef.push({
    name: item.name,
    category: item.category,
    answers: item.answers,
  });
};

let rm = item => {
  categoriesRef.child(item).remove()
  .then(function() {
    console.log("Remove succeeded.")
    console.log(item);
  })
  .catch(function(error) {
    console.log("Remove failed: " + error.message)
  });
}

export default class DetailScreen extends React.Component {
  state = {
    name: '',
    category: '',
    answers: {
      name: '',
      quality: '',
    },
  };
    
  handleChange = e => {
    this.setState({
      name: e.nativeEvent.text,
    })
  }

  handleChangeA1 = e => {
    answers[1] = {
      name:e.nativeEvent.text,
      quality: 'right',
    }
    this.setState({
      answers: answers
    });
  }

  handleChangeA2 = e => {
    answers[2] ={
      name: e.nativeEvent.text,
      quality: 'wrong',
    }
    this.setState({
      answers:answers
    });
  }

  handleChangeA3 = e => {
    answers[3] = {
      name: e.nativeEvent.text,
      quality: 'wrong',
    }
    this.setState({
      answers:answers
    });
  }

  handleChangeA4 = e => {
    answers[4] = {
      name: e.nativeEvent.text,
      quality: 'wrong',
    }
    this.setState({
      answers:answers
    });
  }

  handleChangeA5 = e => {
    answers[5] = {
      name: e.nativeEvent.text,
      quality: 'wrong',
    }
    this.setState({
      answers:answers
    });
  }

  handleChangeA6 = e => {
    answers[6] = {
      name: e.nativeEvent.text,
      quality: 'wrong',
    }
    this.setState({
      answers:answers
    });
  }

  handleSubmit = () => {
    console.log(this.state);
    addQuestion(this.state);
  };

  handleRemove = () => {
    rm(this.state.name);
  }

  componentDidMount(){
/*    questionsRef.on('value', snapshot => {
      let data = snapshot.val();
      if( data ){
        let questions = Object.values(data);
        this.setState({ questions });
      } else {
        console.log("Question data is empty");
        console.log(data)
      }
    });*/
    console.log("this is the question screen speaking");
  }

  render(){
    if( this.props.navigation.getParam('question','').name && gotParam == 0){
      console.log("a question was delivered"+this.props.navigation.getParam('question').name);
      this.state = this.props.navigation.getParam('question', '');
      gotParam = 1;
    }
    if( this.props.navigation.getParam('category', '') ) {
      this.state.category = this.props.navigation.getParam('category', '');
    } else {
      console.log('this is an error no category was supplied');
    }
    return (
      <ScrollView>
        <Text>Name dieser Frage</Text>
        <TextInput
          placeholder={this.state.name}
          onChange={this.handleChange}
          editable/>
        <Text>Antworten:</Text>
        <TextInput
          label="richtige Antwort"
          placeholder = {typeof this.state.answers[1] !== "undefined" ? this.state.answers[1].name : ''}
          onChange={this.handleChangeA1}
          editable/>
        <Text/>
        <TextInput
          label="Falsche Antwort"
          placeholder = {typeof this.state.answers[2] !== "undefined" ? this.state.answers[2].name : ''}
          onChange={this.handleChangeA2}
          editable/>
        <Text/>      
        <TextInput
          label="Falsche Antwort"
          placeholder = {typeof this.state.answers[3] !== "undefined" ? this.state.answers[3].name : ''}
          onChange={this.handleChangeA3}
          editable/>
        <Text/>      
        <TextInput
          label="Falsche Antwort"
          placeholder = {typeof this.state.answers[4] !== "undefined" ? this.state.answers[4].name : ''}
          onChange={this.handleChangeA4}
          editable/>
        <Text/>      
        <TextInput
          label="Falsche Antwort"
          placeholder = {typeof this.state.answers[5] !== "undefined" ? this.state.answers[5].name : ''}
          onChange={this.handleChangeA5}
          editable/>
        <Text/>      
        <TextInput
          label="Falsche Antwort"
          placeholder = {typeof this.state.answers[6] !== "undefined" ? this.state.answers[6].name : ''}
          onChange={this.handleChangeA6}
          editable/>
        <Text/>
        <Button
          style={styles.button} 
          title="save"
          onPress={() => this.handleSubmit()}
        />
        <Text/>
        <Button
          style={styles.button} 
          title="delete"
          onPress={() => this.handleRemove()}
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
