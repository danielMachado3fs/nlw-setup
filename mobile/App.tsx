import "./src/lib/dayjs"; //aplica a configuração do dayjs (pt-br) na aplicação toda
import { StatusBar } from "react-native";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
} from "@expo-google-fonts/inter";
import { Loading } from "./src/components/Loading";
import { Home } from "./src/screens/Home";

export default function App() {
  //useFonts é um hook, os hooks começão com o padrão 'use'
  const [fontsLoader] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
  });

  //confere se as fontes foram carregadas para abrir a aplicação, caso não estja carregada
  //retorna o componente de loading
  if (!fontsLoader) {
    return <Loading />;
  }
  return (
    //um componente pode retornar apenas um elemento, por isso é necessário
    //colocar uma 'div' em torno de tudo. Nesse caso foi utilizada a técnica
    //de wrapper que é colocar as tags vazias em volta de tudo fazendo tipo um pacote.
    <>
      <Home />
      <StatusBar
        barStyle="light-content"
        backgroundColor={"transparent"}
        translucent
      />
    </>
  );
}
