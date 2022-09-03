import { trpc } from '../trpc';
import { FlatList, View, Text } from 'react-native';

const ZonesList = () => {
  const { data } = trpc.useQuery(['zones.all']);
  if (!data) return null;
  return (
    <FlatList
      data={data}
      contentContainerStyle={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      renderItem={({ item }) => (
        <View style={{ margin: 16 }}>
          <Text>{item.name}</Text>
          <Text>{item.description}</Text>
        </View>
      )}
    />
  );
};

export default ZonesList;
