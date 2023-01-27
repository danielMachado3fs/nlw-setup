import { Dimensions, TouchableOpacity, View } from "react-native";

const WEEK_DAYS = 7;
const SCREEN_HORIZONTAL_PADDING = (32 * 2) / 5; //espaçamento disponível para os quadradinhos, desconsiderando o padding lateral e o espaçamento entre eles

export const DAY_MARGIN_BETWEEN = 8; //espaçamento entre os quadradinhos, está exportando para utilizar tbem no cabeçalho comos dias da semana
export const DAY_SIZE =
  Dimensions.get("screen").width / WEEK_DAYS - (SCREEN_HORIZONTAL_PADDING + 5);

export function HabitDay() {
  return (
    <TouchableOpacity
      className="bg-zinc-900 rounded-lg m-1 border-2 border-zinc-800"
      style={{ width: DAY_SIZE, height: DAY_SIZE }}
      activeOpacity={0.6}
    />
  );
}
