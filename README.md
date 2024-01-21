# ชื่อโปรเจกต์

nest-sequelize-typescript-auth

## สารบัญ

- [ชื่อโปรเจกต์](#ชื่อโปรเจกต์)
  - [สารบัญ](#สารบัญ)
  - [สิ่งที่จำเป็นต้องมี](#สิ่งที่จำเป็นต้องมี)
  - [เกี่ยวกับโปรเจกต์](#เกี่ยวกับโปรเจกต์)
  - [การเริ่มต้นใช้งาน](#การเริ่มต้นใช้งาน)
    - [การติดตั้งโปรแกรม](#การติดตั้งโปรแกรม)
    - [วิธีการติดตั้ง](#วิธีการติดตั้ง)
  - [การใช้งาน](#การใช้งาน)
  - [แผนการพัฒนา](#แผนการพัฒนา)
  - [การร่วมมือ](#การร่วมมือ)
  - [ใบอนุญาต](#ใบอนุญาต)

## เกี่ยวกับโปรเจกต์

ในโปรเจ็คที่ใช้ NestJS, Sequelize และ PostgreSQL เพื่อการ authentication รวมถึงการทำงานร่วมกับ Postman เพื่อทดสอบ API, ฟังก์ชันหลักๆ

1. ในโปรเจคนี้ผมตั้งใจอยากลองฝึกสร้าง Service API ที่ใช้ Nest ขึ้นโปรเจคในโปรเจคนี้ประกอบไปด้วยฟังก์ชันหลักๆ ดังนี้

2. User Registration: การลงทะเบียนผู้ใช้ใหม่ รวมถึงการตรวจสอบซ้ำของอีเมลและการเข้ารหัสรหัสผ่าน.

3. User Login: การเข้าสู่ระบบด้วยการตรวจสอบอีเมลและรหัสผ่าน, สร้างและการออก JWT access tokens และ refresh tokens.

4. Token Refresh: การออก access tokens ใหม่โดยใช้ refresh token เมื่อ access token หมดอายุ.

5. User Logout: การลบหรือทำให้ refresh token ไม่มีผล, ป้องกันการใช้งาน token ที่ถูกขโมยหรือหมดอายุ.

6. Password Encryption: การเข้ารหัสรหัสผ่านก่อนที่จะเก็บลงในฐานข้อมูล.

7. Get User Profile: การดึงข้อมูลโปรไฟล์ของผู้ใช้ที่เข้าสู่ระบบ.

8. Update User Profile: การอัปเดตข้อมูลส่วนตัวของผู้ใช้.

9. Role-based Access Control: การควบคุมการเข้าถึงตามบทบาทของผู้ใช้, ตัวอย่างเช่น แยกการเข้าถึงระหว่าง admin และ user ทั่วไป.

10. Error Handling: การจัดการกับข้อผิดพลาดต่างๆ ในระบบ.

11. Security Measures: มาตรการป้องกันเช่น CORS, helmet หรือ rate limiting เพื่อเพิ่มความปลอดภัยให้กับ API.

12. API Documentation: การสร้างเอกสารอธิบาย API โดยใช้เครื่องมือเช่น Swagger หรือ Postman.

13. Database Migrations and Seeding: การจัดการกับฐานข้อมูลโดยการสร้าง migrations และ seeding ข้อมูลเริ่มต้น.

14. API Testing: การทดสอบ API โดยใช้เครื่องมือทดสอบอัตโนมัติเช่น Jest สำหรับ unit tests และ e2e tests.

15. Logging: การบันทึกข้อมูลการใช้งาน API เพื่อการตรวจสอบและแก้ไขปัญหา.

16. Refresh Token Management: การจัดการ refresh tokens ในฐานข้อมูล รวมถึงการตรวจสอบอายุการใช้งานและการเปลี่ยนแปลง.

## สิ่งที่จำเป็นต้องมี

- [Node.js](https://nodejs.org/) (>= v18.10.0) 

- [npm](https://www.npmjs.com/) (>= 8.19.2)

- [PostgreSQL](https://www.postgresql.org/) (PostgreSQL 16)

- [pgAdmin4](https://www.pgadmin.org/)

## การเริ่มต้นใช้งาน

1. สร้างไฟล์ `.env` ที่ root folder

2. ในไฟล์ Env ประกอบไปด้วย

APP_NAME=nest-sequelize-typescript-auth

  - `DB_HOST`: localhost
  - `DB_PORT`: 5432
  - `DB_USERNAME`: postgres
  - `DB_PASSWORD`: (รหัสผ่านฐานข้อมูล)
  - `DB_DATABASE`: auth
  - `DB_SYNCHRONIZE`: true

  - `JWT_SECRET`: (โค้ดเข้ารหัสของ JWT Token)
  - `JWT_EXPIRE`: (อายุของ Token)
  - `JWT_REFRESH_SECRET`: (โค้ดเข้ารหัสของ Refresh JWT Token)
  - `JWT_REFRESH_EXPIRATION_TIME`: (อายุของ Refresh Token)

  - `SEED_PASSWORD`: (โค้ดเข้ารหัสของ รหัสผ่านของ User ตอน Mockup ข้อมูล)

3. มีตัวอย่างอยูที่ไฟล์ app.env หากต้องการใช้ให้ลบคำว่า "app" ออกเหลือแค่ ".env"

| Option   | Development | Test      |
| -------- | ----------- | --------- |
| Host     | localhost   | localhost |
| Port     | 5432        | 5432      |
| Username | postgres    | postgres  |
| Password | postgres    | postgres  |
| Database | nest        | auth |

### การติดตั้งโปรแกรม

- ติดตั้ง package
```bash
# development
$ npm install
```

### วิธีการติดตั้ง

1. สร้าง sql user mockup
```bash
# create mockup user
$ npm run seed:create-user
```
2. รันโปรแกรม
```bash
# development
$ npm run start
```
หรือ
```bash
# watch mode
$ npm run start:dev
```

3. ในไฟล์ `seed/users/user.seed.sql` คัคลอก ข้อมูลในไฟล์ไป insert ที่ตารางในโปรแกรม pgAdmin

## การใช้งาน

- ตัวอย่างสามารถดูได้จาก Document ใน Postman File ที่ `assets/Nest-Sequelize-Typesciprt-Auth API documentation.postman_collection.json`

## แผนการพัฒนา

- ยังไม่มี

## การร่วมมือ

- ยังไม่มีทำคนเดียว

## ใบอนุญาต

[ใบอนุญาต MIT](LICENSE)