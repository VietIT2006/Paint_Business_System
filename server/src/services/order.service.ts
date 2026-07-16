import supabase from '../config/supabase';

interface OrderItemInput {
  product_id: string;
  quantity: number;
  unit_price: number;
}

interface OrderInput {
  user_id?: string;
  customer_name: string;
  customer_phone: string;
  shipping_address: string;
  total_amount: number;
  notes?: string;
  items: OrderItemInput[];
}

export const createOrder = async (orderData: OrderInput) => {
  const { items, ...orderInfo } = orderData;

  // 1. Insert order
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert([orderInfo])
    .select()
    .single();

  if (orderError || !order) {
    throw new Error(`Failed to create order: ${orderError?.message}`);
  }

  // 2. Prepare order items
  const orderItemsData = items.map(item => ({
    order_id: order.id,
    product_id: item.product_id,
    quantity: item.quantity,
    unit_price: item.unit_price
  }));

  // 3. Insert order items
  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(orderItemsData);

  if (itemsError) {
    throw new Error(`Failed to create order items: ${itemsError.message}`);
  }

  return order;
};
