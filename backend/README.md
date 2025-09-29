npx prisma migrate dev --name init    ایجاد جداول پریسما در دیتابیس

psql -U postgres -d eCommerceKalamarket -f "D:\Project_14011118\kala-market-ecommerce_14040518\backend\prisma\seed.sql"   ایجاد اسکریپت های مربوط به جداول و درج اطلاعات هر جدول


npx prisma generate  این دستور که کد آن پریسمایی که در schema.prisma تعریف کردیم بشناسد