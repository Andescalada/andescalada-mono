import useGradeSystem from "@hooks/useGradeSystem";
import { FC, useEffect, useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";

import { RouteKindSchema } from "../../../../../packages/db/zod/enums/RouteKind";

interface Props {
  routeKind: typeof RouteKindSchema._type;
  value: number;
  onChange?: (v: { value: number; label: string }) => void;
}

const VotingGradePicker: FC<Props> = ({ routeKind, value, onChange }) => {
  const { allGrades, gradeSystem } = useGradeSystem(routeKind);
  const [open, setOpen] = useState(false);
  const [stringValue, setValue] = useState(String(value));
  const [items, setItems] = useState([{ label: "", value: "" }]);

  useEffect(() => {
    setItems(() => {
      const currentGradeIndex = allGrades.findIndex((grade) => grade === value);

      const upperBound = Math.min(currentGradeIndex + 2, allGrades.length - 1);
      const lowerBound = Math.max(currentGradeIndex - 2, 0);

      const gradesToShow = allGrades
        .slice(lowerBound, upperBound + 1)
        .map((grade) => ({
          label: gradeSystem(grade, routeKind),
          value: String(grade),
        }));

      return gradesToShow;
    });
  }, [allGrades, gradeSystem, routeKind, value]);

  return (
    <DropDownPicker
      open={open}
      value={stringValue}
      items={items}
      setOpen={setOpen}
      setValue={(v) => {
        setValue((prev) => {
          const newValue = v(prev);
          if (onChange)
            onChange({
              value: Number(newValue),
              label: gradeSystem(Number(newValue), routeKind),
            });
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

export default VotingGradePicker;