// "use client";

// import "../styles/progressbar.css";
// import { useEffect } from "react";
// import { usePathname } from "next/navigation";
// import NProgress from "nprogress";
// import "nprogress/nprogress.css";

// NProgress.configure({ showSpinner: false, easing: "ease", speed: 500 });

// export default function ProgressBar() {
//   const pathname = usePathname();

//   useEffect(() => {
//     NProgress.set(0.0);
//     NProgress.set(0.2);
//     NProgress.set(0.4);
//     NProgress.set(0.6);
//     NProgress.set(0.8);
//     NProgress.set(1);
//   }, [pathname]);

//   return null;
// }

"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import NProgress from "nprogress";
import "../styles/progressbar.css";

NProgress.configure({ showSpinner: false, easing: "ease", speed: 800 });

export default function ProgressBar() {
  const pathname = usePathname();

  useEffect(() => {
    // stop the bar when route changes
    NProgress.done();
  }, [pathname]);

  useEffect(() => {
    // start bar immediately on link click
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a") as HTMLAnchorElement | null;

      if (
        anchor &&
        anchor.href.startsWith(window.location.origin) && // internal link
        !anchor.target && // not opening in new tab
        !e.metaKey &&
        !e.ctrlKey &&
        !e.shiftKey &&
        !e.altKey // no modifier keys
      ) {
        NProgress.start();
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
