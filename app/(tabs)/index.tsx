import {
    Image,
    StyleSheet,
    Platform,
    Text,
    SafeAreaView,
    Button,
    View,
    TouchableWithoutFeedback,
    TouchableOpacity
} from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import {Collapsible} from "@/components/Collapsible";

export default function HomeScreen() {
    const handlePress = () => console.log("Ein Button wurde angeklickt")

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
        <ThemedText type="title">Preisscanner</ThemedText>
        <HelloWave />
      </ThemedView>
        <View>
            <ThemedText>Suche nach Produktpreisen und finde heraus wie hart du abgezockt wurdest.</ThemedText>
        </View>
        <ThemedView style={styles.stepContainer}>
            <ThemedText type="subtitle">Fressroulette</ThemedText>
            <Collapsible title={"Rezepte"}>
                <ThemedText numberOfLines={1}>Hier sind die Rezepte drin. das ist ein sehr langer Text.</ThemedText>
                <Button title={"Rezepte anzeigen"} onPress={handlePress} />
            </Collapsible>
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
            <View style={{width: '125%', height: 200, left: '-10%' }}>
                <TouchableOpacity onPress={handlePress}>
                <Image source={require('../../assets/images/whisky.jpg')} style={{ width: '100%', height: '100%', resizeMode: 'cover' }}  />
                </TouchableOpacity>
            </View>
        </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
          Press{' '}
          <ThemedText type="defaultSemiBold">
            {Platform.select({
              ios: 'cmd + d',
              android: 'cmd + m',
              web: 'F12'
            })}
          </ThemedText>{' '}
          to open developer tools.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Explore</ThemedText>
        <ThemedText>
          Tap the Explore tab to learn more about what's included in this starter app.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          When you're ready, run{' '}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
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
});
