import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <p className="heading-script text-6xl text-gold">Oops...</p>
      <h1 className="mt-2 font-display text-5xl text-wine-deep">404</h1>
      <p className="mt-4 max-w-md font-serif text-xl text-muted">
        Trang bạn tìm không tồn tại. Nhưng tình yêu của Trâm &amp; Trường thì luôn ở đây. ♥
      </p>
      <Link href="/" className="btn-gold mt-8">
        Về trang chủ
      </Link>
    </section>
  );
}
