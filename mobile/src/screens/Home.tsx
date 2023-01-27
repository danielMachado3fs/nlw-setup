import { View, Text, ScrollView } from "react-native";
import { Header } from "../components/Header";
import { DAY_SIZE, HabitDay } from "../components/HabitDay";
import { generateDatesFromYearBiginning } from "../utils/generate-dates-from-year-biginning";

const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];
const datesFromYearStart = generateDatesFromYearBiginning();
const minimumSummaryDatesSize = 18 * 5;
const amauntOfDaysToFill = minimumSummaryDatesSize - datesFromYearStart.length;

export function Home() {
  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <Header />

      {/* header da tabela indicando os dias da semana */}
      <View className="flex-row mt-6 mb-2">
        {weekDays.map((weekDay, i) => (
          <Text
            key={`${weekDay}-${i}`}
            className="text-zinc-400 text-2xl font-bold text-center mx-1"
            style={{ width: DAY_SIZE }}
          >
            {weekDay}
          </Text>
        ))}
      </View>

      {/* tabela com os quadradinhos que representa os dias com o scroll ativado */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        <View className="flex-row flex-wrap">
          {datesFromYearStart.map((date, i) => (
            <HabitDay key={`${date.toISOString()}`} />
          ))}
          {amauntOfDaysToFill > 0 &&
            Array.from({ length: amauntOfDaysToFill }).map((_, i) => (
              <View
                className="bg-zinc-900 rounded-lg m-1 border-2 border-zinc-800 opacity-60"
                style={{ width: DAY_SIZE, height: DAY_SIZE }}
              ></View>
            ))}
        </View>
      </ScrollView>
    </View>
  );
}
