import { useState, useCallback } from "react";
import { PosterConfig, Heat, CustomText } from "./types";

function generateId() {
  return Math.random().toString(36).slice(2);
}

export function usePosterConfig(defaultConfig: PosterConfig) {
  const [config, setConfig] = useState<PosterConfig>(defaultConfig);

  const updateConfig = useCallback((key: keyof PosterConfig, value: string) => {
    setConfig((c) => ({ ...c, [key]: value }));
  }, []);

  const updateHeat = useCallback((id: string, field: keyof Heat, value: string) => {
    setConfig((c) => ({
      ...c,
      heats: c.heats.map((h) =>
        h.id === id ? { ...h, [field]: value } : h
      ),
    }));
  }, []);

  const addHeat = useCallback(() => {
    setConfig((c) => ({
      ...c,
      heats: [
        ...c.heats,
        {
          id: generateId(),
          name: `BIEG ${c.heats.length + 1}`,
          scoreHome: "0",
        },
      ],
    }));
  }, []);

  const removeHeat = useCallback((id: string) => {
    setConfig((c) => ({
      ...c,
      heats: c.heats.filter((h) => h.id !== id),
    }));
  }, []);

  const addCustomText = useCallback(() => {
    setConfig((c) => ({
      ...c,
      customTexts: [
        ...(c.customTexts || []),
        {
          id: generateId(),
          text: "TEKST",
          x: 50,
          y: 50,
          fontSize: 24,
          color: "#ffffff",
          fontWeight: 800,
        },
      ],
    }));
  }, []);

  const updateCustomText = useCallback(
    (id: string, field: keyof CustomText, value: string | number) => {
      setConfig((c) => ({
        ...c,
        customTexts: (c.customTexts || []).map((ct) =>
          ct.id === id ? { ...ct, [field]: value } : ct
        ),
      }));
    },
    []
  );

  const removeCustomText = useCallback((id: string) => {
    setConfig((c) => ({
      ...c,
      customTexts: (c.customTexts || []).filter((ct) => ct.id !== id),
    }));
  }, []);

  const moveCustomText = useCallback((id: string, x: number, y: number) => {
    setConfig((c) => ({
      ...c,
      customTexts: (c.customTexts || []).map((ct) =>
        ct.id === id ? { ...ct, x, y } : ct
      ),
    }));
  }, []);

  return {
    config,
    setConfig,
    updateConfig,
    updateHeat,
    addHeat,
    removeHeat,
    addCustomText,
    updateCustomText,
    removeCustomText,
    moveCustomText,
  };
}
