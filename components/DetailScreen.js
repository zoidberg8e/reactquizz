import React from 'react';
import { StyleSheet, Text, ScrollView, Button, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import 'firebase/firestore';
import 'firebase/auth';
import { db } from '../firebase';

var category = '';
let questionsRef = db.ref('/questions');
let categoriesRef = db.ref('/categories');
var questions = [];
var old = 1;

let addCategory = item => {
  categoriesRef.push({
    name: item
  });
};

let rmCategory = item => {
  console.log("removing category: ");
  console.log(item);
  var query = categoriesRef.orderByChild("name").equalTo(item);
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
    category: category,
    questions: questions,
  };
  
  handleChange = e => {
    this.setState({
      name: e.nativeEvent.text
    });
  }

  handleSubmit = () => {
    console.log(this.state.name);
    console.log(this.state.category);
    if( old == 1){
      rmCategory(this.state.category);
    }
    addCategory(this.state.name);
  };

  handleRemove = () => {
    rmCategory(this.state.category);
  }

  componentDidMount(){
    //this gets the question data from the dataase
    questionsRef.on('value', snapshot => {
      let data = snapshot.val();
      if( data ){
        let unsortedQuestions = Object.values(data);
        let questions = [];
        unsortedQuestions.map((question)=> {
          if( question.category == this.state.category){
            console.log('there is a question in this category');
            questions.push(question);
          };
        });
        this.setState({ questions });
      } else {
        console.log("Question data is empty");
        console.log(data)
      }
    });
  }
  render(){
    this.state.category = this.props.navigation.getParam('category');
    if( this.props.navigation.getParam('newCat')){
      old = 0;
    }
    console.log("this are the questions from detail");
    console.log(this.state.questions);
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
          onPress={() => this.props.navigation.navigate('quizz',{questions:this.state.questions, category: this.state.category})}
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
