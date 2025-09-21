import { defineStore } from 'pinia';
import type { User } from '../types/auth';
import { computed, reactive } from 'vue';
import {
  addToLoacalstorage,
  getFromLocalstorage,
  removeFromLocalstorage,
} from '@/utils/LocalStorage';

const createInitialState = (): User => ({
  _id: '',
  name: '',
  email: '',
  role: 'user',
});

export const useAuthStore = defineStore('auth', () => {
  // data
  const user = reactive<User>(createInitialState());

  // Actions
  const setUser = (setUserData: User) => {
    Object.assign(user, setUserData);
    addToLoacalstorage('user', user);
  };

  const loadUserFromLocalstorage = () => {
    const userData = getFromLocalstorage('user') as User;
    Object.assign(user, userData);
  };

  const removeUser = () => {
    Object.assign(user, createInitialState);
    removeFromLocalstorage('user');
  };

  // Getters

  const isAuthenticated = computed(() => !!user._id);
  const isAdmin = computed(() => user.role === 'admin');

  const logout = (): void => console.log('Loggingout...');

  return {
    user,
    setUser,
    loadUserFromLocalstorage,
    removeUser,
    isAuthenticated,
    isAdmin,
    logout,
  };
});
