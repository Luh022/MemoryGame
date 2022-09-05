import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Button,
  TextInput
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
    marginTop: 20
  },
  textInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 0
  }
})

export default class Name extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: null
    }
  }

  render() {
    return (
      <View style={style.viewPrincipal}>
        <View style={style.viewTitulo}>
          <Text style={style.textTitulo}>Enter your name to play</Text>
        </View>
        <View style={style.viewButtons}>
          <TextInput
            value={this.state.name}
            onChangeText={name => this.setState({ name })}
            style={style.textInput}
          />
          <TouchableOpacity style={style.touchable}>
            <Button title="Jogar" onPress={() => this.playGame()} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  playGame() {
    if (!this.state.name) {
      alert('Please, enter your name')
      return
    }

    this.props.navigation.navigate('Game', { name: this.state.name })
  }
}