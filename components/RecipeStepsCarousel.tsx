import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ViewStyle, TextStyle } from 'react-native';
import { GestureHandlerRootView, Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withSpring,
  runOnJS,
  WithSpringConfig,
} from 'react-native-reanimated';

interface RecipeStepsCarouselProps {
  steps: string[];
  cardStyle?: ViewStyle;
  textStyle?: TextStyle;
  springConfig?: WithSpringConfig;
  currentStep: number;
  onStepComplete: (stepIndex: number) => void;
}

interface AnimationContext {
  x: number;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.3;

const defaultSpringConfig: WithSpringConfig = {
  damping: 20,
  mass: 0.8,
  stiffness: 100,
  overshootClamping: false,
  restDisplacementThreshold: 0.01,
  restSpeedThreshold: 2,
};

const RecipeStepsCarousel: React.FC<RecipeStepsCarouselProps> = ({ 
  steps,
  cardStyle,
  textStyle,
  springConfig = defaultSpringConfig,
  currentStep,
  onStepComplete
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const translateX = useSharedValue<number>(0);
  const context = useSharedValue<AnimationContext>({ x: 0 });

  const updateIndex = (newIndex: number) => {
    'worklet';
    if (newIndex >= 0 && newIndex < steps.length) {
      runOnJS(setCurrentIndex)(newIndex);
      // If we're moving forward and haven't completed this step yet
      if (newIndex > currentStep) {
        runOnJS(onStepComplete)(newIndex);
      }
      // If we're moving backwards and have already completed this step
      if (newIndex < currentStep) {
        runOnJS(onStepComplete)(newIndex - 1);
      }
    }
  };

  const animateToPosition = (targetPosition: number, newIndex?: number) => {
    'worklet';
    translateX.value = withSpring(targetPosition, springConfig, () => {
      if (newIndex !== undefined) {
        updateIndex(newIndex);
        translateX.value = 0;
      }
    });
  };

  const panGesture = Gesture.Pan()
    .onStart(() => {
      context.value = { x: translateX.value };
    })
    .onUpdate((event) => {
      translateX.value = event.translationX + context.value.x;
    })
    .onEnd((event) => {
      const isQuickSwipe = Math.abs(event.velocityX) >= 500;
      const isLongSwipe = Math.abs(translateX.value) > SWIPE_THRESHOLD;
      const isRightSwipe = translateX.value > 0;

      if (isQuickSwipe || isLongSwipe) {
        if (isRightSwipe && currentIndex > 0) {
          animateToPosition(SCREEN_WIDTH, currentIndex - 1);
        } else if (!isRightSwipe && currentIndex < steps.length - 1) {
          animateToPosition(-SCREEN_WIDTH, currentIndex + 1);
        } else {
          // Bounce back if we're at the edges
          animateToPosition(0);
        }
      } else {
        // Return to original position
        animateToPosition(0);
      }
    });

  const animatedStyle = useAnimatedStyle((): ViewStyle => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.stepsContainer}>
        <Text style={styles.stepIndicator}>
          Step {currentIndex + 1} of {steps.length}
        </Text>
        <GestureDetector gesture={panGesture}>
          <Animated.View style={[styles.stepCard, cardStyle, animatedStyle]}>
            <Text style={[styles.stepText, textStyle]}>{steps[currentIndex]}</Text>
          </Animated.View>
        </GestureDetector>
        <View style={styles.pagination}>
          {steps.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                currentIndex === index && styles.activeDot,
              ]}
            />
          ))}
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  stepsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  stepCard: {
    width: SCREEN_WIDTH - 40,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    minHeight: 200,
    justifyContent: 'center',
    // alignItems: 'center',
  },
  stepText: {
    fontSize: 18,
    lineHeight: 24,
    color: '#333',
  },
  stepIndicator: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  pagination: {
    flexDirection: 'row',
    marginTop: 20,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#007AFF',
  },
});

export default RecipeStepsCarousel;