import { AppRouter } from "@andescalada/api/src/routers/_app";
import { ActivityIndicator, Box, Text } from "@andescalada/ui";
import SearchItem from "@features/climbs/SearchClimbsScreen/SearchItem";
import { inferProcedureOutput } from "@trpc/server";
import React from "react";
import { FlatList } from "react-native";

type Data = inferProcedureOutput<AppRouter["search"]["all"]>;

interface Props {
  isLoading: boolean;
  data: Data | undefined;
}

const Results = ({ data, isLoading }: Props) => {
  if (isLoading) {
    return (
      <Box flex={1} marginTop="xxl">
        <ActivityIndicator size="large" />
      </Box>
    );
  }
  if (data)
    return (
      <FlatList
        data={data}
        contentContainerStyle={{ height: "100%" }}
        ListEmptyComponent={
          <Box flex={1} justifyContent="center" alignItems="center">
            <Text variant="h4">Sin resultados ☹️</Text>
          </Box>
        }
        ItemSeparatorComponent={() => (
          <Box backgroundColor={"grayscale.600"} height={1} />
        )}
        renderItem={({ item }) => <SearchItem item={item} />}
      />
    );

  return <Box />;
};

export default Results;
