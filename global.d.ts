// global.d.ts

declare global {
  interface Window {
    ReactNativeWebView: any;
    gtag: (...args: any[]) => void;
  }
}
export {};
