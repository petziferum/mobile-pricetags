import {
    Image,
    StyleSheet,
    Platform,
    Text,
    SafeAreaView,
    Button,
    View,
    TouchableWithoutFeedback,
    TouchableOpacity, FlatList, RefreshControl
} from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import {Collapsible} from "@/components/Collapsible";
import {collection, getDocs} from "@firebase/firestore";
import { db } from "@/firebaseconfig";
import {useEffect, useState} from "react";
import Pricetag from "@/app/types/Pricetag";
import {TextInput} from "react-native-paper";
export default function HomeScreen() {
    const [preistags, setPreistags] = useState<Pricetag[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [isRefreshing, setIsRefreshing] = useState(false);
    const getKiloPreis = (gram, price) => {
        if(gram) {
            const p = parseFloat(price.replace(",", "."));
            const g = parseFloat(gram);
            return ((p / g) * 1000).toFixed(2);
        } else return "-";
    }
    const loadPreistags = async () => {
        setIsRefreshing(true); // Starten der Laderoutine
        try {
            const querySnapshot = await getDocs(collection(db, "pricetags"));
            const tagsArray: Pricetag[] = querySnapshot.docs.map(doc => ({
                ...doc.data(),
                entries: doc.data().entries || [],
            })) as Pricetag[];
            setPreistags(tagsArray);
        } catch (error) {
            console.error("Fehler beim Laden der Preistags:", error);
        } finally {
            setIsRefreshing(false); // Ladevorgang beenden
        }
    };

    useEffect(() => {
            loadPreistags();
    }, []);

    // 🟢 Gefilterte Liste basierend auf dem Suchbegriff
    const filteredPreistags = preistags.filter(tag =>
        tag.productName.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/petzispricetag-eyescanner.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Preistags</ThemedText>
        <HelloWave />
      </ThemedView>
        <View>
            <ThemedText>Suche nach Produktpreisen und finde heraus wie hart du abgezockt wurdest.</ThemedText>
        </View>
        <ThemedView style={styles.stepContainer}>
            <ThemedText type="subtitle">Fressroulette</ThemedText>
                <ThemedText numberOfLines={1}>Hier sind die Rezepte drin. das ist ein sehr langer Text.</ThemedText>
        </ThemedView>
        <TextInput
            style={styles.input}
            placeholder="Produktname suchen..."
            value={searchQuery}
            keyboardType="default"
            onChangeText={setSearchQuery}
        />

      <ThemedView style={styles.stepContainer}>
          <FlatList
              data={filteredPreistags}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                  <View style={styles.card}>
                      {/* Produktname */}
                      <ThemedText style={styles.productName}>{item.productName}</ThemedText>

                      {/* Unterliste der Entries */}
                      <FlatList
                          data={item.entries}
                          keyExtractor={(entry, idx) => idx.toString()}
                          renderItem={({ item: entry }) => (
                              <View style={styles.entry}>
                                  <ThemedText style={styles.entryText}>📅 {new Date(entry.date.toDate()).toLocaleDateString()}</ThemedText>
                                  <ThemedText style={styles.entryText}>📍 {entry.location}</ThemedText>
                                  <ThemedText style={styles.entryText}>💰 {entry.price} €</ThemedText>
                                  <ThemedText style={styles.entryText}>⚖️ {entry.amount} g</ThemedText>
                                  <ThemedText style={styles.entryText}>🏷️ {getKiloPreis(entry.amount, entry.price)} €/kg</ThemedText>
                              </View>
                          )}
                      />
                  </View>
              )}
              refreshControl={
                  <RefreshControl
                      refreshing={isRefreshing}
                      onRefresh={loadPreistags} // Beim Wischen nach unten wird die Funktion aufgerufen
                  />
              }
          />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: "100%",
    width: "100%",
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
    input: {
        height: 40,
        borderColor: "#ccc",
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 8,
        borderRadius: 5,
    },
    card: {
        backgroundColor: "#f9f9f9",
        padding: 15,
        marginBottom: 10,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        color: "#000",
    },
    productName: {
        fontSize: 18,
        color: "black",
        fontWeight: "bold",
        marginBottom: 5,
    },
    entry: {
        backgroundColor: "#c0c0c0",
        color: "black",
        padding: 10,
        borderRadius: 5,
        marginBottom: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 12,
    },
    entryText: {
      color: "black",
    }
});
