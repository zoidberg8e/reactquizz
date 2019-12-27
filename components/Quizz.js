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
    if(a.quality === "right"){
      alert("RRRISCHDIIISCH");
    }else {
      alert("FAAAAALSCH");
    }
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
        {this.state.questions.length > 1
          ?<mcQuestion>
            {this.state.questions.map((question,name)=> (<View style={styles.wrapper} name={name}>
              <Text>{question.name}</Text>
              {question.answers.map((answer)=> (<View style={styles.wrapper}>
                <Button
                  style={styles.button}
                  title={answer.name}
                  onPress={this.answer(answer)}
                />
                <Text/>
              </View>))}
            </View>))}
          </mcQuestion>
          :<textQuestion>
            <Text>{this.state.questions[1].name}</Text>
          </textQuestion>
        }
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
