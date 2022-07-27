import { Image, StyleSheet, Text, View } from 'react-native'
import VectorImage from 'react-native-vector-image'
import React from 'react'


const AppBar = () => {

    const styles = StyleSheet.create({
        prodWrap: {
            width: '93%',
            alignSelf: 'center',
            height: '8%',
            flexDirection: 'row',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        prodText: {
            width: '85%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        },
        headerWrap: {
            width: '93%',
            alignSelf: 'center',
            height: '8%',
            flexDirection: 'row',
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
        },
        headerText: {
            width: '80%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
        },
        headerFont: {
            fontSize: 16
        }
    })

    return (
        <View style = {styles.prodWrap}>
                <Icon ='arrow-back' size={20} style={{ marginRight: 0 }} onPress={() => {}} />
                <View style={styles.prodText}>
                    <Text numberOfLines={1} style={styles.headerFont}>{data.title}</Text>
                </View>
            </View>
    )
}

