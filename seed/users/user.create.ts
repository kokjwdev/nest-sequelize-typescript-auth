// user.seed.ts
import * as bcrypt from 'bcrypt';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

// โหลดค่าจากไฟล์ .env ที่อยู่ใน root ของโปรเจกต์
dotenv.config();

async function generateUserSeed() {
  // -- เพิ่มผู้ใช้ admin
  const adminPassword = await bcrypt.hash(process.env.SEED_PASSWORD, 10);
  //  -- เพิ่มผู้ใช้ทั่วไป (user)
  const userPassword = await bcrypt.hash(process.env.SEED_PASSWORD, 10);

  const sqlContent = `
    INSERT INTO "Users" ("email", "password", "role", "createdAt", "updatedAt") VALUES ('admin@example.com', '${adminPassword}', 'admin', now(), now());
    INSERT INTO "Users" ("email", "password", "role", "createdAt", "updatedAt") VALUES ('user@example.com', '${userPassword}', 'user', now(), now());
  `;

  const filePath = path.join(__dirname, 'user.seed.sql');

  // เขียนเนื้อหาลงในไฟล์ user.seed.sql และใช้ 'w' เพื่อเขียนทับไฟล์ที่มีอยู่
  fs.writeFileSync(filePath, sqlContent, { flag: 'w' });
}

generateUserSeed();
