// import React from 'react';
// import {View, Text, Image, StyleSheet} from 'react-native';

// const CurrencyItem = ({name, ticker, icon, price, change}) => {
//   return (
//     <View style={styles.container}>
//       {icon ? (
//         <Image source={{uri: icon}} style={styles.icon} />
//       ) : (
//         <Image source={require('../assets/crown.png')} style={styles.icon} />
//       )}
//       <View style={styles.info}>
//         <Text style={{color: 'black', fontWeight: '500', fontSize:14}}>{name} </Text>
//         <Text style={{color: 'grey', fontWeight: '500', fontSize:12}}>{ticker}</Text>
//       </View>
//       <View>
//         <Text style={{color: 'black', fontWeight: '500', fontSize: 14}}>
//           {price} EUR
//         </Text>
//         <Text
//           style={{
//             color: change > 0 ? 'green' : 'red',

//             textAlign: 'right',
//             fontSize:12
//           }}>
//           {change}%
//         </Text>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
    
//   },
//   icon: {
//     width: 30,
//     height: 30,
//     marginRight: 10,
//   },
//   info: {
//     flex: 1,
//   },
// });

// export default CurrencyItem;
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface CurrencyItemProps {
  name: string;
  ticker: string;
  icon?: string;
  price: string;
  change: number;
}

const CurrencyItem: React.FC<CurrencyItemProps> = ({ name, ticker, icon, price, change }) => {
  return (
    <View style={styles.container}>
      {icon ? (
        <Image source={{ uri: icon }} style={styles.icon} />
      ) : (
        <Image source={require('../assets/crown.png')} style={styles.icon} />
      )}
      <View style={styles.info}>
        <Text style={{ color: 'black', fontWeight: '500', fontSize: 14 }}>{name} </Text>
        <Text style={{ color: 'grey', fontWeight: '500', fontSize: 12 }}>{ticker}</Text>
      </View>
      <View>
        <Text style={{ color: 'black', fontWeight: '500', fontSize: 14 }}>
          {price} EUR
        </Text>
        <Text
          style={{
            color: change > 0 ? 'green' : 'red',
            textAlign: 'right',
            fontSize: 12
          }}>
          {change}%
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  info: {
    flex: 1,
  },
});

export default CurrencyItem;
