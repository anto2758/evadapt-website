type TauriWindow = Window & {
  __TAURI_INTERNALS__?: unknown;
};

export function isGraphiteDesktop() {
  return (
    typeof window !== "undefined" &&
    Boolean((window as TauriWindow).__TAURI_INTERNALS__)
  );
}
