import React, { Component } from 'react'
import {
  Text,
  View,
  Button,
  TouchableOpacity,
  StyleSheet
} from 'react-native'

const style = StyleSheet.create({
  viewPrincipal: {
    flexDirection: 'column',
    flex: 1
  },
  viewTitulo: {
    flex: .3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textTitulo: {
    fontSize: 20
  },
  viewButtons: {
    flex: .5,
    padding: 10
  },
  touchable: {
    marginTop: 10
  }
})

export default class Welcome extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={style.viewPrincipal}>
        <View style={style.viewTitulo}>
          <Text style={style.textTitulo}>Welcome to a Memory Game</Text>
        </View>
        <View style={style.viewButtons}>
          <TouchableOpacity style={style.touchable}>
            <Button title="Jogar" onPress={() => this.goToCena('Name')} />
          </TouchableOpacity>
          <TouchableOpacity style={style.touchable}>
            <Button title="Top 10" onPress={() => this.goToCena('Ranking')} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  goToCena(cena) {
    this.props.navigation.navigate(cena)
  }
}