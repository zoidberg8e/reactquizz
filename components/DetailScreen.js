import React from 'react';
import { StyleSheet, Text, ScrollView, Button } from 'react-native';
import { TextInput } from 'react-native-paper';

const questions = [];

export default class DetailScreen extends React.Component {
  componentDidMount(){
    
  }
  render(){
    this.props.navigation.getParam('category');
    return (
      <ScrollView>
        <Text>Name dieser Kategorie:</Text>
        <TextInput
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
            title={question.title}
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
