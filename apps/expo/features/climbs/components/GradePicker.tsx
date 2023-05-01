import useGradeSystem from "@hooks/useGradeSystem";
import { FC, useEffect, useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";

import { RouteKindSchema } from "../../../../../packages/db/zod/enums/RouteKind";

interface Props {
  routeKind: typeof RouteKindSchema._type;
  value?: number | "project" | null;
  onChange?: (value: number | "project" | null) => void;
}

const parseToValidValue = (value: string) => {
  if (value === "null") return null;
  if (value === "project") return "project";
  return Number(value);
};

const GradePicker: FC<Props> = ({ routeKind, value, onChange }) => {
  const { allGrades, gradeSystem } = useGradeSystem(routeKind);
  const [open, setOpen] = useState(false);
  const [stringValue, setValue] = useState(String(value));
  const [items, setItems] = useState([{ label: "", value: "" }]);

  useEffect(() => {
    setItems(() => {
      const grades = allGrades.map((grade) => ({
        label: gradeSystem(grade, routeKind),
        value: String(grade),
      }));

      return [
        { label: "Desconocido", value: "null" },
        ...grades,
        { label: "Proyecto", value: "project" },
      ];
    });
  }, [allGrades, gradeSystem, routeKind]);

  return (
    <DropDownPicker
      open={open}
      value={stringValue}
      items={items}
      setOpen={setOpen}
      setValue={(v) => {
        setValue((prev) => {
          const newValue = v(prev);
          if (onChange) onChange(parseToValidValue(newValue));
          return newValue;
        });
      }}
      setItems={setItems}
      placeholder="Selecciona un grado"
      listItemLabelStyle={{ fontFamily: "Rubik-400", fontSize: 16 }}
      textStyle={{ fontFamily: "Rubik-400", fontSize: 20 }}
    />
  );
};

export default GradePicker;
