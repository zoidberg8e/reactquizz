import React from 'react';
import { StyleSheet, Text, ScrollView, Button } from 'react-native';
import { TextInput } from 'react-native-paper';
import 'firebase/firestore';
import 'firebase/auth';
import { db } from '../firebase';

const questionsRef = db.ref('/questions');
var gotParam = 0;
var answers = [];
var old = 1;

let addQuestion = item => {
  console.log(item);
  questionsRef.push({
    name: item.name,
    category: item.category,
    answers: item.answers,
  });
};

let rm = item => {
  console.log("removing question: ");
  console.log(item);
  var query = questionsRef.orderByChild("name").equalTo(item);
  query.once("value", function(snapshot) {
    snapshot.forEach(function(child) {
      child.ref.remove()
      .then(function() {
        console.log("Remove succeeded.")
        console.log(item);
      })
      .catch(function(error) {
        console.log("Remove failed: " + error.message)
      });
    })
  })
}

export default class DetailScreen extends React.Component {
  state = {
    name: '',
    nameold: '',
    category: '',
    answers: {
      name: '',
      quality: '',
    },
  };

  //This handles change in the input field
  handleChange = e => {
    this.setState({
      name: e.nativeEvent.text,
    })
  }

  //The following handles handle changes in the input of the corresponding Answer fields
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

  //This handles the Submission of new Content to the Database if the question was modified remove the old one.
  handleSubmit = () => {
    if( old == 1 ){
      rm(this.state.nameold);
    }
    addQuestion(this.state);
  };


  //This handles the removal of data from the database, this will be called when removing or changing a question.
  handleRemove = () => {
    rm(this.state.name);
  }

  render(){
    if( this.props.navigation.getParam('question','').name && gotParam == 0){
      console.log("a question was delivered"+this.props.navigation.getParam('question').name);
      this.state = this.props.navigation.getParam('question', '');
      this.state.nameold = this.props.navigation.getParam('question', '').name;
      gotParam = 1;
    }else{
      old = 0;
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
