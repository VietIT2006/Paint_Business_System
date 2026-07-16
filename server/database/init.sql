-- 1. Kích hoạt extension cho UUID nếu chưa có
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Bảng User Profiles (Mở rộng từ auth.users của Supabase)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  phone_number TEXT,
  address TEXT,
  role TEXT DEFAULT 'customer' CHECK (role IN ('customer', 'staff', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Bật Row Level Security (RLS) cho profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Tạo trigger để cập nhật trường updated_at tự động
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER profiles_updated_at_trigger
BEFORE UPDATE ON profiles
FOR EACH ROW EXECUTE PROCEDURE handle_updated_at();

-- 3. Bảng Danh mục (Categories) - VD: Sơn nội thất, Sơn ngoại thất, Hãng Jotun, Dulux...
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE TRIGGER categories_updated_at_trigger
BEFORE UPDATE ON categories FOR EACH ROW EXECUTE PROCEDURE handle_updated_at();

-- 4. Bảng Sản phẩm (Products)
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  description TEXT,
  color_code TEXT, -- Mã màu sơn (VD: #FFFFFF, JOT-123)
  volume_liters DECIMAL(10,2), -- Thể tích (Lít)
  price DECIMAL(12,2) NOT NULL, -- Giá bán
  stock_quantity INT DEFAULT 0, -- Số lượng tồn kho
  image_url TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE TRIGGER products_updated_at_trigger
BEFORE UPDATE ON products FOR EACH ROW EXECUTE PROCEDURE handle_updated_at();

-- 5. Bảng Đơn hàng (Orders)
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL, -- Null nếu khách mua vãng lai (không bắt buộc đăng nhập)
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  shipping_address TEXT NOT NULL,
  total_amount DECIMAL(12,2) NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE TRIGGER orders_updated_at_trigger
BEFORE UPDATE ON orders FOR EACH ROW EXECUTE PROCEDURE handle_updated_at();

-- 6. Bảng Chi tiết đơn hàng (Order Items)
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE RESTRICT,
  quantity INT NOT NULL CHECK (quantity > 0),
  unit_price DECIMAL(12,2) NOT NULL, -- Giá tại thời điểm mua
  total_price DECIMAL(12,2) GENERATED ALWAYS AS (quantity * unit_price) STORED,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- TÙY CHỌN: HÀM (FUNCTION) TRIGGER TẠO PROFILE KHI ĐĂNG KÝ
-- (Chạy khi một user mới được tạo trong auth.users của Supabase)
-- ==========================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', 'customer');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
