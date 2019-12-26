import React from 'react';
import { StyleSheet, Text, ScrollView, Button, View } from 'react-native';
import { TextInput } from 'react-native-paper';

let questions = [];
let category = '';
export default class DetailScreen extends React.Component {
  state = {
    questions: questions,
    category: category,
  }

  answer = a => {
    console.log("FAAAAAAALSCH");
  }

  componentDidMount(){
    
  }
  render(){
    if( this.props.navigation.getParam('questions','')){
      console.log("some questions where delivered");
      this.state.questions = this.props.navigation.getParam('questions', '');
    } else {
      console.log("no questions delivered this quizz is empty");
    }
    if( this.props.navigation.getParam('category', '') ) {
      this.state.category = this.props.navigation.getParam('category', '');
    } else {
      console.log('this is an error no category was supplied');
    }
    console.log(this.state.questions);
    return (
      <ScrollView>
        <Text>Fragen in {this.state.category}:</Text>
        {this.state.questions.map((question,name)=> (<View style={styles.wrapper} name={name}>
          <Text>{question.name}</Text>
          <Button
            style={styles.button}
            title={question.answer1}
            onPress={this.answer(question.answer1)}
          />
          <Text/>
          <Button
            style={styles.button}
            title={question.answer2}
            onPress={this.answer(question.answer2)}
          />
          <Text/>
          <Button
            style={styles.button}
            title={question.answer3}
            onPress={this.answer(question.answer3)}
          />
          <Text/>
          <Button
            style={styles.button}
            title={question.answer4}
            onPress={this.answer(question.answer4)}
          />
          <Text/>
          <Button
            style={styles.button}
            title={question.answer5}
            onPress={this.answer(question.answer5)}
          />
          <Text/>
          <Button
            style={styles.button}
            title={question.answer6}
            onPress={this.answer(question.answer6)}
          />
          <Text/>
        </View>))}
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
  button:{
    margin:5,
  }
});
