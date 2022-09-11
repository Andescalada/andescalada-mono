import { trpc } from '../trpc';
import { FlatList, View, Text } from 'react-native';

const ZonesList = () => {
  const { data } = trpc.useQuery(['zones.all']);

  if (!data)
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#bdbdbd',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text>Sin zonas</Text>
      </View>
    );
  return (
    <FlatList
      data={data}
      contentContainerStyle={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
      renderItem={({ item }) => (
        <View style={{ margin: 16 }}>
          <Text>{item.name}</Text>
        </View>
      )}
    />
  );
};

export default ZonesList;
