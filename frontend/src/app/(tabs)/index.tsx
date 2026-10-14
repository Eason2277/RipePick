import {StyleSheet, View, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {ContextPrompt} from '@/components/home/context-prompt';


export default function HomeScreen() {
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.content}>
                <View style={styles.header}>
                    <View style={styles.brand}>
                        <View style={styles.brandMark}>
                            <Text style={styles.brandMarkText}>R</Text>
                        </View>
                        <View>
                            <Text style={styles.brandName}>RipePick</Text>
                            <Text style={styles.brandTagline}>
                                今天，吃得刚刚好
                            </Text>
                        </View>
                    </View>
                </View>



                <View style={styles.intro}>
                    <Text style={styles.eyebrow}>
                        YOUR EVERYDAY FRUIT COMPANION
                    </Text>

                    <Text
                        style={styles.title}
                        accessibilityRole="header"
                    >
                        今天想怎么吃？
                    </Text>


                    <Text style={styles.description}>
                        告诉我此刻的饮食状态，{'\n'}
                        我帮你找到一份刚刚好的水果早餐。
                    </Text>

                </View>

                {/* AI输入框部分 */}
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
    },
    header: {
        minHeight: 104,
        justifyContent: 'center',
        marginBottom: 18,
    },
    brand: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 11,
    },
    brandMark: {
        width: 42,
        height: 42,
        borderRadius: 11,
        backgroundColor: '#722E3D',
        alignItems: 'center',
        justifyContent: 'center',
    },
    brandMarkText: {
        color: '#FFF9EF',
        fontSize: 17,
        fontWeight: '800',
    },
    brandName: {
        color: '#382125',
        fontSize: 16,
        fontWeight: '800',
        letterSpacing: -0.3,
    },
    brandTagline: {
        marginTop: 3,
        color: '#7C706E',
        fontSize: 10,
    },
    intro: {
        marginBottom: 25,
    },
    eyebrow: {
        color: '#722E3D',
        fontSize: 9,
        fontWeight: '800',
        letterSpacing: 1.25,
    },
    title: {
        marginTop: 9,
        color: '#382125',
        fontSize: 34,
        lineHeight: 42,
        fontWeight: '800',
        letterSpacing: -1,
    },
    description: {
        marginTop: 12,
        color: '#7C706E',
        fontSize: 14,
        lineHeight: 23,
    }
})
