import { useState } from 'react';



import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';


const scenarios = [
    {
        label: '清淡一点',
        prompt: '昨晚吃得比较油腻，今天早上想吃得清淡一些'
    },

    {
        label: '水果早餐',
        prompt: '今天早上想准备一份简单的水果早餐。',
    },
    {
        label: '当季水果',
        prompt: '今天想吃当季水果，帮我搭配一份早餐。',
    },
]


type Props = {
    onSubmit: (prompt: string) => void;
}

export function ContextPrompt({ onSubmit }: Props) {

    const [prompt, setPrompt] = useState('');
    const canSubmit = prompt.trim().length > 0;

    return (
        <View style={styles.card}>
            <Text style={styles.label}>
                描述一下现在的情况
            </Text>

            <TextInput
                value={prompt}
                onChangeText={setPrompt}
                multiline
                maxLength={600}
                placeholder="例如：昨晚吃的比较油腻，今天早上吃什么比较好"
                placeholderTextColor="#B7ADAA"
                style={styles.input}
                accessibilityLabel="描述一下现在的情况"
            />

            <View style={styles.divider}/>

            <View style={styles.actions}>
                <ScrollView
                    horizontal
                    style={{ flex: 1}}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.scenarioList}
                >
                    {scenarios.map((scenario) => (
                        <Pressable
                            key={scenario.label}
                            onPress={() => setPrompt(scenario.prompt)}
                            style={styles.chip}>
                            <Text style={styles.chipText}>
                                {scenario.label}

                            </Text>

                        </Pressable>
                    ))}
                </ScrollView>



                <Pressable
                    disabled={!canSubmit}
                    onPress={() => onSubmit(prompt.trim())}
                    accessibilityRole="button"
                    accessibilityLabel="提交饮食场景"
                    accessibilityState={{ disabled: !canSubmit }}
                    style={( { pressed }) => [
                        styles.sendButton,
                        !canSubmit && styles.sendButtonDisabled,
                        pressed && canSubmit && styles.pressed,
                    ]}>

                    <Text style={styles.sendText}>
                        ↑
                    </Text>

                </Pressable>
            </View>








        </View>








    )








}



const styles = StyleSheet.create({
    card: {
        padding: 18,
        borderWidth: 1,
        borderColor: '#DDD4C8',
        borderRadius: 14,
        backgroundColor: '#FFFAF2',
    },
    label: {
        color:'#382135',
        fontSize: 12,
        fontWeight: '700'
    },
    input: {
        minHeight: 78,
        maxHeight: 132,
        marginTop: 12,
        color: '#382125',
        fontSize: 16,
        lineHeight: 26,
        textAlignVertical: 'top'
    },
    divider: {
        height: StyleSheet.hairlineWidth,
        marginVertical: 15,
        backgroundColor: '#DDD4C8',
    },
    actions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 9,
    },
    scenarioList: {
        gap: 7,
    },
    chip: {
        paddingHorizontal: 11,
        paddingVertical: 8,
        borderRadius: 18,
        backgroundColor: '#EBE5DB',
    },
    chipText: {
        color: '#722E2D',
        fontSize: 11,
    },
    sendButton: {
        width: 42,
        height: 42,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 21,
        backgroundColor: '#722E3D'
    },
    sendButtonDisabled: {
        opacity: 0.35,
    },
    pressed: {
        opacity: 0.7,
    },
    sendText: {
        color: '#ffffff',
        fontSize: 22,
    }
})
