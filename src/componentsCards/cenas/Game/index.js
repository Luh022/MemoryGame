import React, { Component } from 'react'
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  Alert
} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import Shuffle from 'shuffle-array'
import Card from '../../components/Card'

const styles = StyleSheet.create({
  viewPrincipal: {
    flexDirection: 'column',
    flex: 1
  },
  viewTopo: {
    width: '100%',
    flex: .1,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 4
  },
  tentativas: {
    fontSize: 20
  },
  viewConteudo: {
    width: '100%',
    flex: .9
  }
})

export default class Game extends Component {
  constructor(props) {
    super(props)

    this.cardList = [
      { key: 0, figure: 'grifinoria', show: false, ok: false },
      { key: 0, figure: 'sonserina', show: false, ok: false },
      { key: 0, figure: 'lufalufa', show: false, ok: false },
      { key: 0, figure: 'corvinal', show: false, ok: false },
      { key: 0, figure: 'brasao', show: false, ok: false },
      { key: 0, figure: 'reliquia', show: false, ok: false },
      { key: 0, figure: 'express', show: false, ok: false },
      { key: 0, figure: 'carta', show: false, ok: false },
      { key: 0, figure: 'harry', show: false, ok: false },
      { key: 0, figure: 'letras', show: false, ok: false },
      { key: 0, figure: 'pelucio', show: false, ok: false },
      { key: 0, figure: 'pomoOuro', show: false, ok: false },
      { key: 0, figure: 'wand', show: false, ok: false },
      { key: 0, figure: 'castle', show: false, ok: false },
      { key: 0, figure: 'chapeu', show: false, ok: false },
      { key: 0, figure: 'coruja', show: false, ok: false },
      { key: 0, figure: 'grifinoria', show: false, ok: false },
      { key: 0, figure: 'sonserina', show: false, ok: false },
      { key: 0, figure: 'lufalufa', show: false, ok: false },
      { key: 0, figure: 'corvinal', show: false, ok: false },
      { key: 0, figure: 'brasao', show: false, ok: false },
      { key: 0, figure: 'reliquia', show: false, ok: false },
      { key: 0, figure: 'express', show: false, ok: false },
      { key: 0, figure: 'carta', show: false, ok: false },
      { key: 0, figure: 'harry', show: false, ok: false },
      { key: 0, figure: 'letras', show: false, ok: false },
      { key: 0, figure: 'pelucio', show: false, ok: false },
      { key: 0, figure: 'pomoOuro', show: false, ok: false },
      { key: 0, figure: 'wand', show: false, ok: false },
      { key: 0, figure: 'castle', show: false, ok: false },
      { key: 0, figure: 'chapeu', show: false, ok: false },
      { key: 0, figure: 'coruja', show: false, ok: false }
    ]

    this.cards = []
    this.blockPress = false
    this.state = {
      tentativas: 0,
      nome: props.navigation.state.params.name,
      cards: Shuffle(this.cardList)
    }
  }

  render() {
    return (
      <View style={styles.viewPrincipal}>
        <View style={styles.viewTopo}>
          <Text style={styles.tentativas}>{this.state.name}</Text>
          <Text style={styles.tentativas}>Tentativas: {this.state.tentativas}</Text>
        </View>
        <View style={styles.viewConteudo}>
          <FlatList
            ref={component => this.flatList = component}
            data={this.state.cards}
            extraData={this.state}
            keyExtractor={item => item.key}
            numColumns={4}
            renderItem={({ item, index }) => {
              return (
                <Card
                  item={item}
                  ref={component => this.cards[index] = component}
                  onPress={() => this.pressCard(index)}
                />
              )
            }}
          />
        </View>
      </View>
    )
  }

  shuffleCards() {
    this.setState({ cards: Shuffle(this.cardList), tentativas: 0 })
  }

  pressCard(index) {
    if (this.blockPress) return

    const currentCard = this.cards[index]
    const activeCards = this.cards.filter(it => it.state.show && !it.state.ok)

    if (activeCards.length == 0) return currentCard.setState({ show: true })

    currentCard.setState(
      { show: true },
      () => {
        const cards = this.cards.filter(it => it.state.show && !it.state.ok)
        const equalCards = cards
          .filter(it => it.state.figure == currentCard.state.figure).length == 2

        this.setState({ tentativas: ++this.state.tentativas })

        if (equalCards) {
          cards.map(it => it.setState({ ok: true }))
          if (this.cards.filter(it => !it.state.show).length == 0) this.checkRanking()
          return
        }

        this.setBlockPress(true)
        setTimeout(() => {
          cards.map(it => it.setState({ show: false }))
          this.setBlockPress(false)
        }, 1000)
      }
    )
  }

  checkRank() {
    AsyncStorage.getItem('ranking')
      .then(it => {
        let ranking = JSON.parse(it)

        if (!ranking) {
          AsyncStorage.setItem(
            'ranking',
            JSON.stringify([{ name: this.state.name, tentativas: this.state.tentativas }])
          )
          Alert.alert(
            'Congratulation!',
            `You finish o game in ${this.state.tentativas} attempt and came in to the top TEN!`,
            [
              { text: 'OK', onPress: () => this.shuffleCards() }
            ]
          )
          return
        }

        const rankingLength = ranking.length
        const position = ranking.filter(it => it.tentativas < this.state.tentativas).length

        if (position >= 10) {
          Alert.alert(
            'Congratulation!',
            `You finish o game in ${this.state.tentativas} attempt`,
            [
              { text: 'OK', onPress: () => this.shuffleCards() }
            ]
          )
          return
        }

        const secondRankingPiece = ranking.splice(position)

        if (rankingLength == 10) secondRankingPiece.pop()

        rank = rank
          .concat({ name: this.state.name, tentativas: this.state.tentativas })
          .concat(secondRankingPiece)

        AsyncStorage.setItem(
          'ranking',
          JSON.stringify(ranking)
        )

        Alert.alert(
          'Congratulation!',
          `You finish o game in ${this.state.tentativas} attempt and came in to the top TEN!`,
          [
            { text: 'OK', onPress: () => this.shuffleCards() }
          ]
        )
      })
  }

  setBlockPress(bool) {
    this.blockPress = bool
  }
}