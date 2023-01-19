import { StatusBar, StyleSheet, Text, View } from "react-native";
import {
    useFonts,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
} from "@expo-google-fonts/inter";
import { Loading } from "./src/components/Loading";

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
        <View style={styles.container}>
            <Text style={styles.text}>
                Open up App.tsx to start working on your app!
            </Text>
            <StatusBar
                barStyle="light-content"
                backgroundColor={"transparent"}
                translucent
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#09090A",
        alignItems: "center",
        justifyContent: "center",
    },

    text: {
        fontFamily: "Inter_800ExtraBold",
        color: "#fff",
    },
});
