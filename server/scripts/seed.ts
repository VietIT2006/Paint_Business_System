import supabase from '../src/config/supabase';

const seedData = async () => {
  try {
    console.log('Bắt đầu chèn dữ liệu mẫu...');

    // 1. Thêm danh mục (Categories)
    const { data: catData, error: catError } = await supabase
      .from('categories')
      .insert([
        { name: 'Sơn Nội Thất Cao Cấp', description: 'Các dòng sơn nội thất bóng đẹp, lau chùi hiệu quả.' },
        { name: 'Sơn Ngoại Thất Chống Phai', description: 'Bảo vệ ngôi nhà trước thời tiết khắc nghiệt.' },
        { name: 'Sơn Lót Chống Kiềm', description: 'Tăng độ bám dính và bảo vệ lớp sơn phủ.' },
      ])
      .select();

    if (catError) {
      throw new Error(`Lỗi chèn danh mục: ${catError.message}`);
    }

    if (!catData || catData.length === 0) {
      throw new Error('Không chèn được danh mục nào.');
    }

    console.log('Đã chèn danh mục thành công!');
    
    const noiThatId = catData[0].id;
    const ngoaiThatId = catData[1].id;
    const lotId = catData[2].id;

    // 2. Thêm Sản phẩm (Products)
    const { error: prodError } = await supabase
      .from('products')
      .insert([
        {
          category_id: noiThatId,
          name: 'Sơn Nội Thất Dulux 5in1 Ambiance',
          description: 'Bề mặt láng mịn, che lấp vết nứt nhỏ, chống vi khuẩn.',
          color_code: '#E8E4D9',
          volume_liters: 5,
          price: 950000,
          stock_quantity: 120,
          image_url: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=2070&auto=format&fit=crop'
        },
        {
          category_id: noiThatId,
          name: 'Sơn Jotun Majestic Đẹp Hoàn Hảo',
          description: 'Màu sắc sống động, dễ lau chùi, không chứa hóa chất độc hại.',
          color_code: '#F5F5F5',
          volume_liters: 15,
          price: 2450000,
          stock_quantity: 80,
          image_url: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?q=80&w=2031&auto=format&fit=crop'
        },
        {
          category_id: ngoaiThatId,
          name: 'Sơn Ngoại Thất Jotun Jotashield',
          description: 'Chống phai màu, chống tia UV cực tím.',
          color_code: '#D4C5B9',
          volume_liters: 15,
          price: 3150000,
          stock_quantity: 45,
          image_url: 'https://images.unsplash.com/photo-1599619351208-3e6c839d6828?q=80&w=2072&auto=format&fit=crop'
        },
        {
          category_id: lotId,
          name: 'Sơn Lót Kháng Kiềm Kova CT-11A',
          description: 'Chống thấm, kháng kiềm tuyệt đối.',
          color_code: '#FFFFFF',
          volume_liters: 20,
          price: 1800000,
          stock_quantity: 200,
          image_url: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?q=80&w=2062&auto=format&fit=crop'
        }
      ]);

    if (prodError) {
      throw new Error(`Lỗi chèn sản phẩm: ${prodError.message}`);
    }

    console.log('Đã chèn dữ liệu sản phẩm thành công!');

  } catch (err: any) {
    console.error('Lỗi khi chạy script:', err.message);
  }
};

seedData();
