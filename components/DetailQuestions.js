import React from 'react';
import { StyleSheet, Text, ScrollView, Button } from 'react-native';
import { TextInput } from 'react-native-paper';
import * as firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';
import { db } from '../firebase';

const questionsRef = db.ref('/questions');
var gotParam = 0;

let addQuestion = item => {
  console.log(item);
  questionsRef.push({
    name: item.name,
    category: item.category,
    answer1: item.answer1,
    answer2: item.answer2,
    answer3: item.answer3,
    answer4: item.answer4,
    answer5: item.answer5,
    answer6: item.answer6,
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
    answer1: '',
    answer2: '',
    answer3: '',
    answer4: '',
    answer5: '',
    answer6: '',
  };
    
  handleChange = e => {
    this.setState({
      name: e.nativeEvent.text,
    })
    console.log(this.state.name);
  }

  handleChangeA1 = e => {
    this.setState({
      answer1: e.nativeEvent.text
    });
  }

  handleChangeA2 = e => {
    this.setState({
      answer2: e.nativeEvent.text
    });
  }

  handleChangeA3 = e => {
    this.setState({
      answer3: e.nativeEvent.text
    });
  }

  handleChangeA4 = e => {
    this.setState({
      answer4: e.nativeEvent.text
    });
  }

  handleChangeA5 = e => {
    this.setState({
      answer5: e.nativeEvent.text
    });
  }

  handleChangeA6 = e => {
    this.setState({
      answer6: e.nativeEvent.text
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
          placeholder = {this.state.answer1}
          onChange={this.handleChangeA1}
          editable/>
        <Text/>
        <TextInput
          label="Falsche Antwort"
          placeholder = {this.state.answer2}
          onChange={this.handleChangeA2}
          editable/>
        <Text/>      
        <TextInput
          label="Falsche Antwort"
          placeholder = {this.state.answer3}
          onChange={this.handleChangeA3}
          editable/>
        <Text/>      
        <TextInput
          label="Falsche Antwort"
          placeholder = {this.state.answer4}
          onChange={this.handleChangeA4}
          editable/>
        <Text/>      
        <TextInput
          label="Falsche Antwort"
          placeholder = {this.state.answer5}
          onChange={this.handleChangeA5}
          editable/>
        <Text/>      
        <TextInput
          label="Falsche Antwort"
          placeholder = {this.state.answer6}
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
