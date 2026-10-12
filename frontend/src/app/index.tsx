import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ContextPrompt } from '@/components/home/context-prompt';


export default function HomeScreen() {
  return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          <ContextPrompt
              onSubmit={(prompt) => {
                console.log('用户提交:', prompt)
              }}
          />

        </View>
      </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F1E9',
  },
  content: {
    flex: 1,
    paddingHorizontal: 22,
    paddingTop: 70
  }
})