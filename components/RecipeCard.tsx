import { View, Text, StyleSheet, Pressable } from "react-native";
import { Recipe } from "../types/recipe";
import { Image } from "expo-image";
import * as Progress from "react-native-progress";
import { Rating } from "react-native-ratings";
import { router } from "expo-router";

interface RecipeCardProps {
  recipe: Recipe;
  onFavorite?: () => void;
  onCookNow?: () => void;
  onRatingChange?: (rating: number) => void;
}

export const calculateProgress = (completedSteps: number, totalSteps: number) => {
  return completedSteps / totalSteps;
};

export default function RecipeCard({
  recipe,
  onFavorite,
  onRatingChange,
}: RecipeCardProps) {

  const onCookNow = (recipe: Recipe) => {
    // Replace to /details/[recipe.id]
    router.push(`/details/${recipe.id}`);
  }

  return (
    <Pressable style={styles.cardWrapper}>
      <View style={styles.card}>
        <Image source={{ uri: recipe.image }} style={styles.image} />
        <View style={styles.cardContent}>
          <View style={styles.headerRow}>
            <View>
              <Text style={styles.cardTitle} numberOfLines={2}>
                {recipe.name}
              </Text>
              <Text style={styles.cardCategory}>
                {recipe.category} | ⌛ {recipe.cookingTime} min
              </Text>
            </View>
            <View style={styles.ratingContainer}>
              <Rating
                type="custom"
                ratingCount={5}
                imageSize={20}
                startingValue={recipe.rating}
                readonly={true}
                ratingColor="#FFD700"
                ratingBackgroundColor="#d4d4d4"
                tintColor="#ffffff" // Should match card background
                onFinishRating={onRatingChange}
                style={styles.rating}
              />
              <Text style={styles.ratingText}>{recipe.rating.toFixed(1)}</Text>
            </View>
          </View>
          <View style={styles.details}>
            <Progress.Bar
              progress={calculateProgress(
                recipe.completedSteps,
                recipe.steps.length
              )}
              width={null}
              color="#FF6347"
            />
            <Text>
              {recipe.completedSteps} / {recipe.steps.length} steps
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <Pressable
              style={[styles.button, styles.favoriteButton]}
              onPress={onFavorite}
            >
              <Text style={styles.favoriteButtonText}>Add to Favorite</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.cookButton]}
              onPress={() => onCookNow(recipe)}
            >
              <Text style={styles.cookButtonText}>Cook Now</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cardWrapper: {
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
  },
  cardContent: {
    padding: 16,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 6,
    gap: 8,
  },
  details: {
    marginTop: 8,
    gap: 4,
    marginBottom: 16,
  },
  image: {
    width: "100%",
    height: 200,
    objectFit: "cover",
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: "bold",
    flex: 1,
  },
  ratingContainer: {
    alignItems: "center",
    width: 110, // Adjust based on your needs
  },
  rating: {
    paddingVertical: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
    marginTop: 2,
  },
  cardCategory: {
    marginTop: 8,
    fontSize: 16,
    color: "#666",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
    marginTop: 8,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  favoriteButton: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#FF6347",
  },
  favoriteButtonText: {
    color: "#FF6347",
    fontWeight: "600",
    fontSize: 14,
  },
  cookButton: {
    backgroundColor: "#FF6347",
  },
  cookButtonText: {
    color: "#FFF",
    fontWeight: "600",
    fontSize: 14,
  },
});
