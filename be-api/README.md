# Node.js Rest APIs with Express, Sequelize & MySQL 
run:
- npx nodemon qluv (with nodemon)

## APIs:
1. sign up:
- url:/api/auth/signup:
- req: {
    "username": "admin",
    "email": "admin@chatapp.com",
    "password": "123456",
    "roles": [
        "admin",
        "user"
    ]
}
- res: {
    "message": "User registered successfully!"
}

 - tối thiểu 4 mục như trên
 - role mặc định user
 - lỗi cụ thể nếu có : message_dev

2. log in: 
- url: /api/auth/login
- req: {
    "username": "admin",
    "password": "123456"
}
- res: {
    "id": 1,
    "user": "admin",
    "email": "admin@chatapp.com",
    "roles": [
        "ROLE_USER",
        "ROLE_ADMIN"
    ],
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjM5OTY2OTUyLCJleHAiOjE2NDAwNTMzNTJ9.5Q_5eATyXPZbuPwS1eO73e3eR8zdxREyqEeXJ5qyMYI"
}
3. test api: user content: test nội dung người dùng, header chứa token đăng nhập
- url: api/test/user
- header: {
    x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjM4ODU3MTk0LCJleHAiOjE2Mzg5NDM1OTR9.dwelikV-pUaAtilwMN6AX7tw1r1II8cHGgqH18tERCs
}
- req body: {
    "username": "admin",
    "email": "admin@chatapp.com",
    "password": "123456"
}