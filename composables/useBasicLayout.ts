import { useBreakpoints } from "@vueuse/core";

export function useBasicLayout() {
  const breakpointsTailwind = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    "2xl": 1536,
  };
  const breakpoints = useBreakpoints(breakpointsTailwind);
  const isMobile = breakpoints.smaller("sm");

  return { isMobile };
}
