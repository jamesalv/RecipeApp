export enum Category {
  Appetizer = 'Appetizer',
  Breakfast = 'Breakfast',
  Brunch = 'Brunch',
  Dessert = 'Dessert',
  Dinner = 'Dinner',
  Lunch = 'Lunch',
  Snack = 'Snack',
  Soup = 'Soup',
  Beverage = 'Beverage'
}

type Steps = 'Not Started' | 'In Progress' | 'Done';

export interface Ingredient {
  name: string;
  quantity: number;
  unit: string;
}

export interface Recipe {
  id: string;
  name: string;
  category: Category;
  cookingTime: number;
  ingredients: Ingredient[];
  completedSteps: number;
  steps: string[];
  status: Steps;
  image: string;
  rating: number;
}