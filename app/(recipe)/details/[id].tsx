import { Recipe, Ingredient } from "@/types/recipe";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import commonStyles from "@/styles/style";
import { ThemedText } from "@/components/ThemedText";
import { Image } from "expo-image";
import { View, StyleSheet, ActivityIndicator, ScrollView } from "react-native";
import * as Progress from "react-native-progress";
import { calculateProgress } from "@/components/RecipeCard";
import RecipeStepsCarousel from "@/components/RecipeStepsCarousel";

interface RecipeIngredientsProps {
  ingredients: Ingredient[];
}

interface RecipeInstructionsProps {
  instructions: string[];
}

const RecipeIngredients: React.FC<RecipeIngredientsProps> = ({
  ingredients,
}) => {
  return (
    <View style={styles.ingredientsContainer}>
      <ThemedText style={styles.sectionTitle}>Ingredients</ThemedText>
      {ingredients.map((ingredient, index) => (
        <View key={index} style={styles.ingredientRow}>
          <ThemedText style={styles.ingredientName}>
            {ingredient.name}
          </ThemedText>
          <ThemedText style={styles.ingredientAmount}>
            {ingredient.quantity} {ingredient.unit}
          </ThemedText>
        </View>
      ))}
    </View>
  );
};

export default function RecipeDetails() {
  const { id } = useLocalSearchParams();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);

  const handleStepComplete = async (stepIndex: number) => {
    if (!recipe) return;

    const updatedRecipe = {
      ...recipe,
      completedSteps: Math.max(stepIndex + 1, recipe.completedSteps || 0),
    };

    try {
      setRecipe(updatedRecipe);
      console.log('====================================');
      console.log('Updated Recipe:', updatedRecipe);
      console.log('====================================');

      const recipes = await AsyncStorage.getItem("recipes");
      if (recipes) {
        const parsedRecipes = JSON.parse(recipes) as Recipe[];
        const updatedRecipes = parsedRecipes.map((r) =>
          r.id === id ? updatedRecipe : r
        );
        await AsyncStorage.setItem("recipes", JSON.stringify(updatedRecipes));
      }
    } catch (error) {
      console.error("Failed to update recipe progress:", error);
    }
  };

  useEffect(() => {
    fetchRecipe();
  }, [id]);

  const fetchRecipe = async () => {
    setLoading(true);
    try {
      const recipes = await AsyncStorage.getItem("recipes");
      if (recipes) {
        const parsedRecipes = JSON.parse(recipes) as Recipe[];
        const selectedRecipe = parsedRecipes.find((r) => r.id === id);
        if (selectedRecipe) {
          setRecipe(selectedRecipe);
        }
      }
    } catch (error) {
      console.error("Failed to fetch recipe:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!recipe) {
    return (
      <View style={styles.errorContainer}>
        <ThemedText style={styles.errorText}>Recipe not found</ThemedText>
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={styles.rootView}>
      <ScrollView style={styles.scrollView} bounces={false}>
        <View style={[commonStyles.container, styles.container]}>
          <ThemedText type="title" style={[commonStyles.title, styles.title]}>
            {recipe.name}
          </ThemedText>

          <Image
            source={{ uri: recipe.image }}
            style={styles.image}
            contentFit="cover"
            transition={1000}
          />

          {recipe.ingredients && recipe.ingredients.length > 0 ? (
            <RecipeIngredients ingredients={recipe.ingredients} />
          ) : (
            <View style={styles.noIngredientsContainer}>
              <ThemedText style={styles.noIngredientsText}>
                No ingredients listed
              </ThemedText>
            </View>
          )}

          <ThemedText style={styles.sectionTitle}>Instructions</ThemedText>
          <Progress.Bar
            progress={calculateProgress(
              recipe.completedSteps || 0,
              recipe.steps.length
            )}
            width={null}
            color="#FF6347"
          />
          <RecipeStepsCarousel
            steps={recipe.steps}
            currentStep={recipe.completedSteps || 0}
            onStepComplete={handleStepComplete}
          ></RecipeStepsCarousel>
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  rootView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 18,
    textAlign: "center",
  },
  title: {
    marginBottom: 16,
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  ingredientsContainer: {
    marginTop: 16,
    padding: 16,
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#333",
    paddingVertical: 8,
  },
  ingredientRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "rgba(0,0,0,0.1)",
  },
  ingredientName: {
    flex: 1,
    fontSize: 16,
  },
  ingredientAmount: {
    fontSize: 16,
    color: "#666",
  },
  noIngredientsContainer: {
    padding: 16,
    alignItems: "center",
  },
  noIngredientsText: {
    color: "#666",
    fontSize: 16,
  },
});
