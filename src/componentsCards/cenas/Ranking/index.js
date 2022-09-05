import React, { Component } from 'react'
import {
  Text,
  View,
  FlatList,
  StyleSheet
} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

const style = StyleSheet.create({
  view: {
    flex: 1
  },
  row: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingHorizontal: 10,
    paddingVertical: 20,
    flexDirection: 'row'
  },
  numberView: {
    width: 30,
    alignItems: 'center',
    marginRight: 10,
    borderRightColor: '#ddd',
    borderRightWidth: 1
  },
  font: {
    fontSize: 20
  }
})

export default class Ranking extends Component {
  constructor(props) {
    super(props)

    this.state = {
      ranking: [{text: 1}, {text: 2}]
    }

    this.loadRanking()
  }

  render() {
    return (
      <View style={style.view}>
        <FlatList
          data={this.state.ranking}
          keyExtractor={(item, index) => `list-item-${index}`}
          renderItem={({ item, index }) => {
            return (
              <View style={style.row}>
                <View style={style.numberView}>
                  <Text style={style.font}>{index+1}</Text>
                </View>
                <Text style={style.font}>{item.nome} - {item.tentativas} tentativas</Text>
              </View>
            )
          }}
        />
      </View>
    )
  }

  loadRanking() {
    AsyncStorage.getItem('ranking').then(it => this.setState({ rank: JSON.parse(it) }))
  }
}