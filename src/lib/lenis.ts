import type Lenis from "lenis";

/**
 * SmoothScroll tạo Lenis bên trong useEffect của riêng nó — không có context.
 * Singleton nhỏ này để các component khác (vd. nút tự động cuộn) gọi được
 * `lenis.scrollTo(...)` mà không phải truyền props/context xuống nhiều tầng.
 */
let instance: Lenis | null = null;

export function setLenisInstance(lenis: Lenis | null) {
  instance = lenis;
}

export function getLenis(): Lenis | null {
  return instance;
}
