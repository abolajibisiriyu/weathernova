import { useEffect } from "react";

export type loadScriptParams = {
  url: string;
  onLoad?: () => void;
  onError?: (...arg: any) => void;
};
export default function useLoadScript(params: loadScriptParams) {
  const { url, onLoad, onError } = params;
  useEffect(() => {
    const script = document.createElement("script");
    script.src = url;
    script.async = true;
    script.defer = true;
    if (onLoad) script.addEventListener("load", onLoad);
    if (onError) script.addEventListener("error", onError);
    // document.currentScript?.parentNode?.appendChild(script);
    document.body.appendChild(script);
    return () => {
      //   document.currentScript?.parentElement?.removeChild(script);
      console.log("unmounting ...");
      document.body.removeChild(script);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
