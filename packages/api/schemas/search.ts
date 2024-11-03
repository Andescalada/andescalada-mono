import { z } from "zod";

export enum SearchType {
  Zone = "zone",
  Sector = "sector",
  Wall = "wall",
  Route = "route",
}

const searchType = z.nativeEnum(SearchType);

export default { searchType };
