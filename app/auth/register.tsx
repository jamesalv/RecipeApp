// src/screens/LoginScreen.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Pressable,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import * as EmailValidator from "email-validator";
import Button from "@/components/Button";
import { router } from "expo-router";

interface RegisterFormData {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

const RegisterScreen = ({ navigation }: { navigation: any }) => {
  const [formData, setFormData] = useState<RegisterFormData>({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const [errors, setErrors] = useState<Partial<RegisterFormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<RegisterFormData> = {};

    // Validate email
    if (!EmailValidator.validate(formData.email)) {
      newErrors.email = "Invalid email";
    }

    // Validate password
    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    if (formData.password !== formData.passwordConfirm) {
      newErrors.passwordConfirm = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (validateForm()) {
      try {
        const userData = {
          id: Date.now().toString(),
          username: formData.username,
          email: formData.email,
          password: formData.password,
        };

        await AsyncStorage.setItem('user', JSON.stringify(userData));
        Alert.alert(
          'Success',
          'Registration successful!',
          [{ text: 'OK', onPress: () => router.replace('/auth/login') }]
        );
      } catch (error) {
        Alert.alert('Error', 'Failed to register. Please try again.');
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.title}>Welcome Back!</Text>
            <Text style={styles.subtitle}>Sign in to continue cooking</Text>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Username</Text>
            <TextInput
              style={[styles.input, errors.username ? styles.inputError : null]}
              placeholder="Enter your email"
              value={formData.username}
              onChangeText={(text) => setFormData({ ...formData, username: text })}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />
            {errors.username && (
              <Text style={styles.errorText}>{errors.username}</Text>
            )}

            <Text style={styles.label}>Email</Text>
            <TextInput
              style={[styles.input, errors.email ? styles.inputError : null]}
              placeholder="Enter your email"
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />
            {errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}

            <Text style={styles.label}>Password</Text>
            <TextInput
              style={[
                styles.input,
                ...(errors.password ? [styles.inputError] : []),
              ]}
              placeholder="Enter your password"
              value={formData.password}
              onChangeText={(text) =>
                setFormData({ ...formData, password: text })
              }
              secureTextEntry
              autoComplete="password"
            />
            {errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}

            <Text style={styles.label}>Confirm Password</Text>
            <TextInput
              style={[
                styles.input,
                ...(errors.passwordConfirm ? [styles.inputError] : []),
              ]}
              placeholder="Confirm your password"
              value={formData.passwordConfirm}
              onChangeText={(text) =>
                setFormData({ ...formData, passwordConfirm: text })
              }
              secureTextEntry
              autoComplete="password"
            />
            {errors.passwordConfirm && (
              <Text style={styles.errorText}>{errors.passwordConfirm}</Text>
            )}
          </View>

          <Button title="Register" onPress={handleRegister} />

          <Pressable
            style={styles.registerContainer}
            onPress={() => router.replace("/auth/login")}
          >
            <Text style={styles.registerText}>
              Already have an account?{" "}
              <Text style={styles.registerLink}>Login</Text>
            </Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  headerContainer: {
    alignItems: "center",
    marginVertical: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 8,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: "#333",
    marginBottom: 8,
    marginLeft: 4,
  },
  input: {
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  inputError: {
    borderColor: "#ff4444",
  },
  errorText: {
    color: "#ff4444",
    fontSize: 12,
    marginBottom: 8,
    marginLeft: 4,
  },
  forgotPasswordContainer: {
    alignItems: "flex-end",
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: "#007AFF",
    fontSize: 14,
  },
  registerContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  registerText: {
    fontSize: 14,
    color: "#666",
  },
  registerLink: {
    color: "#007AFF",
    fontWeight: "600",
  },
});

export default RegisterScreen;
