import { trpc } from '../trpc';
import { FlatList, View, Button } from 'react-native';
import { Text } from '@andescalada/ui';

const ZonesList = () => {
  const { data, refetch } = trpc.useQuery(['zones.all']);

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
    <View style={{ flex: 1, padding: 36 }}>
      <Button title="Refetch" onPress={() => refetch()} />
      <FlatList
        data={data}
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
        renderItem={({ item }) => (
          <View style={{ margin: 16 }}>
            <Text variant="p1R">{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default ZonesList;
