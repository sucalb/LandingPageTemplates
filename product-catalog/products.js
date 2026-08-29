/* ============================================================
   DANH SÁCH SẢN PHẨM
   ------------------------------------------------------------
   Đây là file DUY NHẤT cần sửa khi thêm/bớt/đổi sản phẩm.
   Không cần biết code — chỉ cần copy một khối {...}, dán xuống
   dưới, rồi đổi chữ bên trong dấu nháy "..." là xong.

   Các trường:
   - id       : mã riêng, không trùng nhau (viết liền không dấu)
   - name     : tên sản phẩm
   - category : phải khớp đúng một trong các mã ở CATEGORIES bên dưới
   - price    : giá hiển thị dạng chữ. Để "" (rỗng) nếu muốn hiện "Liên hệ"
   - desc     : mô tả ngắn 1-2 câu, hiện khi bấm phóng to ảnh
   - image    : đường dẫn ảnh. Đặt ảnh vào thư mục images/ rồi ghi
               "images/ten-file.jpg". Ảnh nên vuông (1:1), > 800px
               để phóng to không bị vỡ nét.
   - badge    : nhãn nhỏ tuỳ chọn, ví dụ "Mới", "Bán chạy". Để "" nếu không cần.
   ============================================================ */

const CATEGORIES = [
  { id: "all",   label: "Tất cả" },
  { id: "table", label: "Đèn bàn" },
  { id: "ceil",  label: "Đèn trần" },
  { id: "wall",  label: "Đèn tường" },
  { id: "floor", label: "Đèn sàn" },
];

const PRODUCTS = [
  {
    id: "db-01",
    name: "Đèn bàn gỗ sồi Minimal",
    category: "table",
    price: "450.000₫",
    desc: "Thân gỗ sồi tự nhiên, chao vải lanh, ánh sáng vàng ấm 3000K. Phù hợp bàn làm việc và bàn trà.",
    image: "images/placeholder-table-1.svg",
    badge: "Bán chạy",
  },
  {
    id: "db-02",
    name: "Đèn bàn kẹp Clip Light",
    category: "table",
    price: "280.000₫",
    desc: "Kẹp trực tiếp vào mép bàn hoặc kệ, tiết kiệm diện tích. Điều chỉnh góc chiếu 180°.",
    image: "images/placeholder-table-2.svg",
    badge: "",
  },
  {
    id: "dt-01",
    name: "Đèn trần thả Pendant tròn",
    category: "ceil",
    price: "620.000₫",
    desc: "Khung kim loại sơn tĩnh điện, dây treo chỉnh được độ cao 40–150cm.",
    image: "images/placeholder-ceil-1.svg",
    badge: "Bán chạy",
  },
  {
    id: "dt-02",
    name: "Đèn trần chùm 3 bóng",
    category: "ceil",
    price: "1.150.000₫",
    desc: "Bộ 3 chao thuỷ tinh mờ, phù hợp phòng khách trần cao từ 2m7.",
    image: "images/placeholder-ceil-2.svg",
    badge: "",
  },
  {
    id: "dtg-01",
    name: "Đèn tường hắt nến Wall Sconce",
    category: "wall",
    price: "320.000₫",
    desc: "Ánh sáng hắt lên tường tạo điểm nhấn, phù hợp hành lang và đầu giường.",
    image: "images/placeholder-wall-1.svg",
    badge: "",
  },
  {
    id: "df-01",
    name: "Đèn sàn chân gỗ Arc",
    category: "floor",
    price: "890.000₫",
    desc: "Thân cao 155cm, chân đế gỗ tần bì chắc chắn, chao vải có thể tháo giặt.",
    image: "images/placeholder-floor-1.svg",
    badge: "Bán chạy",
  },
  {
    id: "df-02",
    name: "Đèn sàn góc Tripod",
    category: "floor",
    price: "540.000₫",
    desc: "Ba chân gỗ xoè kiểu chân máy ảnh, phong cách Scandinavian.",
    image: "images/placeholder-floor-2.svg",
    badge: "",
  },
];
