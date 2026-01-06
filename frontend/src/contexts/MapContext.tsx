"use client";

import { createContext, useContext, useRef, useCallback } from "react";

interface MapContextType {
  jumpToPost: (postId: string) => void;
  registerJumpHandler: (handler: (postId: string) => void) => void;
}

const MapContext = createContext<MapContextType | null>(null);

export const MapProvider = ({ children }: { children: React.ReactNode }) => {
  const jumpHandlerRef = useRef<((postId: string) => void) | null>(null);

  const registerJumpHandler = useCallback(
    (handler: (postId: string) => void) => {
      jumpHandlerRef.current = handler;
    },
    []
  );

  const jumpToPost = useCallback((postId: string) => {
    jumpHandlerRef.current?.(postId);
  }, []);

  return (
    <MapContext.Provider value={{ jumpToPost, registerJumpHandler }}>
      {children}
    </MapContext.Provider>
  );
};

export const useMapControl = () => {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error("useMapControl must be used within MapProvider");
  }
  return context;
};
