-- 1. Tạo Database và sử dụng nó
CREATE DATABASE IF NOT EXISTS PaintStoreDB
CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE PaintStoreDB;

-- 2. Tạo bảng Users (Khách hàng, Nhân viên, Quản trị, Nhà thầu)
CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(15) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'customer', -- 'admin', 'staff', 'customer', 'contractor'
    discount_tier DECIMAL(5,2) DEFAULT 0.00,
    debt_limit DECIMAL(15,2) DEFAULT 0.00,
    current_debt DECIMAL(15,2) DEFAULT 0.00,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 3. Tạo bảng Products (Thông tin Sơn gốc - Base)
CREATE TABLE Products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(200) NOT NULL,
    brand VARCHAR(50) NOT NULL,
    category VARCHAR(50) NOT NULL,
    coverage_rate DECIMAL(5,2) NOT NULL, -- Độ phủ lý thuyết (m2/L)
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 4. Tạo bảng Product_Variations (Biến thể Dung tích của từng loại sơn)
CREATE TABLE Product_Variations (
    variation_id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    capacity_liter DECIMAL(5,2) NOT NULL, -- Dung tích: 1.0, 5.0, 18.0...
    base_price DECIMAL(15,2) NOT NULL,
    stock_quantity INT DEFAULT 0,
    CONSTRAINT fk_variation_product FOREIGN KEY (product_id) 
        REFERENCES Products(product_id) ON DELETE CASCADE
);

-- 5. Tạo bảng Colors (Thư viện Mã màu & Phí tinh màu cho công cụ AI)
CREATE TABLE Colors (
    color_id INT AUTO_INCREMENT PRIMARY KEY,
    color_code VARCHAR(50) UNIQUE NOT NULL,
    hex_value VARCHAR(10) NOT NULL,
    colorant_fee DECIMAL(10,2) DEFAULT 0.00
);

-- 6. Tạo bảng Orders (Đơn hàng)
CREATE TABLE Orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    total_amount DECIMAL(15,2) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'processing', 'completed', 'cancelled'
    payment_type VARCHAR(20) NOT NULL, -- 'COD', 'Banking', 'Debt'
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_order_user FOREIGN KEY (user_id) 
        REFERENCES Users(user_id) ON DELETE RESTRICT
);

-- 7. Tạo bảng Order_Items (Chi tiết Đơn hàng)
CREATE TABLE Order_Items (
    order_item_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    variation_id INT NOT NULL,
    color_id INT, -- Có thể NULL nếu mua sơn trắng chưa pha màu
    quantity INT NOT NULL,
    unit_price DECIMAL(15,2) NOT NULL,
    CONSTRAINT fk_item_order FOREIGN KEY (order_id) 
        REFERENCES Orders(order_id) ON DELETE CASCADE,
    CONSTRAINT fk_item_variation FOREIGN KEY (variation_id) 
        REFERENCES Product_Variations(variation_id) ON DELETE RESTRICT,
    CONSTRAINT fk_item_color FOREIGN KEY (color_id) 
        REFERENCES Colors(color_id) ON DELETE SET NULL
);