const axios = require('axios');
const cheerio = require('cheerio');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: './.env' });

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_PUBLISHABLE_KEY);

const BASE_URL = 'https://sonnuocxaydung.com';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function scrapeData() {
  console.log('Bắt đầu cào dữ liệu từ', BASE_URL);
  try {
    const { data: html } = await axios.get(BASE_URL);
    const $ = cheerio.load(html);

    // Lấy danh sách các khối danh mục trên trang chủ
    const categoryBlocks = [];
    $('#category > .clearfix').each((i, el) => {
      // Chỉ lấy 5 danh mục đầu tiên cho nhanh
      if (i >= 5) return;

      const catName = $(el).find('.heading-cat h2 a').text().trim();
      const productLinks = [];

      $(el).find('.owl-carousel .item').each((j, itemEl) => {
        // Chỉ lấy 3 sản phẩm đầu tiên của mỗi danh mục
        if (j >= 3) return;
        const link = $(itemEl).find('.caption h3 a').attr('href');
        if (link) {
          productLinks.push(link.startsWith('http') ? link : BASE_URL + link);
        }
      });

      if (catName && productLinks.length > 0) {
        categoryBlocks.push({ catName, productLinks });
      }
    });

    console.log(`Tìm thấy ${categoryBlocks.length} danh mục cần lấy dữ liệu.`);

    let totalProductsSaved = 0;

    for (const block of categoryBlocks) {
      console.log(`\n--- Xử lý danh mục: ${block.catName} ---`);

      // 1. Lấy một category bất kỳ có sẵn trong DB để tránh bị lỗi RLS khi tạo mới
      let categoryId;
      const { data: existingCat } = await supabase
        .from('categories')
        .select('id')
        .limit(1);

      if (existingCat && existingCat.length > 0) {
        categoryId = existingCat[0].id;
      } else {
        console.error('Không tìm thấy danh mục nào trong Database!');
        continue;
      }

      // 2. Cào từng sản phẩm
      for (const link of block.productLinks) {
        console.log(`Đang tải: ${link}`);
        try {
          const { data: prodHtml } = await axios.get(link);
          const $p = cheerio.load(prodHtml);

          let name = $p('#detail h2').first().text().trim();
          if (!name) name = $p('h1').first().text().trim(); // Fallback

          let priceText = $p('#detail .money').first().text().trim();
          let price = 0;
          if (priceText) {
            price = parseInt(priceText.replace(/[^0-9]/g, '')) || 0;
          }

          let imgUrl = $p('#imageproduct').attr('src');
          if (imgUrl && !imgUrl.startsWith('http')) {
            imgUrl = BASE_URL + imgUrl;
          }

          let description = $p('#news-bodyhtml').html();
          if (!description) {
             description = $p('.detail-content').html() || '';
          }

          // Rút gọn mô tả nếu cần, hoặc làm sạch
          if (description) {
             description = description.trim();
          }

          // Lưu vào Supabase
          if (name) {
            const { error: prodError } = await supabase
              .from('products')
              .insert([{
                category_id: categoryId,
                name: name,
                description: description || '<p>Đang cập nhật thông tin...</p>',
                price: price,
                image_url: imgUrl,
                stock_quantity: 100, // Dummy
                is_active: true
              }]);
              
            if (prodError) {
              console.error(`  [!] Lỗi lưu sản phẩm ${name}:`, prodError.message);
            } else {
              console.log(`  [OK] Đã lưu: ${name} (${price.toLocaleString()} đ)`);
              totalProductsSaved++;
            }
          }

        } catch (e) {
          console.error(`  [!] Lỗi tải trang sản phẩm:`, e.message);
        }

        // Tạm nghỉ 1 giây để tránh bị block (Rate limit)
        await delay(1000);
      }
    }

    console.log(`\n🎉 Hoàn tất! Đã lưu thành công ${totalProductsSaved} sản phẩm thật vào Database.`);

  } catch (error) {
    console.error('Lỗi khi cào dữ liệu trang chủ:', error.message);
  }
}

scrapeData();
