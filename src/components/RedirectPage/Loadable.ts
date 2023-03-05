/**
 *
 * Asynchronously loads the component for Cart
 *
 */

import { lazyLoad } from "@/utils/loadable";

export const RedirectPage = lazyLoad(
  () => import("./index"),
  (module) => module.RedirectPage
);
