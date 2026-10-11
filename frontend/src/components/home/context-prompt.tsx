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

        </View>








    )








}



const styles = StyleSheet.create({
    card: {

    },
    label: {
        color:'#382135',
        fontSize: 12,
        fontWeight: '700'
    }
})
