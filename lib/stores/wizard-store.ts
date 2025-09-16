import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import {
  WizardState,
  GuestData,
  User,
  Material,
  Category,
  Dimensions,
  Colors,
  GlassType
} from '../types';
import { supabase } from '../supabase';

interface WizardStore extends WizardState {
  // Actions
  setCurrentStep: (step: number) => void;
  setGuestMode: (isGuest: boolean) => void;
  setGuestData: (data: GuestData) => void;
  setUser: (user: User) => void;
  setMaterial: (material: Material) => void;
  setCategory: (category: Category) => void;
  setDimensions: (dimensions: Dimensions) => void;
  setColors: (colors: Colors) => void;
  setGlassType: (glassType: GlassType) => void;
  addAccessory: (accessoryId: string) => void;
  removeAccessory: (accessoryId: string) => void;
  setConfigurationId: (id: string) => void;
  setCompleted: (completed: boolean) => void;

  // Navigation
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;

  // Persistence
  saveToDatabase: () => Promise<void>;
  loadFromDatabase: (id: string) => Promise<void>;
  reset: () => void;

  // Validation
  isStepValid: (step: number) => boolean;
  canProceedToNextStep: () => boolean;
}

const initialState: WizardState = {
  currentStep: 0,
  isGuest: true,
  accessories: [],
  isCompleted: false,
};

export const useWizardStore = create<WizardStore>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,

        setCurrentStep: (step) => {
          set({ currentStep: step });
          get().saveToDatabase();
        },

        setGuestMode: (isGuest) => {
          set({ isGuest });
          get().saveToDatabase();
        },

        setGuestData: (data) => {
          set({ guestData: data });
          get().saveToDatabase();
        },

        setUser: (user) => {
          set({ user, isGuest: false });
          get().saveToDatabase();
        },

        setMaterial: (material) => {
          set({ material });
          get().saveToDatabase();
        },

        setCategory: (category) => {
          set({ category });
          get().saveToDatabase();
        },

        setDimensions: (dimensions) => {
          set({ dimensions });
          get().saveToDatabase();
        },

        setColors: (colors) => {
          set({ colors });
          get().saveToDatabase();
        },

        setGlassType: (glassType) => {
          set({ glassType });
          get().saveToDatabase();
        },

        addAccessory: (accessoryId) => {
          const { accessories } = get();
          if (!accessories.includes(accessoryId)) {
            set({ accessories: [...accessories, accessoryId] });
            get().saveToDatabase();
          }
        },

        removeAccessory: (accessoryId) => {
          const { accessories } = get();
          set({ accessories: accessories.filter(id => id !== accessoryId) });
          get().saveToDatabase();
        },

        setConfigurationId: (id) => set({ configurationId: id }),

        setCompleted: (completed) => {
          set({ isCompleted: completed });
          get().saveToDatabase();
        },

        nextStep: () => {
          const { currentStep, canProceedToNextStep } = get();
          if (canProceedToNextStep()) {
            get().setCurrentStep(currentStep + 1);
          }
        },

        prevStep: () => {
          const { currentStep } = get();
          if (currentStep > 0) {
            get().setCurrentStep(currentStep - 1);
          }
        },

        goToStep: (step) => {
          const { isStepValid } = get();
          // Allow going back to any previous step, but validate for forward navigation
          if (step < get().currentStep || isStepValid(step)) {
            get().setCurrentStep(step);
          }
        },

        saveToDatabase: async () => {
          try {
            const state = get();

            const dataToSave = {
              user_id: state.user?.id || null,
              guest_data: state.guestData || null,
              material: state.material || null,
              category: state.category || null,
              dimensions: state.dimensions || null,
              colors: state.colors || null,
              glass_type: state.glassType || null,
              accessories: state.accessories || null,
              current_step: state.currentStep,
              is_completed: state.isCompleted,
            };

            if (state.configurationId) {
              // Update existing configuration
              const { error } = await supabase
                .from('configurations')
                .update(dataToSave)
                .eq('id', state.configurationId);

              if (error) throw error;
            } else {
              // Create new configuration
              const { data, error } = await supabase
                .from('configurations')
                .insert([dataToSave])
                .select()
                .single();

              if (error) throw error;
              if (data) {
                set({ configurationId: data.id });
              }
            }
          } catch (error: any) {
            console.error('Error saving to database:', {
              message: error?.message,
              details: error?.details,
              hint: error?.hint,
              code: error?.code,
              fullError: error
            });
            // In a real app, you might want to show a toast notification here
          }
        },

        loadFromDatabase: async (id) => {
          try {
            const { data, error } = await supabase
              .from('configurations')
              .select('*')
              .eq('id', id)
              .single();

            if (error) throw error;

            if (data) {
              set({
                configurationId: data.id,
                isGuest: !data.user_id,
                guestData: data.guest_data,
                user: data.user_id ? { id: data.user_id, ...data.guest_data } : undefined,
                material: data.material,
                category: data.category,
                dimensions: data.dimensions,
                colors: data.colors,
                glassType: data.glass_type,
                accessories: data.accessories || [],
                currentStep: data.current_step,
                isCompleted: data.is_completed,
              });
            }
          } catch (error) {
            console.error('Error loading from database:', error);
          }
        },

        reset: () => {
          set(initialState);
          // Clear from localStorage
          localStorage.removeItem('wizard-storage');
        },

        isStepValid: (step) => {
          const state = get();

          switch (step) {
            case 0:
              return state.isGuest ? !!state.guestData : !!state.user;
            case 1:
              return !!state.material;
            case 2:
              return !!state.category;
            case 3:
              return !!state.dimensions && !!state.colors;
            case 4:
              return true; // Preview step is always valid
            case 5:
              return state.isCompleted;
            default:
              return false;
          }
        },

        canProceedToNextStep: () => {
          const { currentStep, isStepValid } = get();
          return isStepValid(currentStep);
        },
      }),
      {
        name: 'wizard-storage',
        partialize: (state) => ({
          currentStep: state.currentStep,
          isGuest: state.isGuest,
          guestData: state.guestData,
          user: state.user,
          material: state.material,
          category: state.category,
          dimensions: state.dimensions,
          colors: state.colors,
          glassType: state.glassType,
          accessories: state.accessories,
          configurationId: state.configurationId,
          isCompleted: state.isCompleted,
        }),
      }
    ),
    {
      name: 'wizard-store',
    }
  )
);
