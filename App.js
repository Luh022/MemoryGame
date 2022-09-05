import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import BemVindo from './src/scenes/Welcome'
import Nome from './src/scenes/Name'
import Game from './src/scenes/Game'
import Rank from './src/scenes/Ranking'

const AppNavigator = createStackNavigator(
  {
    Home: { screen: BemVindo, navigationOptions: { title: 'Memory Game' } },
    Nome: { screen: Nome, navigationOptions: { title: 'Enter your name' } },
    Game: { screen: Game, navigationOptions: { title: 'Memory Game' } },
    Rank: { screen: Rank, navigationOptions: { title: 'Ranking' } }
  },
  { initialRouteName: 'Home' }
)

export default createAppContainer(AppNavigator)