/**
 * Chương mới của câu chuyện: con gái Nguyễn Hằng Châu.
 * Sửa tên, ngày, lời kể, ảnh ở đây — trang /con-gai tự cập nhật.
 *
 * Ảnh lấy từ public/images/baby/, đánh số 01..50 theo thứ tự thời gian
 * (sơ sinh -> hiện tại). Thêm ảnh mới: xem scripts/import-photos.mjs.
 */

export const baby = {
  name: "Hằng Châu",
  fullName: "Nguyễn Hằng Châu",
  nickname: "Cam",
  role: "Công chúa nhỏ",

  /** Sinh 27/01/2026, giờ VN. Dùng để đếm số ngày con đã ở bên bố mẹ. */
  birthISO: "2026-01-27T00:00:00+07:00",
  birthText: "27 · 01 · 2026",

  kicker: "Và rồi, câu chuyện có thêm một chương…",
  tagline:
    "Ngày xửa ngày xưa, khu rừng cổ tích ấy nở thêm một bông hoa hồng nhỏ. Bố mẹ gọi con là Cam — món quà ngọt ngào nhất mà cả thế giới này gửi tặng.",

  /** Ảnh ngang, sáng, đúng tông hồng — ảnh dọc bị cắt hỏng ở khung hero. */
  hero: "/images/baby/49.webp",
  portrait: "/images/baby/47.webp",
} as const;

export type Milestone = {
  when: string;
  title: string;
  body: string;
  image: string;
};

/** Các mốc lớn trong nửa năm đầu của con. */
export const babyMilestones: readonly Milestone[] = [
  {
    when: "27 · 01 · 2026",
    title: "Ngày con chào đời",
    image: "/images/baby/01.webp",
    body: "Buổi sáng hôm ấy, cả thế giới của bố mẹ thu lại vừa bằng một vòng tay. Con bé xíu, đỏ hỏn, khóc một tiếng thật to — và thế là từ giây phút đó, bố mẹ có thêm một trái tim nữa đập bên ngoài lồng ngực mình.",
  },
  {
    when: "Những ngày đầu tiên",
    title: "Cả nhà mình có ba người",
    image: "/images/baby/05.webp",
    body: "Những đêm không ngủ, những lần thay tã lúc ba giờ sáng, những cái ngáp bé xíu làm tan chảy mọi mệt mỏi. Bố học cách bế con thật khẽ, mẹ học cách nghe tiếng khóc mà đoán được con đang cần gì. Chúng ta học làm bố mẹ, cùng lúc con học làm người.",
  },
  {
    // Ngày lấy từ tấm bảng "14.2 · Special day" nhìn thấy trong chính bức ảnh.
    when: "14 · 02 · 2026",
    title: "Ngày đặc biệt đầu tiên",
    image: "/images/baby/12.webp",
    body: "Cái Tết đầu tiên, ngày lễ đầu tiên, tấm bảng nhỏ đề tên con — Cam · Hằng Châu. Con còn chưa biết gì, chỉ nằm ngoan cho bố mẹ chụp ảnh. Nhưng với bố mẹ, đó là ngày đặc biệt nhất mà mình từng có.",
  },
  {
    when: "Mùa xuân 2026",
    title: "Con biết hóng chuyện",
    image: "/images/baby/23.webp",
    body: "Con bắt đầu biết ngóc đầu, biết dõi mắt theo bố mẹ khắp phòng, biết ê a trả lời mỗi khi được gọi tên. Căn nhà từ ngày có con lúc nào cũng rộn ràng — và bố mẹ chợt nhận ra mình đã quên mất cảm giác yên tĩnh từ bao giờ.",
  },
  {
    when: "Mùa hè 2026",
    title: "Mùa hè đầu tiên của con",
    image: "/images/baby/32.webp",
    body: "Lần đầu con được thả mình xuống nước, đôi chân bé xíu đạp lung tung, mắt tròn xoe vì thích thú. Mùa hè đầu tiên trong đời con — và cũng là mùa hè hạnh phúc nhất mà bố mẹ từng có.",
  },
  {
    when: "Hôm nay",
    title: "Con lớn từng ngày",
    image: "/images/baby/48.webp",
    body: "Giờ con đã biết cười thành tiếng, biết đòi bế, biết nhoài người ra khi thấy bố mẹ về. Câu chuyện cổ tích của bố và mẹ bắt đầu từ một sân trường — và con chính là chương đẹp nhất mà chúng ta chưa từng dám mơ tới.",
  },
] as const;

/** Toàn bộ album ảnh của con, theo thứ tự thời gian. */
export const babyGallery: readonly string[] = Array.from(
  { length: 50 },
  (_, i) => `/images/baby/${String(i + 1).padStart(2, "0")}.webp`,
);

/** Vài tấm nổi bật để mời gọi từ trang chủ. */
export const babyHighlights: readonly string[] = [
  "/images/baby/12.webp",
  "/images/baby/26.webp",
  "/images/baby/32.webp",
  "/images/baby/47.webp",
];
