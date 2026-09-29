import React, { createContext, useContext, useEffect, useState } from 'react';

export type DeviceMode = 'desktop' | 'tablet' | 'mobile';
export type ViewportPreference = 'auto' | DeviceMode;

interface ViewportContextValue {
  preference: ViewportPreference;
  setPreference: (pref: ViewportPreference) => void;
  effectiveMode: DeviceMode;
  detectedDevice: DeviceMode;
  isSimulated: boolean;
}

const ViewportContext = createContext<ViewportContextValue>({
  preference: 'auto',
  setPreference: () => {},
  effectiveMode: 'desktop',
  detectedDevice: 'desktop',
  isSimulated: false,
});

function detectDeviceFromWidth(width: number): DeviceMode {
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
}

export const ViewportProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [preference, setPreference] = useState<ViewportPreference>('auto');
  const [detectedDevice, setDetectedDevice] = useState<DeviceMode>(() =>
    typeof window !== 'undefined' ? detectDeviceFromWidth(window.innerWidth) : 'desktop'
  );

  useEffect(() => {
    const handleResize = () => {
      setDetectedDevice(detectDeviceFromWidth(window.innerWidth));
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const effectiveMode: DeviceMode = preference === 'auto' ? detectedDevice : preference;
  const isSimulated = preference !== 'auto' && preference !== detectedDevice;

  return (
    <ViewportContext.Provider
      value={{
        preference,
        setPreference,
        effectiveMode,
        detectedDevice,
        isSimulated,
      }}
    >
      {children}
    </ViewportContext.Provider>
  );
};

export const useViewport = () => useContext(ViewportContext);
