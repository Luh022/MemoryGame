import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import Welcome from './Memory Game/src/componentsCards/cenas/Welcome'
import Name from './Memory Game/src/componentsCards/cenas/Name'
import Game from './Memory Game/src/componentsCards/cenas/Game'
import Ranking from './Memory Game/src/componentsCards/cenas/Ranking'

const AppNavigator = createStackNavigator(
  {
    Home: { screen: Welcome, navigationOptions: { title: 'Memory Game' } },
    Nome: { screen: Name, navigationOptions: { title: 'Enter your name' } },
    Game: { screen: Game, navigationOptions: { title: 'Memory Game' } },
    Ranking: { screen: Ranking, navigationOptions: { title: 'Ranking' } }
  },
  { initialRouteName: 'Home' }
)

export default createAppContainer(AppNavigator)