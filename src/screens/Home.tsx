import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet, Image, ImageSourcePropType, Modal } from 'react-native';
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
  const [filteredCurrencies, setFilteredCurrencies] = useState<Currency[]>([]);
  const [sortedCurrencies, setSortedCurrencies] = useState<Currency[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('price_lowest');

  useEffect(() => {
    dispatch(fetchCurrencies());
  }, [dispatch]);

  useEffect(() => {
    setSortedCurrencies(currencies);
  }, [currencies]);

  useEffect(() => {
    const filtered = currencies.filter(currency =>
      currency.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCurrencies(filtered);
  }, [searchQuery, currencies]);

  const clearSearch = () => {
    setSearchQuery('');
  };

  const goToCurrencyDetails = (selectedCurrency: Currency) => {
    navigation.navigate('RealTimeCharts', { selectedCurrency });
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const sortByPriceLowest = () => {
    const sorted = [...filteredCurrencies].sort((a, b) => a.current_price - b.current_price);
    setSortedCurrencies(sorted);
    setSortBy('price_lowest');
    setShowModal(false);
  };

  const sortByPriceHighest = () => {
    const sorted = [...filteredCurrencies].sort((a, b) => b.current_price - a.current_price);
    setSortedCurrencies(sorted);
    setSortBy('price_highest');
    setShowModal(false);
  };

  const sortByPopularity = () => {
    // Sort currencies based on popularity (you need to define a metric for popularity)
    // For example, you can sort by the number of searches or transactions
    // This example sorts randomly
    const sorted = [...filteredCurrencies].sort(() => Math.random() - 0.5);
    setSortedCurrencies(sorted);
    setSortBy('popularity');
    setShowModal(false);
  };

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
        <TouchableOpacity onPress={openModal}>
          <Text style={{ fontSize: 14, color: 'grey', textDecorationLine: 'underline' }}>Price</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        style={{ marginTop: 10 }}
        data={sortedCurrencies}
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

      <Modal visible={showModal} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Sort by:</Text>
            <TouchableOpacity style={styles.modalButton} onPress={sortByPriceLowest}>
              <Text style={{color:'black'}}>Price (Lowest to Highest)</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={sortByPriceHighest}>
              <Text style={{color:'black'}}>Price (Highest to Lowest)</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={sortByPopularity}>
              <Text style={{color:'black'}}>Popularity</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.modalButton]} onPress={closeModal}>
              <Text style={{color:'red'}}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    color: 'black',
    fontWeight: '400',
    marginTop: 10,
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
    alignSelf: 'center',
  },
  input: {
    height: 40,
    flex: 1,
    paddingLeft: 10,
    color: 'grey',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalButton: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
  },
});

export default HomeScreen;
