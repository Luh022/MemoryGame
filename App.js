import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import Welcome from './src/scenes/Welcome'
import Name from './src/scenes/Name'
import Game from './src/scenes/Game'
import Ranking from './src/scenes/Ranking'

const AppNavigator = createStackNavigator(
  {
    Home: { screen: Welcome, navigationOptions: { title: 'Memory Game' } },
    Nome: { screen: Name, navigationOptions: { title: 'Enter your name' } },
    Game: { screen: Game, navigationOptions: { title: 'Memory Game' } },
    Rank: { screen: Ranking, navigationOptions: { title: 'Ranking' } }
  },
  { initialRouteName: 'Home' }
)

export default createAppContainer(AppNavigator)