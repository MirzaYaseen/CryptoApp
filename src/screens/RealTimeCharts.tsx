import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {LineChart, YAxis} from 'react-native-svg-charts';
import {useNavigation} from '@react-navigation/native';

interface Currency {
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap_rank: number;
  market_cap_percentage?: string;
  market_cap?: number;
  total_volume?: number;
}

interface RouteParams {
  selectedCurrency: Currency;
}

const CurrencyDetailsScreen: React.FC<{route: {params: RouteParams}}> = ({
  route,
}) => {
  const selectedCurrency = route.params.selectedCurrency;

  const priceChangePercentage24h = selectedCurrency.price_change_percentage_24h;

  const initialPrice = selectedCurrency.current_price;

  const data = Array.from({length: 11}, (_, index) => {
    return initialPrice * (1 + (index % priceChangePercentage24h));
  });

  let strokeColor;
  if (priceChangePercentage24h > 5) {
    strokeColor = 'green';
  } else if (priceChangePercentage24h < -5) {
    strokeColor = 'red';
  } else if (priceChangePercentage24h > 0) {
    strokeColor = 'lightgreen';
  } else if (priceChangePercentage24h < 0) {
    strokeColor = 'salmon';
  } else {
    strokeColor = 'grey';
  }

  const intervals = ['24H', '1W', '1M', '1Y', 'ALL'];

  const [selectedInterval, setSelectedInterval] = useState(intervals[0]);

  const handleIntervalPress = (interval: string) => {
    setSelectedInterval(interval);
  };

  const navigation = useNavigation();

  const formatYAxisLabel = (value: number) => {
    return value.toLocaleString();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../assets/arrow.png')} style={styles.arrow} />
        </TouchableOpacity>
        <View style={styles.currencyInfo}>
          <Image source={{uri: selectedCurrency.image}} style={styles.image} />
          <Text style={styles.currencySymbol}>
            {selectedCurrency.symbol.toUpperCase()}
          </Text>
        </View>
        <Text>{''}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.currencyName}>
          {selectedCurrency.name.toUpperCase()}
        </Text>
        <Text style={styles.price}>
          {selectedCurrency.current_price.toLocaleString()}{' '}
          <Text style={{fontSize: 12}}>EUR </Text>
        </Text>
        <View style={styles.details}>
          <Text style={styles.detailValue}>{priceChangePercentage24h} EUR</Text>
          <Text style={styles.detailValue1}>
            {selectedCurrency.market_cap
              ? (selectedCurrency.market_cap / 1000000000).toLocaleString(
                  'en-US',
                  {maximumFractionDigits: 2},
                ) + '%'
              : 'N/A'}
          </Text>
          <Text style={styles.detailValue2}>| WEEK</Text>
        </View>
        <View style={styles.chartContainer}>
          <View style={styles.chart}>
            <LineChart
              style={{flex: 1}}
              data={data}
              svg={{stroke: strokeColor, strokeWidth: 2}}
              contentInset={{top: 20, bottom: 20}}
            />
            <LineChart
              style={StyleSheet.absoluteFill}
              data={data}
              svg={{
                stroke: strokeColor,
                strokeWidth: 3,
                strokeOpacity: priceChangePercentage24h < 0 ? 0.6 : 1,
                shadowColor: 'black',
                shadowOffset: {width: 0, height: 4},
                shadowOpacity: priceChangePercentage24h < 0 ? 0.5 : 0,
                shadowRadius: 6,
              }}
              contentInset={{top: 20, bottom: 20}}
            />
            <YAxis
              data={data}
              contentInset={{top: 20, bottom: 20}}
              svg={{fontSize: 10, fill: 'grey'}}
              numberOfTicks={5}
              formatLabel={formatYAxisLabel}
              yAxisId={1}
              style={{position: 'absolute', top: 0, bottom: 0, right: 0}}
            />
          </View>
        </View>
        <View style={styles.intervalContainer}>
          {intervals.map(interval => (
            <TouchableOpacity
              key={interval}
              style={[
                styles.intervalItem,
                selectedInterval === interval && {color: 'purple'},
              ]}
              onPress={() => handleIntervalPress(interval)}>
              <Text
                style={[
                  styles.intervalText,
                  selectedInterval === interval && {
                    color: 'purple',
                    fontWeight: '600',
                    borderRadius: 5,
                  },
                ]}>
                {interval}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={styles.marketDataContainer}>
        <Text style={styles.marketDataTitle}>Market data</Text>
        <View style={styles.marketData}>
          <View style={styles.marketDataItem}>
            <Text style={styles.marketDataLabel}>Market rank</Text>
            <Text style={styles.marketDataValue}>
              {selectedCurrency.market_cap_rank}
            </Text>
          </View>
          <View style={styles.marketDataItem}>
            <Text style={styles.marketDataLabel}>Market dominance</Text>
            <Text style={styles.marketDataValue}>
              {selectedCurrency.market_cap_percentage || 'N/A'}
            </Text>
          </View>
          <View style={styles.marketDataItem}>
            <Text style={styles.marketDataLabel}>Market cap</Text>
            <Text style={styles.marketDataValue}>
              {selectedCurrency.market_cap} EUR
            </Text>
          </View>
          <Text
            style={[
              styles.marketDataChange,
              {
                color:
                  selectedCurrency.price_change_percentage_24h > 0
                    ? 'green'
                    : 'red',
              },
            ]}>
            {selectedCurrency.price_change_percentage_24h}%
          </Text>
          <View style={styles.marketDataItem}>
            <Text style={styles.marketDataLabel}>24h trading volume</Text>
            <Text style={styles.marketDataValue}>
              {selectedCurrency.total_volume} EUR
            </Text>
          </View>
          <Text
            style={[
              styles.marketDataChange,
              {color: selectedCurrency.current_price > 0 ? 'green' : 'red'},
            ]}>
            +{selectedCurrency.current_price}%
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FDFDFD',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  arrow: {
    width: 15,
    height: 15,
  },
  currencyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 24,
    height: 24,
  },
  currencySymbol: {
    paddingLeft: 5,
    fontWeight: '500',
    color: 'black',
  },
  detailsContainer: {
    padding: 10,
    elevation: 1,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  currencyName: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 10,
    color: 'black',
    letterSpacing: 1,
  },
  price: {
    fontSize: 30,
    color: 'black',
    marginBottom: 5,
  },
  details: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  detailValue: {
    fontSize: 10,
    color: 'gray',
  },
  detailValue1: {
    fontSize: 10,
    paddingLeft: 10,
    color: 'green',
    fontWeight: '600',
  },
  detailValue2: {
    fontSize: 10,
    paddingLeft: 10,
    color: 'gray',
  },
  chartContainer: {
    flexDirection: 'row',
    height: 200,
    padding: 20,
  },
  chart: {
    flex: 1,
  },
  intervalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 10,
    marginBottom: 10,
    elevation: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    height: 20,
    alignItems: 'center',
  },
  intervalItem: {
    fontSize: 12,
    color: 'black',
  },
  intervalText: {
    color: 'grey',
    fontSize: 10,
  },
  marketDataTitle: {
    marginTop: 20,
    color: 'black',
    fontWeight: '500',
  },
  marketData: {
    marginTop: 20,
    borderRadius: 5,
    padding: 10,
    elevation: 1,
    backgroundColor: 'white',
  },
  marketDataItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  marketDataLabel: {
    color: 'grey',
    fontSize: 12,
    marginTop: 10,
  },
  marketDataValue: {
    color: 'black',
    fontSize: 10,
    marginTop: 10,
    fontWeight: '600',
  },
  marketDataChange: {
    color: 'green',
    fontSize: 10,
    fontWeight: '600',
    textAlign: 'right',
  },
});

export default CurrencyDetailsScreen;
