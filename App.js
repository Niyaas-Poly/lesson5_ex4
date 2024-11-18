import React, { useState } from 'react';
import {
  SectionList,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';

// Quiz data
const quizData = [
  {
    title: 'Football Players',
    data: [
      {
        question: 'Who is known as the G.O.A.T of football?',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Cristiano_Ronaldo_playing_for_Al_Nassr_FC_against_Persepolis%2C_September_2023_%28cropped%29.jpg/330px-Cristiano_Ronaldo_playing_for_Al_Nassr_FC_against_Persepolis%2C_September_2023_%28cropped%29.jpg', // Messi image
        options: ['Lionel Messi', 'Cristiano Ronaldo', 'Neymar', 'Mbappe'],
        answer: 'Cristiano Ronaldo',
      },
      {
        question: 'Which player is known as "CR7"?',
        image: 'https://media.gettyimages.com/id/1457728653/photo/paris-saint-germain-v-riyadh-xi-winter-tour-2023-day-2.jpg?s=612x612&w=gi&k=20&c=W21nXiQW-hN5idFmymM9ZRnu1SxH36pKhAwKJ_T2B6M=', // Ronaldo image
        options: ['Cristiano Ronaldo', 'Lionel Messi', 'Zlatan Ibrahimović', 'Kevin De Bruyne'],
        answer: 'Cristiano Ronaldo',
      },
    ],
  },
  {
    title: 'Football Clubs',
    data: [
      {
        question: 'Which club is known as "The Reds"?',
        image: 'https://media.gettyimages.com/id/1471474708/photo/liverpool-fc-v-manchester-united-premier-league.jpg?s=612x612&w=gi&k=20&c=xTHK3D5E_ScaQnHnmRZq3wBVf7FFBXhJbuM8sm8FWgk=', // Manchester United logo
        options: ['Manchester United', 'Liverpool', 'Arsenal', 'Chelsea'],
        answer: 'Liverpool',
      },
      {
        question: 'Which club has the nickname "The Citizens"?',
        image: 'https://media.gettyimages.com/id/1492288514/photo/manchester-city-v-chelsea-fc-premier-league.jpg?s=612x612&w=gi&k=20&c=ku_oW2r-BywB7Pj4TNXDLS-O7r3JSCWd2M1BhEMeQcw=', // Manchester City logo
        options: ['Manchester City', 'Tottenham', 'Everton', 'Leicester City'],
        answer: 'Manchester City',
      },
    ],
  },
];

// Render question items
const renderItem = ({ item }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null); // Track user's selected answer

  const handleAnswerPress = (option) => {
    setSelectedAnswer(option);

    // Check if the selected answer is correct
    if (option === item.answer) {
      Alert.alert('Correct!', `You selected the right answer: ${option}`);
    } else {
      Alert.alert('Incorrect', `The correct answer was: ${item.answer}`);
    }
  };

  return (
      <View style={styles.card}>
        <Text style={styles.questionText}>{item.question}</Text>
        <Image source={{ uri: item.image }} style={styles.questionImage} />
        {item.options.map((option, index) => (
            <TouchableOpacity
                key={index}
                style={[
                  styles.option,
                  selectedAnswer === option && {
                    backgroundColor: option === item.answer ? '#4CAF50' : '#F44336', // Green for correct, red for incorrect
                  },
                ]}
                onPress={() => handleAnswerPress(option)}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
        ))}
      </View>
  );
};

const App = () => {
  return (
      <View style={styles.container}>
        <SectionList
            sections={quizData}
            renderItem={renderItem}
            keyExtractor={(item, index) => item.question + index}
            renderSectionHeader={({ section: { title } }) => (
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionHeaderText}>{title}</Text>
                </View>
            )}
        />
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 10,
  },
  sectionHeader: {
    padding: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    marginBottom: 5,
  },
  sectionHeaderText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  questionImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  option: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
  },
  optionText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
});

export default App;
