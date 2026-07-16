const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: './.env' });

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_PUBLISHABLE_KEY);

const seedDescription = `
<p>Chống Thấm Dulux Aquatech Hiệu Quả C8033 là chất chống thấm tường gốc xi măng, ứng dụng công nghệ Hydroshield, phù hợp cho tường bê tông và tường vữa xi măng tại các công trình dân dụng tại TP.HCM và các tỉnh miền Nam — lựa chọn tiết kiệm chi phí nhất trong dòng chống thấm Aquatech của Dulux.</p>

<h2>Chất Chống Thấm Tường Dulux Aquatech C8033 Là Gì</h2>
<p>Chống Thấm Dulux Aquatech Hiệu Quả C8033 thuộc dòng chống thấm Dulux Aquatech của AkzoNobel — thương hiệu sơn hàng đầu thế giới, sản xuất tại nhà máy Bình Dương. C8033 là sản phẩm chống thấm pha xi măng (cement-based), được thiết kế riêng phù hợp với môi trường và khí hậu miền Nam Việt Nam — nơi có mùa mưa kéo dài, độ ẩm cao và biên độ nhiệt ngày đêm lớn. Đây là sản phẩm chống thấm tường có mức giá sau chiết khấu tốt nhất trong toàn bộ danh mục Aquatech, phù hợp cho nhà trọ, nhà cấp 4, nhà phố cần giải pháp chống thấm hiệu quả và tiết kiệm.</p>
<p>Chống Thấm Dulux Aquatech Hiệu Quả C8033 là chất chống thấm tường gốc xi măng, ứng dụng công nghệ Hydroshield, phù hợp cho tường bê tông và tường vữa xi măng tại các công trình</p>

<h2>Thông Số Kỹ Thuật Sơn Chống Thấm Tường C8033</h2>
<p>Dưới đây là các thông số kỹ thuật từ TDS chính hãng mà bạn cần nắm trước khi thi công:</p>
<table style="width: 100%; border-collapse: collapse; margin-bottom: 15px;" border="1" cellpadding="8">
  <tr style="background-color: #f1f5f9;"><th>Thông số</th><th>Chi tiết</th></tr>
  <tr><td>Mã sản phẩm</td><td>C8033</td></tr>
  <tr><td>Công nghệ</td><td>Hydroshield — tăng cường liên kết hóa học, bề mặt đanh chắc</td></tr>
  <tr><td>Dạng sản phẩm</td><td>Chống thấm pha xi măng (cement-based)</td></tr>
  <tr><td>Bề mặt áp dụng</td><td>Tường bê tông, tường vữa xi măng</td></tr>
  <tr><td>Bao bì</td><td>6KG / 20KG</td></tr>
  <tr><td>Tỷ lệ pha trộn</td><td>0,5L nước + 1kg xi măng PC40+ + 1kg C8033</td></tr>
  <tr><td>Thời gian sử dụng sau khi trộn</td><td>Trong vòng 2 giờ</td></tr>
  <tr><td>Độ phủ lý thuyết</td><td>4–5 m²/kg/lớp</td></tr>
  <tr><td>Số lớp thi công</td><td>2–3 lớp</td></tr>
  <tr><td>Khô bề mặt</td><td>1–2 giờ</td></tr>
  <tr><td>Thi công lớp 2 sau</td><td>6–8 giờ kể từ lớp 1</td></tr>
  <tr><td>Dụng cụ thi công</td><td>Cọ, rulô</td></tr>
  <tr><td>Màu sắc</td><td>Không có (n/a)</td></tr>
  <tr><td>Giá tiêu chuẩn</td><td>929.000đ (6KG) / 2.800.000đ (20KG)</td></tr>
  <tr><td>Giá sau chiết khấu Tavaco</td><td>725.000đ (6KG) / 2.079.000đ (20KG)</td></tr>
</table>
<p><strong>Định mức thực tế theo kinh nghiệm Tavaco:</strong><br/>
Với độ phủ 4–5 m²/kg/lớp, thi công 2 lớp hoàn thiện:<br/>
1 thùng 6KG chống thấm được khoảng 24–30 m² tường (tùy độ nhám và độ hút của bề mặt)<br/>
1 thùng 20KG chống thấm được khoảng 80–100 m² tường<br/>
Bề mặt thô nhám hoặc hút nhiều sẽ tiêu hao nhiều hơn — bạn nên đo kỹ diện tích và tính dư thêm 10–15% để tránh thiếu vật liệu giữa chừng.</p>

<h2>Ưu Điểm Của Chất Chống Thấm Tường Dulux Aquatech Hiệu Quả</h2>
<p>Sơn chống thấm tường gốc xi măng Dulux C8033 được nhiều chủ nhà và thợ thi công tín nhiệm vì những lý do thực tế sau:</p>
<ul style="padding-left: 20px; line-height: 1.8;">
<li><strong>Giá tốt nhất trong danh mục Aquatech</strong> — với mức 725.000đ/6KG sau chiết khấu, C8033 là lựa chọn tiết kiệm nhất để chống thấm tường bê tông và tường vữa xi măng, phù hợp ngân sách của nhà trọ, nhà cấp 4 và các công trình nhỏ</li>
<li><strong>Công nghệ Hydroshield tăng cường liên kết hóa học</strong> — giúp hỗn hợp sau khi trộn xi măng bám chắc vào bề mặt, tạo lớp đanh cứng ngăn nước thẩm thấu hiệu quả</li>
<li><strong>Bề mặt sáng mịn sau khi khô</strong> — không chỉ chống thấm mà còn cải thiện thẩm mỹ bề mặt tường, phù hợp khi cần hoàn thiện cơ bản mà không cần thêm lớp sơn phủ ở một số vị trí khuất</li>
<li><strong>Thiết kế riêng cho khí hậu miền Nam</strong> — đây là điểm AkzoNobel nhấn mạnh trong TDS: C8033 được phát triển phù hợp với điều kiện thực tế TP.HCM và các tỉnh miền Nam, không phải sản phẩm nhập khẩu nguyên công thức từ thị trường khác</li>
<li><strong>Thi công linh hoạt 2–3 lớp</strong> — với bề mặt có vết nứt nhỏ, bạn thi công 3 lớp để đảm bảo bịt kín hoàn toàn mà không cần mua thêm sản phẩm chuyên dụng khác</li>
</ul>
<p>Nếu công trình của bạn cần chống thấm tường kết hợp kháng kiềm và che nứt trong cùng một sản phẩm mà không cần pha trộn xi măng, Chống Thấm Dulux Aquatech 3in1 V189 là phương án đáng cân nhắc — tích hợp 3 tính năng trong một lớp phủ sẵn dùng, không cần pha thêm.</p>

<h2>Chống Thấm Tường C8033 Phù Hợp Công Trình Nào</h2>
<p>Sơn chống thấm xi măng Dulux Aquatech C8033 phù hợp nhất với các trường hợp sau:</p>
<ul style="padding-left: 20px; line-height: 1.8;">
<li><strong>Nhà trọ, nhà cấp 4, nhà xưởng nhỏ</strong> — nơi yêu cầu chống thấm tường hiệu quả với chi phí vật liệu thấp nhất, không cần đặc tính co giãn cao như các dòng chống thấm mủ</li>
<li><strong>Tường ngoại thất nhà phố ít biến dạng</strong> — tường bê tông kiên cố, ít chịu nứt do lún hoặc dao động nhiệt lớn, cần chống thấm mưa tạt mùa mưa</li>
<li><strong>Tường hầm và tường tầng trệt tiếp giáp đất</strong> — bề mặt xi măng bê tông cứng, cần lớp chống thấm bám dính chắc và đanh chắc chống nước ngầm thẩm thấu vào</li>
<li><strong>Xử lý điểm thấm cục bộ</strong> — tường bị thấm nhỏ tại một vài vị trí cụ thể, cần xử lý nhanh và tiết kiệm mà không cần thi công toàn bộ diện tích</li>
</ul>
<p>Với tường ngoại thất chịu biến dạng nhiệt lớn hoặc tường có lịch sử nứt tái phát, bạn nên xem xét Chống Thấm Tường Cao Cấp Dulux Aquatech Flex W759 — dạng nhũ tương đàn hồi thế hệ mới, co giãn tốt hơn C8033 trước biến dạng nhiệt và cơ học của tường.</p>

<h2>Hướng Dẫn Thi Công Sơn Chống Thấm Tường Dulux Aquatech C8033</h2>
<p><strong>Bước 1 — Chuẩn bị bề mặt tường:</strong><br/>
Bề mặt phải sạch, khô và ổn định. Tẩy sạch toàn bộ màng sơn cũ bong tróc, chất bẩn, vữa rời, rêu mốc bằng phương pháp phù hợp — bàn chải cứng, giấy nhám hoặc máy phun áp lực tùy mức độ. Khu vực có nấm mốc hay rong rêu cần dùng hóa chất diệt rêu mốc chuyên dụng, rửa sạch và để khô hoàn toàn trước khi thi công. Một điểm quan trọng với C8033: nếu bề mặt tường quá khô và hút nước mạnh, bạn cần làm ẩm sơ bộ bằng rulô lăn nước sạch trước khi trộn và thi công — bỏ qua bước này khiến hỗn hợp mất nước quá nhanh, ảnh hưởng đến quá trình đông cứng và bám dính.</p>
<p><strong>Bước 2 — Xử lý vết nứt:</strong><br/>
Với vết nứt nhỏ và vết nứt tóc — thi công tổng cộng 3 lớp C8033 thay vì 2 lớp, không cần trám vá riêng. Với vết nứt lớn — đục rộng thành hình chữ V, làm sạch bụi trong rãnh, sau đó trét lại bằng hỗn hợp 5 cát + 3 xi măng thường + 0,8 C8033; để khô hoàn toàn rồi mới thi công C8033 đại trà bên ngoài.</p>
<p><strong>Bước 3 — Pha trộn hỗn hợp:</strong><br/>
Tỷ lệ chuẩn từ TDS: 0,5 lít nước sạch + 1 kg xi măng poóclăng PC40 trở lên + 1 kg C8033. Trộn xi măng vào nước trước, khuấy đều cho hết vón cục, sau đó mới cho C8033 vào và khuấy lại thật đều. Hỗn hợp sau khi trộn cần được dùng trong vòng 2 giờ — không để quá lâu vì xi măng bắt đầu đóng rắn. Khuấy lại đều trước mỗi lần lăn nếu hỗn hợp đã để một lúc.</p>
<p><strong>Bước 4 — Thi công lớp 1:</strong><br/>
Dùng cọ hoặc rulô thi công đều tay, phủ kín toàn bộ bề mặt. Chú ý gia cố kỹ các góc chân tường, mép cửa sổ, quanh ống thoát nước và các điểm giao cắt — đây là vị trí hay bị bỏ sót và thấm đầu tiên.</p>
<p><strong>Bước 5 — Thi công lớp 2 (và lớp 3 nếu cần):</strong><br/>
Chờ lớp 1 khô đủ — 6 đến 8 giờ trước khi thi công lớp 2. Không thi công khi trời đang mưa hoặc môi trường ẩm ướt — đây là lưu ý bắt buộc với chống thấm xi măng, vì độ ẩm môi trường ảnh hưởng trực tiếp đến chất lượng đóng rắn của xi măng trong hỗn hợp.</p>
<p>Trước khi mua vật liệu, bạn nên đo tổng diện tích tường cần thi công. Theo kinh nghiệm thực tế của Tavaco, 1 thùng C8033 6KG thi công 2 lớp được khoảng 24–30 m² tường tùy độ nhám bề mặt; 1 thùng 20KG thi công được khoảng 80–100 m². Tính đủ số lượng từ đầu để tránh tình trạng thiếu vật liệu giữa chừng — thi công không liên tục sẽ để lại ranh giới rõ trên bề mặt.</p>

<h2>Câu Hỏi Thường Gặp</h2>
<p><strong>Chống Thấm Dulux Aquatech C8033 có bắt buộc pha xi măng không hay dùng được nguyên chất?</strong><br/>
C8033 bắt buộc pha trộn với xi măng poóclăng PC40+ theo đúng tỷ lệ hướng dẫn — đây là đặc tính cốt lõi của dòng chống thấm xi măng. Dùng nguyên chất không theo đúng công thức sẽ không đạt được hiệu quả chống thấm và độ bám dính như thiết kế. Nếu bạn cần sản phẩm dùng nguyên chất không cần pha, hãy xem xét các dòng chống thấm mủ như Aquatech 3in1 V189 hoặc Aquatech Flex W759.</p>

<p><strong>1 thùng C8033 6KG chống thấm được bao nhiêu mét vuông?</strong><br/>
Theo kinh nghiệm thực tế của Tavaco, 1 thùng 6KG thi công 2 lớp được khoảng 24–30 m² tường. Con số này dao động tùy bề mặt: tường xi măng phẳng và ít hút nước đạt khoảng 28–30 m²; tường thô nhám hút nhiều chỉ được khoảng 24–25 m². Tính toán kỹ trước khi mua để không thiếu vật liệu.</p>

<p><strong>Có cần sơn lót trước khi thi công Chất Chống Thấm Tường Dulux C8033 không?</strong><br/>
Không — C8033 là lớp chống thấm tường độc lập, thi công trực tiếp lên bề mặt bê tông và vữa xi măng đã chuẩn bị kỹ. Sau khi màng C8033 khô hoàn toàn, nếu bạn muốn thi công sơn phủ ngoại thất lên trên, lúc đó mới cần cân nhắc có thi công sơn lót kháng kiềm hay không tùy dòng sơn phủ chọn.</p>

<p><strong>Tường ướt đang mưa có thi công C8033 được không?</strong><br/>
Không — TDS khuyến cáo rõ không thi công khi trời mưa hoặc trong môi trường ẩm ướt. C8033 là chống thấm pha xi măng, quá trình đóng rắn và bám dính phụ thuộc vào điều kiện độ ẩm môi trường. Chờ bề mặt khô và thời tiết khô ráo, thường chọn buổi sáng mùa khô để thi công đạt chất lượng tốt nhất.</p>

<p><strong>Chống thấm tường Dulux Aquatech Hiệu Quả C8033 khác gì Aquatech Flex W759?</strong><br/>
C8033 là dạng xi măng — pha trộn tại chỗ, bề mặt đanh cứng, giá tốt nhất, phù hợp tường ít biến dạng. W759 là dạng nhũ tương đàn hồi — dùng nguyên chất, màng co giãn cao, hiệu quả gấp 2 lần chống thấm thông thường, phù hợp tường ngoại thất chịu dao động nhiệt lớn hoặc tường hầm áp lực nước ngầm cao. C8033 ưu tiên ngân sách; W759 ưu tiên hiệu suất chống thấm dài hạn.</p>

<h2>Mua Chống Thấm Dulux Aquatech C8033 Ở Đâu Giá Tốt</h2>
<p>Nếu bạn đang cân nhắc chống thấm tường cho nhà trọ, nhà phố hay công trình dân dụng tại TP.HCM và các tỉnh miền Nam, Tavaco là đại lý chính thức Dulux với giá sau chiết khấu tốt nhất: 725.000đ/6KG và 2.079.000đ/20KG. Xem đầy đủ bảng giá chống thấm Dulux Aquatech sau chiết khấu để so sánh toàn bộ danh mục và lên kế hoạch chi phí vật liệu cho công trình của bạn.</p>

<hr style="margin: 30px 0; border: 1px solid #e2e8f0;" />
<p><em>Bài viết được biên soạn bởi Thiên Văn — chuyên gia tư vấn sơn nước tại Công ty TNHH Sơn Tavaco (MST: 0317933541), hơn 15 năm kinh nghiệm thực tế tại TP.HCM và các tỉnh miền Nam. Đại lý chính thức Dulux (AkzoNobel), Jotun, Nippon, Seamaster. Chuyên môn xác nhận qua nhiều công trình từ nhà trọ, nhà phố, căn hộ đến biệt thự.</em></p>
<p><strong>Công ty TNHH Sơn Tavaco | MST: 0317933541</strong><br/>
Địa chỉ: 36A Trương Vĩnh Ký, P. Tân Sơn Nhì, TP.HCM<br/>
Điện thoại: 0913.888.277 — 0902.791.288<br/>
Website: sontavaco.com | sonnuocxaydung.com<br/>
Giờ làm việc: Thứ 2 — Thứ 7, 7h30–17h30<br/>
Tem chính hãng quét QR xác minh | Hóa đơn GTGT cá nhân & doanh nghiệp<br/>
Giao hàng: TP.HCM và các tỉnh miền Nam</p>
`;

async function updateDescription() {
  const { data: products } = await supabase.from('products').select('id');
  
  if (products && products.length > 0) {
    for (const p of products) {
      await supabase
        .from('products')
        .update({ description: seedDescription })
        .eq('id', p.id);
    }
    console.log(`Đã cập nhật thành công bài viết cho toàn bộ ${products.length} sản phẩm!`);
  }
}

updateDescription();
