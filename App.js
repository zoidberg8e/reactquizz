import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import * as firebase from 'firebase';
import RootNavigation from './navigation/RootNavigation';
import HomeScreen from './components/HomeScreen';
import DetailScreen from './components/DetailScreen';
import DetailQuestions from './components/DetailQuestions';
import Quizz from './components/Quizz';


import Ionicons from 'react-native-vector-icons/Ionicons';


const playStackNavigator = createStackNavigator({
    home: HomeScreen,
    detail: DetailScreen,
    detailquestions: DetailQuestions,
    quizz:Quizz
});

// definiere navigationsziele für Bottom-Tab als JS-Objekt
const destinations = {
    Home: playStackNavigator,
};

const defaultNavigationOptions = {
    defaultNavigationOptions: ({navigation}) => ({
        tabBarIcon: ({focused, horizontal, tintColor}) => {
            const {routeName} = navigation.state;
            let IconComponent = Ionicons;
            let iconName;
            if (routeName === 'Home') {
                iconName = `ios-home`;
            } else if (routeName === 'Erstellen') {
                iconName = `ios-add-circle`;
            } else if (routeName === 'Kategorien') {
                iconName = `ios-list`;
            }

            // You can return any component that you like here!
            return <IconComponent name={iconName} size={25} color={tintColor}/>;
        },
    }),
    tabBarOptions: {
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
    },
};

// definiere bottom navigator als untere Leiste
const bottomTabNav = createBottomTabNavigator(destinations, defaultNavigationOptions);

// HauptNavigationr
const Navigator = createAppContainer(bottomTabNav);

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: 'black',
        accent: '#CCFF00',
    },
};

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoadingComplete: false,
            isAuthenticationReady: false,
            isAuthenticated: false,
        };

        // Firebase check authentication
        firebase.auth().onAuthStateChanged(this.onAuthStateChanged);
    }

    onAuthStateChanged = (user) => {
        this.setState({isAuthenticationReady: true});
        this.setState({isAuthenticated: !!user});
    };

    render() {
        return (
            <PaperProvider theme={theme}>
                {(this.state.isAuthenticated) ? <Navigator/> : <RootNavigation/>}
            </PaperProvider>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
});
