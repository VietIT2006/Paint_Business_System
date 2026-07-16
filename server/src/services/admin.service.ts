import supabase from '../config/supabase';

// Lấy danh sách tất cả đơn hàng
export const getAllOrders = async () => {
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      profiles ( full_name ),
      order_items (
        id, quantity, unit_price, total_price,
        products ( name, color_code )
      )
    `)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

// Cập nhật trạng thái đơn hàng
export const updateOrderStatus = async (orderId: string, status: string) => {
  const { data, error } = await supabase
    .from('orders')
    .update({ status })
    .eq('id', orderId)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

// Lấy danh sách sản phẩm (Dành cho admin để quản lý)
export const getAllProductsAdmin = async (page: number = 1, limit: number = 20) => {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, error, count } = await supabase
    .from('products')
    .select('*, categories(id, name)', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(from, to);

  if (error) {
    throw new Error(error.message);
  }
  return { data, count };
};

// Thêm sản phẩm mới
export const createProduct = async (productData: any) => {
  const { data, error } = await supabase
    .from('products')
    .insert([productData])
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

// Cập nhật sản phẩm
export const updateProduct = async (id: string, productData: any) => {
  const { data, error } = await supabase
    .from('products')
    .update(productData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

// Xóa/Ẩn sản phẩm (Chuyển is_active thành false thay vì xóa hẳn để giữ lịch sử đơn hàng)
export const deleteProduct = async (id: string) => {
  const { data, error } = await supabase
    .from('products')
    .update({ is_active: false })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }
  return data;
};
