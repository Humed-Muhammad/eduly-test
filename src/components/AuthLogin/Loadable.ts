/**
 *
 * Asynchronously loads the component for Cart
 *
 */

import { lazyLoad } from "@/utils/loadable";

export const AuthLogin = lazyLoad(
  () => import("./index"),
  (module) => module.AuthLogin
);
