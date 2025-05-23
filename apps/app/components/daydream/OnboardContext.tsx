import { createContext, useContext, useState, useMemo, ReactNode } from "react";

// Define the possible onboarding steps
export type OnboardingStep = "persona" | "camera" | "prompt" | "main";

export type CameraPermission = "prompt" | "granted" | "denied";

interface OnboardContextType {
  // Current step in the onboarding flow
  currentStep: OnboardingStep;
  // Initialization of user and camera permissions
  isInitializing: boolean;
  hasSharedPrompt: boolean;
  cameraPermission: CameraPermission;
  // Selected options for each step
  selectedPersonas: string[];
  customPersona: string;
  selectedPrompt: string | null;
  // User profile data
  displayName: string;
  displayNameError: string | null;
  avatarSeed: string;
  // When a prompt is selected, we fade out the welcome screen
  isFadingOut: boolean;
  // Methods to update state
  setCurrentStep: (step: OnboardingStep) => void;
  setCameraPermission: (permission: CameraPermission) => void;
  setSelectedPersonas: (
    personas: string[] | ((prev: string[]) => string[]),
  ) => void;
  setCustomPersona: (persona: string) => void;
  setSelectedPrompt: (prompt: string | null) => void;
  setIsInitializing: (initializing: boolean) => void;
  setFadingOut: (fadingOut: boolean) => void;
  setDisplayName: (name: string) => void;
  setDisplayNameError: (error: string | null) => void;
  setAvatarSeed: (seed: string) => void;
}

// Create the context with a default undefined value
const OnboardContext = createContext<OnboardContextType | undefined>(undefined);

// Provider component
export function OnboardProvider({
  children,
  hasSharedPrompt,
}: {
  children: ReactNode;
  hasSharedPrompt: boolean;
}) {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>("persona");
  const [cameraPermission, setCameraPermission] =
    useState<CameraPermission>("prompt");
  const [selectedPersonas, setSelectedPersonas] = useState<string[]>([]);
  const [customPersona, setCustomPersona] = useState<string>("");
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const [isFadingOut, setFadingOut] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [displayNameError, setDisplayNameError] = useState<string | null>(null);
  const [avatarSeed, setAvatarSeed] = useState("");

  const value = useMemo(
    () => ({
      currentStep,
      cameraPermission,
      selectedPersonas,
      customPersona,
      selectedPrompt,
      isInitializing,
      isFadingOut,
      displayName,
      displayNameError,
      avatarSeed,
      setCurrentStep,
      setCameraPermission,
      setSelectedPersonas,
      setCustomPersona,
      setSelectedPrompt,
      setIsInitializing,
      setFadingOut,
      setDisplayName,
      setDisplayNameError,
      setAvatarSeed,
      hasSharedPrompt,
    }),
    [
      currentStep,
      cameraPermission,
      selectedPersonas,
      customPersona,
      selectedPrompt,
      isInitializing,
      isFadingOut,
      displayName,
      displayNameError,
      avatarSeed,
      hasSharedPrompt,
    ],
  );

  return (
    <OnboardContext.Provider value={value}>{children}</OnboardContext.Provider>
  );
}

// Custom hook to use the onboard context
export function useOnboard() {
  const context = useContext(OnboardContext);
  if (context === undefined) {
    throw new Error("useOnboard must be used within an OnboardProvider");
  }
  return context;
}
