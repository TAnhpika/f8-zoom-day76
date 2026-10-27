rm -rf .next là lệnh dùng để xóa hoàn toàn thư mục build

## shadcn/ui

- npx shadcn@latest init

- sonner: tạo thông báo

## Tách component

- khi xử lý api / cache / cookie (đảm bảo static trang chính) + "use client"
- đặt component ở scope phù hợp (nếu chỉ dùng trong folder đó thì đặt cạnh page, dùng ở toàn dự án thì đưa vào folder component)

## Config src ảnh ngoài

```json
images: {
    remotePatterns: [
        {
            hostname: "images.unsplash.com",
        },
    ],
},
```
