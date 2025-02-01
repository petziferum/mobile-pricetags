import {Alert, Button, FlatList, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View} from "react-native";
import {ThemedText} from "@/components/ThemedText";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {data} from "@/app/pricetags";
import {useState} from "react";
import {MaterialCommunityIcons} from "@expo/vector-icons";

const Separator = () => <View style={styles.separator} />;

export default function Preise() {

    const [priceTags, setPriceTags] = useState(data.sort((a, b) => b.id - a.id));
    const [text, setText] = useState("");
    const addPriceTag = () => {
        if(text.trim()) {
            const newId = priceTags.length > 0 ? priceTags[0].id + 1 : 1;
            setPriceTags([{id: newId, productName: text, description: ""}, ...priceTags]);
            setText("");
        }
    }
    const removePriceTag = (id: number) => {
        setPriceTags(priceTags.filter((priceTag) => priceTag.id !== id));
    }
    const removeTag = (id: number) => {
        setPriceTags(priceTags.filter(item => item.id !== id))
    }
    const renderItem = ({ item }:any) => (
        <View style={styles.pricetagItem}>
            <Text>{ item.productName }</Text>
            <Pressable onPress={() => removeTag(item.id)}>
                <MaterialCommunityIcons name="delete-circle" size={36} color="red" selectable={undefined} />
            </Pressable>
        </View>
    );

    return (
        <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
            <ThemedText style={styles.text}>Preis-Tags</ThemedText>
            <View style={styles.inputContainer}>
                <TextInput style={styles.input} placeholder={"Produkt hinzufügen"} placeholderTextColor="gray" value={text} onChangeText={setText}/>
                <Pressable onPress={addPriceTag} style={styles.addButton}>
                    <Text>Hinzufügen</Text>
                </Pressable>
            </View>
            <Button
                title="Press me"
                onPress={() => Alert.alert('Simple Button pressed')}
            />
            <Separator />

            <FlatList
                data={priceTags}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{ flexGrow: 1 }}/>

        </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: "20%",
        marginLeft: 20,
        paddingHorizontal: 10,
        justifyContent: 'flex-start',
        marginHorizontal: 16,
    },
    text: {
        textAlign: 'left',
        marginVertical: 8,
    },
    inputContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    addButton: {
        height: 50,
        padding: 10,
        backgroundColor: "lightblue",
        justifyContent: "center",
        borderRadius: 5,
    },
    pricetagItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 4,
        padding: 10,
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        width: '100%',
        maxWidth: 1024,
        marginHorizontal: 'auto',
        pointerEvents: 'auto',
        backgroundColor: 'lightgray',
        elevation: 2,
    },
    input: {
        flex: 1,
        height: 50,
        width: "90%",
        margin: 12,
        borderWidth: 1,
        borderRadius: 15,
        padding: 10,
    },
    separator: {
        marginVertical: 18,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
});