/* ============================================================
   Cầu nối "Lưu trên admin.html -> tự đăng lên trang thật"
   ------------------------------------------------------------
   Nhận nội dung products.js mới từ admin.html, kiểm tra mật khẩu,
   rồi commit thẳng file đó lên GitHub. Netlify đang bật auto-deploy
   từ nhánh main nên sau khi commit xong, trang tự build lại và
   khách sẽ thấy thay đổi sau khoảng 20-30 giây.

   Cần 2 biến môi trường, đặt trong Netlify -> Project configuration
   -> Environment variables (không đặt trong code):
   - ADMIN_PASSWORD : mật khẩu để xác nhận thao tác lưu
   - GITHUB_TOKEN    : fine-grained token, chỉ cấp quyền
                       "Contents: Read and write" cho đúng repo này
   ============================================================ */

const REPO = "sucalb/LandingPageTemplates";
const BRANCH = "main";
const FILE_PATH = "product-catalog/products.js";

exports.handler = async function (event) {
  if (event.httpMethod !== "POST") {
    return json(405, { ok: false, error: "Method not allowed" });
  }

  let body;
  try {
    body = JSON.parse(event.body || "{}");
  } catch (e) {
    return json(400, { ok: false, error: "Dữ liệu gửi lên không đọc được." });
  }

  const password = body.password;
  const content = body.content;

  if (!process.env.ADMIN_PASSWORD) {
    return json(500, { ok: false, error: "Server chưa cấu hình ADMIN_PASSWORD." });
  }
  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return json(401, { ok: false, error: "Sai mật khẩu." });
  }
  if (!process.env.GITHUB_TOKEN) {
    return json(500, { ok: false, error: "Server chưa cấu hình GITHUB_TOKEN." });
  }
  if (!content || typeof content !== "string" || content.length < 50) {
    return json(400, { ok: false, error: "Nội dung sản phẩm trống hoặc không hợp lệ." });
  }

  const apiBase = "https://api.github.com/repos/" + REPO + "/contents/" + FILE_PATH;
  const headers = {
    Authorization: "Bearer " + process.env.GITHUB_TOKEN,
    Accept: "application/vnd.github+json",
    "User-Agent": "product-catalog-admin",
  };

  try {
    // 1. Lấy sha hiện tại của file — GitHub bắt buộc phải có sha mới cho ghi đè
    const getRes = await fetch(apiBase + "?ref=" + BRANCH, { headers: headers });
    if (!getRes.ok) {
      const t = await getRes.text();
      return json(502, { ok: false, error: "Không đọc được file hiện tại trên GitHub: " + t });
    }
    const getData = await getRes.json();
    const sha = getData.sha;

    // 2. Ghi đè nội dung mới
    const putRes = await fetch(apiBase, {
      method: "PUT",
      headers: Object.assign({ "Content-Type": "application/json" }, headers),
      body: JSON.stringify({
        message: "Cập nhật sản phẩm qua trang quản trị",
        content: Buffer.from(content, "utf-8").toString("base64"),
        sha: sha,
        branch: BRANCH,
      }),
    });
    if (!putRes.ok) {
      const t = await putRes.text();
      return json(502, { ok: false, error: "Lưu lên GitHub thất bại: " + t });
    }
    return json(200, { ok: true });
  } catch (e) {
    return json(500, { ok: false, error: "Lỗi không xác định: " + e.message });
  }
};

function json(statusCode, obj) {
  return {
    statusCode: statusCode,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(obj),
  };
}
