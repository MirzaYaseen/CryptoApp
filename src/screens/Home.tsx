import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet, Image, ImageSourcePropType } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCurrencies } from '../redux/actions/currencyActions';
import { useNavigation } from '@react-navigation/native';
import CurrencyItem from '../components/CurrencyItem';

interface Currency {
  id: string;
  name: string;
  symbol: string;
  image: ImageSourcePropType;
  current_price: number;
  price_change_percentage_24h: number;
}

const HomeScreen: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const currencies: Currency[] = useSelector((state: any) => state.currency.currencies);
  const loading: boolean = useSelector((state: any) => state.currency.loading);
  const error: string | null = useSelector((state: any) => state.currency.error);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    dispatch(fetchCurrencies());
  }, [dispatch]);

  const clearSearch = () => {
    setSearchQuery('');
  };

  const goToCurrencyDetails = (selectedCurrency: Currency) => {
    navigation.navigate('RealTimeCharts', { selectedCurrency });
  };

  const filteredCurrencies: Currency[] = currencies.filter((currency) =>
    currency.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Buy crypto</Text>
      <View style={styles.searchContainer}>
        <Image style={{ width: 20, height: 20 }} source={require('../assets/search1.png')} />
        <TextInput
          style={styles.input}
          placeholder="Search currencies"
          placeholderTextColor='grey'
          onChangeText={setSearchQuery}
          value={searchQuery}
        />
        {searchQuery !== '' && (
          <TouchableOpacity onPress={clearSearch}>
            <Image style={{ width: 10, height: 10, marginRight: 20 }} source={require('../assets/cross.png')} />
          </TouchableOpacity>
        )}
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
        <Text style={{ fontSize: 16, color: 'black' }}>Popular</Text>
        <Text style={{ fontSize: 14, color: 'grey' }}>Price</Text>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        style={{ marginTop: 10 }}
        data={filteredCurrencies}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => goToCurrencyDetails(item)}>
            <CurrencyItem
              name={item.name}
              ticker={item.symbol.toUpperCase()}
              icon={item.image}
              price={item.current_price.toLocaleString()}
              change={item.price_change_percentage_24h}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white'
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    color: 'black',
    fontWeight: '400',
    marginTop: 10
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 10,
    marginTop: 15,
    width: '95%',
    alignSelf: 'center'
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    height: 40,
    flex: 1,
    paddingLeft: 10,
    color: 'grey'
  },
});

export default HomeScreen;
