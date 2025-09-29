"use client";

import "../styles/progressbar.css";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

NProgress.configure({ showSpinner: false, easing: "ease", speed: 500 });

export default function ProgressBar() {
  const pathname = usePathname();

  useEffect(() => {
    NProgress.set(0.0);
    NProgress.set(0.2);
    NProgress.set(0.4);
    NProgress.set(0.6);
    NProgress.set(0.8);
    NProgress.set(1);
  }, [pathname]);

  return null;
}
