import React from 'react';
import { StyleSheet, Text, ScrollView, Button, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import * as firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';
import { db } from '../firebase';

//var category = this.props.navigation.state.params.category;
var category = '';
let questionsRef = db.ref('/questions');
let categoriesRef = db.ref('/categories');
var questions = [];

let addCategory = item => {
  categoriesRef.push({
    name: item
  });
};

let rmCategory = item => {
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
    category: category,
    questions: questions,
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

  handleRemove = () => {
    rmCategory(this.state.name);
  }

  componentDidMount(){
    questionsRef.on('value', snapshot => {
      let data = snapshot.val();
      if( data ){
        let questions = Object.values(data);
        questions.map((question)=> {
          if( question.category == this.state.category){
            console.log('there is a question in this category');
            this.state.questions.push(question);
          };
        })
      } else {
        console.log("Question data is empty");
        console.log(data)
      }
    });
  }
  render(){
    this.state.category = this.props.navigation.getParam('category');
    return (
      <ScrollView>
        <Text>Name dieser Kategorie:</Text>
        <TextInput
          onChange={this.handleChange}
          placeholder= {this.props.navigation.getParam('category', '')}
          editable/>
        <Text>Fragen in dieser Kategorie:</Text>
        <Button
          style={styles.button}
          title="Frage hinzufügen"
          onPress={() => this.props.navigation.navigate('detailquestions',{category:this.state.category})}
        />
        <Text/>
        {this.state.questions.map((question,name)=> (<View style={styles.wrapper} name={name}>
          <Button
            style={styles.button}
            title={question.name}
            onPress={() => this.props.navigation.navigate('detailquestions',{question:question, category:this.state.category})}
          />
        <Text/>
        </View>))}
        <Button
          style={styles.button}
          title="Quizz starten"
          onPress={() => this.props.navigation.navigate('quizz',{category:this.state.category})}
        />
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
