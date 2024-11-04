import { Stack } from "expo-router";

export default function RecipeLayout(){
  return(
    <Stack>
      <Stack.Screen name="home" options={{
        title: "Recipe",
        headerShown: false,
      }} />
      <Stack.Screen name="details/[id]" options={{
        title: "Recipe Detail",
        headerShown: true,
      }} />
    </Stack>
  )
}