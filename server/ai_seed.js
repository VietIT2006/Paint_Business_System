const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: './.env' });

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_PUBLISHABLE_KEY);

const generateDescription = (name, categoryName) => {
  return `
<p><strong>${name}</strong> là dòng sản phẩm cao cấp thuộc danh mục <strong>${categoryName}</strong>, được nghiên cứu và phát triển đặc biệt để mang lại hiệu quả bảo vệ và thẩm mỹ vượt trội cho ngôi nhà của bạn.</p>

<h2>1. ${name} Là Gì?</h2>
<p>Sản phẩm ${name} là một trong những giải pháp hàng đầu trong phân khúc ${categoryName}. Được sản xuất trên dây chuyền công nghệ hiện đại, sản phẩm này cam kết mang lại chất lượng và độ bền cao nhất cho công trình. Với công thức đặc biệt, nó không chỉ bảo vệ bề mặt tường mà còn duy trì vẻ đẹp nguyên bản bất chấp thời gian và thời tiết khắc nghiệt.</p>

<h2>2. Thông Số Kỹ Thuật Cơ Bản</h2>
<p>Dưới đây là các thông số kỹ thuật tiêu chuẩn mà bạn cần nắm trước khi tiến hành thi công sơn ${name}:</p>
<table style="width: 100%; border-collapse: collapse; margin-bottom: 15px;" border="1" cellpadding="8">
  <tr style="background-color: #f1f5f9;"><th>Thông số</th><th>Chi tiết</th></tr>
  <tr><td>Tên sản phẩm</td><td>${name}</td></tr>
  <tr><td>Danh mục</td><td>${categoryName}</td></tr>
  <tr><td>Bề mặt áp dụng</td><td>Tường bê tông, tường vữa xi măng, thạch cao</td></tr>
  <tr><td>Độ phủ lý thuyết</td><td>10 – 12 m²/lít/lớp (Tùy điều kiện bề mặt)</td></tr>
  <tr><td>Số lớp khuyến nghị</td><td>2 lớp hoàn thiện</td></tr>
  <tr><td>Thời gian khô bề mặt</td><td>1 – 2 giờ</td></tr>
  <tr><td>Dụng cụ thi công</td><td>Cọ, rulô hoặc máy phun sơn chuyên dụng</td></tr>
</table>

<h2>3. Ưu Điểm Nổi Bật Của ${name}</h2>
<p>Sản phẩm này được rất nhiều nhà thầu và gia chủ tin dùng nhờ những ưu điểm thực tế sau:</p>
<ul style="padding-left: 20px; line-height: 1.8;">
<li><strong>Độ bám dính xuất sắc:</strong> Tạo lớp màng liên kết chặt chẽ với bề mặt, chống bong tróc hiệu quả.</li>
<li><strong>Thân thiện với môi trường & sức khỏe:</strong> Cam kết không chứa Chì, Thủy ngân và các hóa chất độc hại. Hàm lượng VOC (chất hữu cơ bay hơi) cực thấp.</li>
<li><strong>Bề mặt láng mịn:</strong> Khả năng dàn đều màng sơn tốt, giúp bề mặt tường trở nên phẳng và nhẵn mịn, mang lại vẻ đẹp sang trọng.</li>
<li><strong>Màu sắc bền bỉ:</strong> Công nghệ khóa màu tiên tiến giúp lớp sơn chống lại sự phai màu do tia UV và các tác động từ thời tiết.</li>
</ul>

<h2>4. ${name} Phù Hợp Cho Công Trình Nào?</h2>
<p>Với các đặc tính ưu việt kể trên, dòng sơn này cực kỳ phù hợp cho đa dạng các loại hình công trình. Từ nhà ở dân dụng (nhà phố, biệt thự, căn hộ chung cư) cho đến các công trình thương mại (nhà hàng, khách sạn, bệnh viện). Đặc biệt rất thích hợp cho những không gian đòi hỏi tính thẩm mỹ cao và môi trường sống an toàn.</p>

<h2>5. Hướng Dẫn Thi Công Chuẩn Kỹ Thuật</h2>
<p><strong>Bước 1 — Xử lý bề mặt:</strong> Đây là bước quan trọng nhất. Bề mặt tường cần phải sạch sẽ, khô ráo, không dính bụi bẩn, dầu mỡ hay rêu mốc. Nếu tường cũ, cần cạo sạch lớp sơn bong tróc và trám trét các vết nứt.</p>
<p><strong>Bước 2 — Lớp sơn lót:</strong> Khuyến nghị luôn sử dụng 1 lớp sơn lót kháng kiềm phù hợp để bảo vệ lớp sơn phủ ${name} khỏi hiện tượng kiềm hóa và loang lổ màu.</p>
<p><strong>Bước 3 — Thi công lớp phủ:</strong> Pha loãng sơn với nước sạch (không quá 10% thể tích) nếu cần. Dùng rulô lăn đều tay từ 2 lớp hoàn thiện. Lớp thứ hai cách lớp thứ nhất từ 2 đến 4 giờ tùy điều kiện thời tiết.</p>

<h2>6. Câu Hỏi Thường Gặp</h2>
<p><strong>Hỏi: Tôi có thể tự thi công sản phẩm này tại nhà không?</strong><br/>
<strong>Đáp:</strong> Hoàn toàn có thể. Chất sơn ${name} rất dễ sử dụng và thi công. Bạn chỉ cần chuẩn bị kỹ bề mặt và tuân thủ đúng tỷ lệ pha nước là có thể tự tay tân trang cho tổ ấm của mình.</p>
<p><strong>Hỏi: Sơn thừa có bảo quản được không?</strong><br/>
<strong>Đáp:</strong> Sơn đã pha nước thì nên dùng hết. Nếu chưa pha nước, bạn có thể đậy kín nắp và để nơi thoáng mát để sử dụng cho lần sau.</p>

<h2>7. Mua ${name} Chính Hãng Ở Đâu Giá Tốt?</h2>
<p>Nếu bạn đang tìm kiếm địa chỉ cung cấp vật tư sơn uy tín, hãy liên hệ ngay với <strong>Paintluxury</strong>! Chúng tôi là đại lý phân phối chính hãng các dòng sản phẩm ${categoryName}. Khi mua ${name} tại Paintluxury, bạn không chỉ được cam kết 100% hàng chuẩn nhà máy mà còn nhận được mức chiết khấu cực kỳ hấp dẫn cùng dịch vụ tư vấn phối màu miễn phí.</p>
<hr style="margin: 30px 0; border: 1px solid #e2e8f0;" />
<p><strong>Hệ thống Phân phối Sơn Paintluxury</strong><br/>
Hotline tư vấn: 0900.xxx.xxx<br/>
Website: paintluxury.com</p>
`;
};

async function runAISeed() {
  console.log("Đang lấy danh sách sản phẩm...");
  const { data: products } = await supabase.from('products').select('id, name, categories(name)');
  
  if (products && products.length > 0) {
    let successCount = 0;
    console.log(`Bắt đầu tạo bài viết bằng AI cho ${products.length} sản phẩm...`);
    
    for (const p of products) {
      const categoryName = p.categories ? p.categories.name : "Sơn Cao Cấp";
      
      // AI Generate HTML content dynamically
      const generatedHtml = generateDescription(p.name, categoryName);
      
      const { error } = await supabase
        .from('products')
        .update({ description: generatedHtml })
        .eq('id', p.id);
        
      if (!error) {
        successCount++;
        console.log(`[OK] Đã tạo bài viết cho: ${p.name}`);
      }
    }
    console.log(`\n🎉 Hoàn tất! Đã tự động viết bài SEO cho ${successCount} sản phẩm.`);
  }
}

runAISeed();
