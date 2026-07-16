import supabase from '../src/config/supabase';

const testFetch = async () => {
  const { data, error } = await supabase.from('products').select('*');
  console.log('Data:', data);
  console.log('Error:', error);
};

testFetch();
