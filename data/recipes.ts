import { Recipe, Category } from '@/types/recipe';

export const sampleRecipes: Recipe[] = [
  {
    id: '1',
    name: 'Fluffy Pancakes',
    category: Category.Breakfast,
    cookingTime: 20,
    ingredients: [
      { name: 'Flour', quantity: 2, unit: 'cups' },
      { name: 'Sugar', quantity: 2, unit: 'tbsp' },
      { name: 'Baking Powder', quantity: 2, unit: 'tsp' },
      { name: 'Salt', quantity: 0.5, unit: 'tsp' },
      { name: 'Milk', quantity: 1.5, unit: 'cups' },
      { name: 'Egg', quantity: 1, unit: 'piece' },
      { name: 'Butter', quantity: 3, unit: 'tbsp' }
    ],
    completedSteps: 0,
    steps: [
      'Mix dry ingredients in a bowl.',
      'Whisk egg, milk, and melted butter.',
      'Combine wet and dry ingredients.',
      'Cook on a hot griddle until golden brown.',
      'Serve with syrup or toppings of choice.'
    ],
    status: 'In Progress',
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=800&q=80',
    rating: 4.3
  },
  {
    id: '2',
    name: 'Chicken Caesar Salad',
    category: Category.Lunch,
    cookingTime: 25,
    ingredients: [
      { name: 'Chicken Breast', quantity: 1, unit: 'piece' },
      { name: 'Romaine Lettuce', quantity: 3, unit: 'cups' },
      { name: 'Croutons', quantity: 1, unit: 'cup' },
      { name: 'Parmesan Cheese', quantity: 0.5, unit: 'cup' },
      { name: 'Caesar Dressing', quantity: 0.25, unit: 'cup' }
    ],
    completedSteps: 0,
    steps: [
      'Grill the chicken breast and slice.',
      'Wash and chop the romaine lettuce.',
      'Toss the lettuce, chicken, croutons, and dressing.',
      'Sprinkle with Parmesan and serve.'
    ],
    status: 'Done',
    image: 'https://heartbeetkitchen.com/foodblog/wp-content/uploads/2022/06/ultimate-grilled-chicken-caesar-salad.jpg',
    rating: 4.8
  },
  {
    id: '3',
    name: 'Chocolate Brownies',
    category: Category.Dessert,
    cookingTime: 40,
    ingredients: [
      { name: 'Butter', quantity: 1, unit: 'cup' },
      { name: 'Sugar', quantity: 2, unit: 'cups' },
      { name: 'Eggs', quantity: 4, unit: 'pieces' },
      { name: 'Cocoa Powder', quantity: 0.75, unit: 'cup' },
      { name: 'All-purpose Flour', quantity: 1, unit: 'cup' },
      { name: 'Salt', quantity: 0.5, unit: 'tsp' },
      { name: 'Baking Powder', quantity: 0.5, unit: 'tsp' }
    ],
    completedSteps: 0,
    steps: [
      'Preheat the oven to 350°F (175°C).',
      'Melt the butter and mix with sugar.',
      'Add eggs and stir well.',
      'Mix in cocoa powder, flour, salt, and baking powder.',
      'Pour the batter into a greased pan.',
      'Bake for 30-35 minutes and let cool.'
    ],
    status: 'In Progress',
    image: 'https://images.immediate.co.uk/production/volatile/sites/30/2020/10/Gooey-Brownies-5627e49.jpg',
    rating: 4.5
  },
  {
    id: '4',
    name: 'Tomato Basil Soup',
    category: Category.Soup,
    cookingTime: 30,
    ingredients: [
      { name: 'Tomatoes', quantity: 5, unit: 'pieces' },
      { name: 'Onion', quantity: 1, unit: 'piece' },
      { name: 'Garlic', quantity: 2, unit: 'cloves' },
      { name: 'Vegetable Broth', quantity: 4, unit: 'cups' },
      { name: 'Basil', quantity: 0.25, unit: 'cup' },
      { name: 'Olive Oil', quantity: 2, unit: 'tbsp' },
      { name: 'Salt', quantity: 0.5, unit: 'tsp' }
    ],
    completedSteps: 0,
    steps: [
      'Saute onions and garlic in olive oil.',
      'Add chopped tomatoes and cook for 10 minutes.',
      'Pour in vegetable broth and let simmer for 15 minutes.',
      'Blend the soup until smooth and add basil before serving.'
    ],
    status: 'Not Started',
    image: 'https://thecozyapron.com/wp-content/uploads/2012/02/tomato-basil-soup_thecozyapron_1.jpg',
    rating: 4.2
  },
  {
    id: '5',
    name: 'Mango Smoothie',
    category: Category.Beverage,
    cookingTime: 10,
    ingredients: [
      { name: 'Mango', quantity: 1, unit: 'piece' },
      { name: 'Greek Yogurt', quantity: 1, unit: 'cup' },
      { name: 'Honey', quantity: 1, unit: 'tbsp' },
      { name: 'Ice Cubes', quantity: 5, unit: 'pieces' },
      { name: 'Milk', quantity: 0.5, unit: 'cup' }
    ],
    completedSteps: 0,
    steps: [
      'Peel and chop the mango.',
      'Blend the mango, yogurt, honey, ice, and milk.',
      'Serve chilled.'
    ],
    status: 'Not Started',
    image: 'https://getinspiredeveryday.com/wp-content/uploads/2023/03/Mango-Smoothie-Get-Inspired-Everyday-8.jpg',
    rating: 4.9
  }
];