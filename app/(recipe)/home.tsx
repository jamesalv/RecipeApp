// app/home.tsx
import { useEffect, useState, useCallback } from 'react';
import { FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useFocusEffect } from 'expo-router';
import { Recipe } from '@/types/recipe';
import RecipeCard from '@/components/RecipeCard';
import styles from "@/styles/style";
import { sampleRecipes } from '@/data/recipes'; 
import { ThemedText } from '@/components/ThemedText';
import { ThemedSafeAreaView } from '@/components/ThemedSafeAreaView';
import commonStyles from '@/styles/style';
import { HelloWave } from '@/components/HelloWave';

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [username, setUsername] = useState<string>('User');

  const getUsername = async () => {
    const userData = await AsyncStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      return user.username;
    }
    return 'User';
  }; 

  useEffect(() => {
    const fetchUsername = async () => {
      const name = await getUsername();
      setUsername(name);
    };
    fetchUsername();
  }, []);

  const loadRecipes = useCallback(async () => {
    try {
      const savedRecipes = await AsyncStorage.getItem('recipes');
      if (!savedRecipes) {
        await AsyncStorage.setItem('recipes', JSON.stringify(sampleRecipes));
        setRecipes(sampleRecipes);
      } else {
        setRecipes(JSON.parse(savedRecipes));
      }
    } catch (error) {
      console.error('Error loading recipes:', error);
    }
  }, []);

  // Use useFocusEffect to reload recipes when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      loadRecipes();
    }, [loadRecipes])
  );


  const renderRecipeCard = useCallback(({ item }: { item: Recipe }) => (
    <RecipeCard 
      recipe={item}
    />
  ), []);

  return (
    <ThemedSafeAreaView 
      lightColor='#FAFAFA'
      darkColor='#000'
      style={styles.container}
    >
      <ThemedText type="title" style={commonStyles.title}>
        Welcome, {username} <HelloWave/>
      </ThemedText>
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id}
        renderItem={renderRecipeCard}
      />
    </ThemedSafeAreaView>
  );
}