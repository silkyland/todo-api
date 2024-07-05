# Todo API

Todo API เป็น RESTful API ที่พัฒนาด้วย Express.js, TypeScript, และ SQLite สำหรับการจัดการรายการสิ่งที่ต้องทำ (todos) พร้อมระบบการยืนยันตัวตนและการจัดการหมวดหมู่

## คุณสมบัติ

- การยืนยันตัวตนด้วย JWT
- CRUD operations สำหรับ todos และหมวดหมู่
- การค้นหาและกรอง todos
- ฐานข้อมูล SQLite
- Docker support

## การติดตั้ง

1. Clone repository:
   ```
   git clone https://github.com/yourusername/todo-api.git
   cd todo-api
   ```

2. ติดตั้ง dependencies:
   ```
   yarn install
   ```

3. สร้างไฟล์ `.env` ในรูปแบบต่อไปนี้:
   ```
   PORT=3000
   JWT_SECRET=your_jwt_secret_here
   DB_PATH=./todo.db
   ```

4. สร้างฐานข้อมูล:
   ```
   yarn run init-db
   ```

5. Build โปรเจค:
   ```
   yarn build
   ```

6. เริ่มต้นแอปพลิเคชัน:
   ```
   yarn start
   ```

## การใช้งานด้วย Docker

1. Build Docker images:
   ```
   docker-compose build
   ```

2. เริ่มต้นแอปพลิเคชันด้วย Docker:
   ```
   docker-compose up
   ```

แอปพลิเคชันจะทำงานที่ `http://localhost:3000`

## API Endpoints

- Authentication:
  - POST /api/auth/register
  - POST /api/auth/login

- Todos:
  - GET /api/todos
  - POST /api/todos
  - PUT /api/todos/:id
  - DELETE /api/todos/:id
  - GET /api/todos/search
  - GET /api/todos/filter

- Categories:
  - GET /api/categories
  - POST /api/categories
  - PUT /api/categories/:id
  - DELETE /api/categories/:id

## โครงสร้างโปรเจค

```
todo-api/
├── src/
│   ├── config/
│   │   ├── database.ts
│   │   └── initDb.ts
│   ├── controllers/
│   │   ├── authController.ts
│   │   ├── todoController.ts
│   │   └── categoryController.ts
│   ├── middleware/
│   │   └── authMiddleware.ts
│   ├── models/
│   │   ├── User.ts
│   │   ├── Todo.ts
│   │   └── Category.ts
│   ├── routes/
│   │   ├── authRoutes.ts
│   │   ├── todoRoutes.ts
│   │   └── categoryRoutes.ts
│   ├── services/
│   │   └── jwtService.ts
│   └── app.ts
├── Dockerfile
├── Dockerfile.init.yarn
├── docker-compose.yml
├── package.json
├── tsconfig.json
└── README.md
```

## การพัฒนา

1. เริ่มต้นแอปพลิเคชันในโหมด development:
   ```
   yarn dev
   ```

2. รัน linter:
   ```
   yarn lint
   ```

3. รัน tests:
   ```
   yarn test
   ```

## การสนับสนุน

หากคุณพบปัญหาหรือมีคำแนะนำ กรุณาเปิด issue ใน GitHub repository

## License

โปรเจคนี้เผยแพร่ภายใต้ MIT License - ดูรายละเอียดเพิ่มเติมได้ที่ [LICENSE](LICENSE) file.