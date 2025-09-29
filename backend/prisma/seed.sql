    -- Insert sample categories
    INSERT INTO "categories" (id, name, slug, description, "isActive", "sortOrder", "createdAt", "updatedAt") VALUES
    ('cat-1', 'الکترونیک', 'electronics', 'محصولات الکترونیکی', true, 1, NOW(), NOW()),
    ('cat-2', 'لوازم خانگی', 'home-appliances', 'لوازم خانگی و آشپزخانه', true, 2, NOW(), NOW()),
    ('cat-3', 'کامپیوتر و لپ‌تاپ', 'computers-laptops', 'کامپیوتر، لپ‌تاپ و لوازم جانبی', true, 3, NOW(), NOW()),
    ('cat-4', 'موبایل و تبلت', 'mobile-tablet', 'گوشی موبایل و تبلت', true, 4, NOW(), NOW());

    -- Insert subcategories
    INSERT INTO "categories" (id, name, slug, description, "parentId", "isActive", "sortOrder", "createdAt", "updatedAt") VALUES
    ('cat-1-1', 'گوشی موبایل', 'mobile-phones', 'انواع گوشی موبایل', 'cat-4', true, 1, NOW(), NOW()),
    ('cat-1-2', 'تبلت', 'tablets', 'انواع تبلت', 'cat-4', true, 2, NOW(), NOW()),
    ('cat-2-1', 'یخچال و فریزر', 'refrigerators', 'یخچال و فریزر', 'cat-2', true, 1, NOW(), NOW()),
    ('cat-2-2', 'اجاق گاز', 'gas-stoves', 'اجاق گاز و لوازم آشپزخانه', 'cat-2', true, 2, NOW(), NOW()),
    ('cat-3-1', 'لپ‌تاپ', 'laptops', 'انواع لپ‌تاپ', 'cat-3', true, 1, NOW(), NOW());

    -- Insert sample brands
    INSERT INTO "brands" (id, name, slug, description, "isActive", "createdAt", "updatedAt") VALUES
    ('brand-1', 'سامسونگ', 'samsung', 'برند سامسونگ', true, NOW(), NOW()),
    ('brand-2', 'لوپز', 'lopez', 'برند لوپز', true, NOW(), NOW()),
    ('brand-3', 'چووی', 'chuwi', 'برند چووی', true, NOW(), NOW()),
    ('brand-4', 'سان‌وارد', 'sunward', 'برند سان‌وارد', true, NOW(), NOW()),
    ('brand-5', 'مباشی', 'mabashi', 'برند مباشی', true, NOW(), NOW()),
    ('brand-6', 'دونار', 'donar', 'برند دونار', true, NOW(), NOW());

    -- Insert sample products
    INSERT INTO "products" (id, name, slug, description, sku, price, "salePrice", stock, "categoryId", "brandId", "isFeatured", "isActive", status, "createdAt", "updatedAt") VALUES
    ('prod-1', 'گوشی موبایل سامسونگ Galaxy S10 Plus', 'samsung-galaxy-s10-plus', 'گوشی هوشمند سامسونگ با صفحه نمایش 6.4 اینچی', 'SAM-S10P-001', 15990000, 14990000, 25, 'cat-1-1', 'brand-1', true, true, 'PUBLISHED', NOW(), NOW()),
    ('prod-2', 'دوربین دیجیتال سامسونگ ST150F', 'samsung-st150f-camera', 'دوربین دیجیتال کامپکت با کیفیت عالی', 'SAM-ST150F-001', 3500000, 3200000, 15, 'cat-1', 'brand-1', true, true, 'PUBLISHED', NOW(), NOW()),
    ('prod-3', 'اجاق گاز لوپز مدل 10000S', 'lopez-gas-stove-10000s', 'اجاق گاز 5 شعله با کیفیت بالا', 'LOP-10000S-001', 8500000, 7800000, 10, 'cat-2-2', 'brand-2', true, true, 'PUBLISHED', NOW(), NOW()),
    ('prod-4', 'لپ‌تاپ چووی UltraBook 14 Pro', 'chuwi-ultrabook-14-pro', 'لپ‌تاپ سبک و قدرتمند برای کار و تفریح', 'CHU-UB14P-001', 12500000, 11900000, 8, 'cat-3-1', 'brand-3', true, true, 'PUBLISHED', NOW(), NOW()),
    ('prod-5', 'اجاق گاز لوپز استاندارد', 'lopez-gas-stove-standard', 'اجاق گاز 4 شعله استاندارد', 'LOP-STD-001', 4500000, NULL, 20, 'cat-2-2', 'brand-2', false, true, 'PUBLISHED', NOW(), NOW()),
    ('prod-6', 'توستر سان‌وارد SWF-40R', 'sunward-swf-40r-toaster', 'توستر برقی با ظرفیت 40 لیتر', 'SUN-40R-001', 2800000, 2500000, 12, 'cat-2', 'brand-4', false, true, 'PUBLISHED', NOW(), NOW()),
    ('prod-7', 'اسپرسو ساز مباشی ECM2013', 'mabashi-ecm2013-espresso', 'دستگاه اسپرسو ساز حرفه‌ای', 'MAB-ECM13-001', 5500000, 5200000, 6, 'cat-2', 'brand-5', true, true, 'PUBLISHED', NOW(), NOW()),
    ('prod-8', 'یخچال دونار دو قلو', 'donar-twin-refrigerator', 'یخچال فریزر دو درب با کیفیت عالی', 'DON-TWIN-001', 18500000, 17800000, 5, 'cat-2-1', 'brand-6', true, true, 'PUBLISHED', NOW(), NOW());

    -- Insert product images
    INSERT INTO "product_images" (id, "productId", url, alt, "sortOrder", "createdAt", "updatedAt") VALUES
    ('img-1', 'prod-1', '/samsung-galaxy-s10-plus.png', 'Samsung Galaxy S10 Plus', 0, NOW(), NOW()),
    ('img-2', 'prod-2', '/samsung-st150f.png', 'Samsung ST150F Camera', 0, NOW(), NOW()),
    ('img-3', 'prod-3', '/lopez-gas-stove-10000s.png', 'Lopez Gas Stove 10000S', 0, NOW(), NOW()),
    ('img-4', 'prod-4', '/chuwi-ultrabook-14-pro.png', 'Chuwi UltraBook 14 Pro', 0, NOW(), NOW()),
    ('img-5', 'prod-5', '/lopez-gas-stove.png', 'Lopez Gas Stove', 0, NOW(), NOW()),
    ('img-6', 'prod-6', '/sunward-swf-40r-toaster-oven.png', 'Sunward SWF-40R Toaster', 0, NOW(), NOW()),
    ('img-7', 'prod-7', '/mabashi-ecm2013-espresso-maker.png', 'Mabashi ECM2013 Espresso Maker', 0, NOW(), NOW()),
    ('img-8', 'prod-8', '/donar-twin-refrigerator.png', 'Donar Twin Refrigerator', 0, NOW(), NOW());

    -- Insert sample admin user
    INSERT INTO "users" (id, email, phone, "firstName", "lastName", password, role, "isActive", "createdAt", "updatedAt") VALUES
    ('admin-1', 'admin@kalamarket.com', '+989123456789', 'مدیر', 'سیستم', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/RK.s5uO.G', 'SUPER_ADMIN', true, NOW(), NOW());
    -- Password is: admin123456
