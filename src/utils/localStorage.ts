import type { Stressor } from '../types';

const STRESSORS_KEY = 'levelmind-stressors';

export const loadStressors = (): Stressor[] => {
  try {
    const stored = localStorage.getItem(STRESSORS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.warn('Failed to load stressors from localStorage:', error);
    return [];
  }
};

export const saveStressors = (stressors: Stressor[]): void => {
  try {
    localStorage.setItem(STRESSORS_KEY, JSON.stringify(stressors));
  } catch (error) {
    console.error('Failed to save stressors to localStorage:', error);
  }
};
