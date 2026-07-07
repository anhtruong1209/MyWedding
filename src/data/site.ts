/**
 * Nguồn dữ liệu duy nhất cho toàn bộ website cưới.
 * Sửa nội dung (tên, ngày, địa chỉ, ảnh, QR, RSVP...) ở đây, tất cả các trang tự cập nhật.
 * Dữ liệu bất biến (as const) — không mutate ở nơi khác.
 */

export const couple = {
  bride: {
    name: "Quỳnh Trâm",
    fullName: "Đỗ Quỳnh Trâm",
    role: "Cô dâu",
    year: 2000,
    tagline:
      "Cô gái nhỏ mang trong mình ước mơ về một câu chuyện cổ tích. “Em là người lớn của cả thế giới, nhưng chỉ là bạn nhỏ của một người thôi.” ❤️",
    photo: "/images/misc/2.jpg",
    portrait: "/images/background/subheader-2.jpg",
    facebook: "https://www.facebook.com/profile.php?id=100006943964259",
    email: "doquynhtram2010@gmail.com",
  },
  groom: {
    name: "Anh Trường",
    fullName: "Nguyễn Anh Trường",
    role: "Chú rể",
    year: 2000,
    tagline:
      "Lập trình viên vui tính, luôn yêu đời, yêu âm nhạc và thích phiêu lưu. “Trên đời này chỉ có một thứ hạnh phúc duy nhất là yêu và được yêu em.” ❤️",
    photo: "/images/misc/1.jpg",
    portrait: "/images/background/subheader-1.jpg",
    facebook: "https://www.facebook.com/anhtruong1209",
    email: "sdlla0911114819@gmail.com",
  },
} as const;

export const site = {
  title: "Trâm & Trường — Câu chuyện cổ tích",
  shortTitle: "Trâm & Trường",
  description:
    "Thiệp cưới online của Quỳnh Trâm & Anh Trường. Trân trọng kính mời bạn đến chung vui trong ngày trọng đại của chúng tôi.",
  hero: {
    kicker: "Save the date",
    quote:
      "Tuổi 17 năm ấy, em có anh, anh như có cả thế giới trong vòng tay của mình.",
    slides: ["/images/slider/1.jpg", "/images/slider/2.jpg", "/images/slider/3.jpg"],
  },
  music: "/music/loop.mp3",
  favicon: "/images/icon1.png",
  copyright: "© 2024 · Thiết kế bởi Anh Trường",
} as const;

/** Ngày cưới chính thức (để tính "đã kết hôn được X ngày"). Múi giờ VN. */
export const weddingDateISO = "2024-11-10T17:00:00+07:00";
export const engagementDateISO = "2024-11-02T14:00:00+07:00";

export type WeddingEvent = {
  key: string;
  label: string;
  title: string;
  time: string;
  dateText: string;
  dateISO: string;
  venue: string;
  address: string;
  image: string;
  mapEmbed: string;
};

export const events: readonly WeddingEvent[] = [
  {
    key: "le-hoi",
    label: "Lễ hỏi",
    title: "Tổ chức lễ hỏi",
    time: "14:00",
    dateText: "Thứ Bảy, ngày 02 tháng 11 năm 2024",
    dateISO: engagementDateISO,
    venue: "Tư gia nhà Gái",
    address: "8/61 Nguyễn Công Trứ, Hàng Kênh, Lê Chân, Hải Phòng",
    image: "/images/misc/4.jpg",
    mapEmbed:
      "https://maps.google.com/maps?width=100%25&height=600&hl=vi&q=61%20P.%20Nguy%E1%BB%85n%20C%C3%B4ng%20Tr%E1%BB%A9+(Nh%C3%A0%20G%C3%A1i)&t=&z=17&ie=UTF8&iwloc=B&output=embed",
  },
  {
    key: "le-cuoi",
    label: "Lễ cưới",
    title: "Tiệc cưới",
    time: "17:00",
    dateText: "Chủ Nhật, ngày 10 tháng 11 năm 2024",
    dateISO: weddingDateISO,
    venue: "Sảnh Sapphire · Trung tâm tiệc cưới Hải Đăng Plaza",
    address: "19 P. Trần Khánh Dư, Máy Tơ, Ngô Quyền, Hải Phòng, Việt Nam",
    image: "/images/misc/3.jpg",
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d59651.66197957352!2d106.6510736!3d20.8628232!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314a7be3b26b7f15%3A0xfb767616d10e5e50!2zVHJ1bmcgdMOibSB0aeG7h2MgY8aw4bubaSBI4bqjaSDEkMSDbmcgUGxhemEgSOG6o2kgUGjDsm5n!5e0!3m2!1svi!2s!4v1726651008685!5m2!1svi!2s",
  },
] as const;

export type TimelineItem = {
  year: string;
  title: string;
  body: string;
  image: string;
};

export const timeline: readonly TimelineItem[] = [
  {
    year: "2017",
    title: "Chúng tôi gặp nhau như nào?",
    image: "/images/story/1.jpg",
    body: "Năm 2017, chúng tôi gặp nhau lần đầu tiên tại trường THPT Ngô Quyền. Cả hai đều học cùng khóa và cùng trải qua những kỳ thi căng thẳng của những năm cuối cấp. Ban đầu chỉ là những lần gặp gỡ ngắn ngủi khi cùng tham gia các buổi ôn thi, nhưng dần dần mối quan hệ trở nên gần gũi hơn. Từ những cái nhìn thoáng qua, chúng tôi bắt đầu những cuộc trò chuyện nhỏ, và từ đó tình cảm nhẹ nhàng chớm nở — bắt đầu hành trình yêu thương kéo dài cho đến ngày hôm nay.",
  },
  {
    year: "2017",
    title: "Lần hẹn hò đầu tiên",
    image: "/images/story/2.jpg",
    body: "Bữa hẹn hò đầu tiên của chúng tôi diễn ra vào thời học sinh, khi cùng nhau khám phá những góc phố quen thuộc. Địa điểm hẹn hò là quán bánh mì chảo đối diện cổng trường. Trong không khí của buổi chiều nhẹ nhàng, chúng tôi cùng thưởng thức những chiếc bánh mì thơm ngon, trò chuyện và cười đùa. Những con phố nhỏ, ánh đèn vàng ấm áp đã tạo nên một ký ức đáng nhớ — và từ đó, mối quan hệ của chúng tôi dần trở nên sâu sắc hơn.",
  },
  {
    year: "2018 – 2024",
    title: "Cuộc sống trên Hà Nội",
    image: "/images/story/3.jpg",
    body: "Năm 2018 đánh dấu một bước ngoặt khi chúng tôi chính thức đính hôn. Sau đó chúng tôi chuyển đến Hà Nội, tiếp tục học tập và làm việc trong suốt 6 năm. Chúng tôi cùng khám phá những góc phố, thưởng thức món ngon và trải nghiệm cuộc sống đô thị sôi động. Những năm tháng ấy giúp chúng tôi gắn bó hơn, hiểu nhau sâu sắc hơn. Những khó khăn đã vượt qua càng làm cho tình yêu và sự đồng cảm trở nên mạnh mẽ hơn.",
  },
  {
    year: "Tháng 8, 2024",
    title: "Cầu hôn",
    image: "/images/story/4.jpg",
    body: "Vào một ngày không có sự kiện đặc biệt nào, tôi quyết định thực hiện một kế hoạch cầu hôn bất ngờ tại chính căn nhà của chúng tôi. Tôi chuẩn bị một bữa tối đơn giản nhưng ấm cúng, rồi quỳ xuống cầu hôn bằng chiếc nhẫn PNJ — biểu tượng của tình yêu và sự gắn bó. Cô ấy hoàn toàn bất ngờ, và niềm vui của cô ấy đã làm cho khoảnh khắc ấy trở nên thật đặc biệt.",
  },
  {
    year: "10 · 11 · 2024",
    title: "Chúng tôi cưới nhau",
    image: "/images/story/5.jpg",
    body: "Ngày 10 tháng 11 năm 2024, chúng tôi chính thức bước vào hành trình mới với một buổi lễ cưới đầy ý nghĩa. Chúng tôi cùng nhau trao lời thề, cam kết sẽ yêu thương và đồng hành cùng nhau suốt đời. Những lời chúc phúc, nụ cười và nước mắt hạnh phúc của mọi người đã làm cho ngày cưới trở nên hoàn hảo. Ngày cưới không chỉ là sự kết hợp của hai trái tim, mà còn là khởi đầu của một hành trình mới đầy hy vọng và yêu thương.",
  },
] as const;

/** Tiểu sử dài cho trang giới thiệu cô dâu / chú rể. */
export const bios = {
  bride: {
    name: "Quỳnh Trâm",
    role: "Cô dâu",
    hero: "/images/background/subheader-2.jpg",
    paragraphs: [
      {
        heading: "Đôi điều về cô dâu",
        body: "Xin chào mọi người, tôi là Quỳnh Trâm, 25 tuổi, sinh năm 2000 và là bạn đời của anh Trường. Chúng tôi quen nhau từ những năm tháng cấp 3, tại ngôi trường Ngô Quyền thân thuộc, nơi đã chứng kiến bao câu chuyện của tuổi trẻ. Từ những ngày còn ngại ngùng trao nhau ánh mắt giữa lớp 11, đến hôm nay — ngày chúng tôi sắp chính thức trở thành vợ chồng, tôi không khỏi xúc động khi nhìn lại hành trình ấy.",
      },
      {
        heading: "Chặng đường tình yêu",
        body: "Chúng tôi đã yêu nhau hơn 7 năm rưỡi — một khoảng thời gian đủ để hiểu rõ nhau và nhận ra rằng chúng tôi sinh ra là để dành cho nhau. Từ những cô cậu học sinh đầy mộng mơ đến khi trưởng thành hơn, chúng tôi đã trải qua biết bao cung bậc cảm xúc. Mỗi kỷ niệm, mỗi khoảnh khắc nhỏ bé đều chứa đựng tình cảm chân thành mà cả hai dành cho nhau.",
      },
      {
        heading: "Lời nhắn gửi tới chồng yêu",
        body: "Anh Trường à, anh đã luôn là người bạn, người đồng hành và là nguồn động viên lớn nhất của em. Em cảm ơn anh vì đã luôn tin tưởng và yêu thương em. Em mong rằng từ nay về sau, chúng mình sẽ mãi nắm tay nhau đi qua mọi chặng đường phía trước, cùng nhau xây dựng một tổ ấm đầy ắp tình yêu thương và hạnh phúc.",
      },
      {
        heading: "Trân trọng",
        body: "Trong mắt em, cuộc sống là một hành trình dài và đẹp đẽ, và anh chính là mảnh ghép hoàn hảo giúp hành trình ấy trở nên trọn vẹn. Cảm ơn tất cả mọi người vì đã đến đây chứng kiến và chia sẻ ngày đặc biệt này với chúng tôi. Với tất cả tình yêu và sự trân trọng, Quỳnh Trâm.",
      },
    ],
  },
  groom: {
    name: "Anh Trường",
    role: "Chú rể",
    hero: "/images/background/subheader-1.jpg",
    paragraphs: [
      {
        heading: "Đôi điều về chú rể",
        body: "Xin chào tất cả mọi người, tôi là Anh Trường, 25 tuổi, sinh năm 2000 và là một cựu sinh viên của Đại học FPT. Chúng tôi quen nhau từ những ngày còn ngồi trên ghế nhà trường cấp 3, tại trường THPT Ngô Quyền. Tôi vẫn nhớ như in ngày đầu tiên gặp cô ấy — giữa lớp 11, giữa cái ngây ngô, trong sáng của tuổi trẻ. Đó là một tình yêu trưởng thành, chân thành và bền vững.",
      },
      {
        heading: "Hành trình yêu nhau",
        body: "Đã hơn 7 năm rưỡi kể từ ngày chúng tôi chính thức yêu nhau. Có những lúc tưởng chừng khó khăn sẽ làm chùn bước cả hai, nhưng nhờ tình yêu và sự thấu hiểu, chúng tôi đã vượt qua tất cả. Ngày hôm nay, khi đứng trước cột mốc quan trọng nhất của cuộc đời, tôi cảm thấy thật sự may mắn khi có được người con gái tuyệt vời như Trâm làm vợ.",
      },
      {
        heading: "Lời nhắn nhủ đến vợ yêu",
        body: "Trâm à, đã gần một thập kỷ kể từ khi chúng mình nắm tay nhau lần đầu tiên. Anh cảm nhận rằng em chính là món quà tuyệt vời nhất mà cuộc đời đã trao tặng cho anh. Anh hứa rằng trong suốt quãng đời còn lại, anh sẽ luôn yêu thương, chăm sóc và trân trọng em như ngày đầu.",
      },
      {
        heading: "Trân trọng",
        body: "Cuộc đời này là một hành trình dài, và anh thật sự trân trọng từng giây phút được ở bên cạnh em. Cảm ơn em, vì đã chọn anh, và cảm ơn tất cả mọi người vì đã đến đây chứng kiến ngày trọng đại nhất của chúng tôi. Trân trọng và yêu thương, Anh Trường.",
      },
    ],
  },
} as const;

export type Testimonial = { body: string; author: string };

export const testimonials: readonly Testimonial[] = [
  {
    body: "Gửi đến một cặp đôi đặc biệt, những người đã chứng tỏ rằng tình yêu có thể là sự thật và mãi mãi. Chúc cuộc sống của các bạn tiếp tục phát triển trong tình yêu và hạnh phúc cùng nhau!",
    author: "Dương Anh · Bạn thân",
  },
  {
    body: "Lời chúc đám cưới cho những người bạn thân yêu của tôi. Tôi hy vọng cuộc sống của bạn sẽ tràn ngập niềm vui, hạnh phúc và nhiều tình yêu!",
    author: "Lê Tiến Tú · Bạn thân",
  },
  {
    body: "Mong các bạn sẽ có một cuộc sống lâu dài và hạnh phúc bên nhau. Luôn đối xử với nhau tốt hơn mức bạn muốn được đối xử.",
    author: "Độ Trần · Bạn thân",
  },
  {
    body: "Tôi chúc các bạn có một cuộc sống tuyệt vời bên nhau khi cùng nhau đi đến con đường hạnh phúc hôn nhân. Thật hạnh phúc cho bạn!",
    author: "Tùng Anh · Bạn thân",
  },
] as const;

export type GiftAccount = {
  label: string;
  qr: string;
  stk: string;
  bank: string;
  messenger: string;
  zalo: string;
};

export const gifts: readonly GiftAccount[] = [
  {
    label: "Mừng cưới đến Chú Rể",
    qr: "/images/qrcode_chure.png",
    stk: "02315915901",
    bank: "Ngân hàng của Chú Rể",
    messenger:
      "https://m.me/anhtruong1209?message=G%E1%BB%ADi%20%E1%BA%A3nh%20QR%20m%E1%BB%ABng%20c%C6%B0%E1%BB%9Bi",
    zalo: "https://zalo.me/0832206397",
  },
  {
    label: "Mừng cưới đến Cô Dâu",
    qr: "/images/qrcode_codau.png",
    stk: "0031000378125",
    bank: "Ngân hàng của Cô Dâu",
    messenger: "https://m.me/100006943964259",
    zalo: "https://zalo.me/0352432186",
  },
] as const;

export type GalleryCategory = { key: string; label: string; images: string[] };

export const galleryCategories: readonly GalleryCategory[] = [
  {
    key: "phong",
    label: "Ảnh phóng",
    images: ["/images/gallery/category-0/1.jpg", "/images/gallery/category-0/2.jpg"],
  },
  {
    key: "cuoi-1",
    label: "Ảnh cưới 1",
    images: Array.from({ length: 9 }, (_, i) => `/images/gallery/category-1/${i + 1}.jpg`),
  },
  {
    key: "cuoi-2",
    label: "Ảnh cưới 2",
    images: Array.from({ length: 9 }, (_, i) => `/images/gallery/category-2/${i + 1}.jpg`),
  },
  {
    key: "cuoi-3",
    label: "Ảnh cưới 3",
    images: Array.from({ length: 9 }, (_, i) => `/images/gallery/category-3/${i + 1}.jpg`),
  },
] as const;

/** Ảnh nổi bật cho khối gallery ở trang chủ. */
export const galleryHighlights: string[] = [
  "/images/gallery/category-1/1.jpg",
  "/images/gallery/category-1/3.jpg",
  "/images/gallery/category-2/2.jpg",
  "/images/gallery/category-2/5.jpg",
  "/images/gallery/category-3/1.jpg",
  "/images/gallery/category-3/4.jpg",
  "/images/gallery/category-1/7.jpg",
  "/images/gallery/category-3/6.jpg",
];

/** Cấu hình EmailJS cho RSVP (public key — an toàn để lộ phía client). */
export const emailjs = {
  publicKey: "MFD4VpF0hQKeezmoE",
  serviceId: "service_wizznxi",
  templateIds: ["template_4a6sk0h", "template_pwcpqg2"],
} as const;

export const nav: readonly { href: string; label: string }[] = [
  { href: "/", label: "Trang chủ" },
  { href: "/about-her", label: "Cô dâu" },
  { href: "/about-him", label: "Chú rể" },
  { href: "/story", label: "Câu chuyện" },
  { href: "/events", label: "Sự kiện" },
  { href: "/gallery", label: "Bộ sưu tập" },
] as const;
