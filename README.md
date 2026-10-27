rm -rf .next là lệnh dùng để xóa hoàn toàn thư mục build

## shadcn/ui

- npx shadcn@latest init

- sonner: tạo thông báo

## Tách component

- khi xử lý api / cache / cookie (đảm bảo static trang chính) + "use client"
- đặt component ở scope phù hợp (nếu chỉ dùng trong folder đó thì đặt cạnh page, dùng ở toàn dự án thì đưa vào folder component)

- khi muốn get token cần nhờ server lấy hộ (viết hàm bên action)

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

## Chia folder

- constants: Tạo config constant để gọi api ngắn hơn
- services: chứa các hàm gọi API
- utils: hàm xử lý thông thường

- (main): chỉ liên quan đến route
- constants, services, utils cùng cấp vs app

## Luồng login

- Luồng chung: Gọi API lên BE, BE trả về token r lưu lại
- React: set trực tiếp ở trình duyệt
- Next: token lưu ở cookie, set cờ httpOnly -> cần nhờ server action xử lý hộ / route handler

- BE chỉ cần trả về token thôi chứ k set. Nếu set BE thì cross domain (2 tên miền khác nhau) -> cần thiết lập https, set same size là none. Còn bình thường chỉ cho set cùng tên miền / tới tên miền con => Dùng Next có Next Server -> Dùng luôn

- dùng server action + action state

- router import /navigation

- khi làm việc với layout thì nên tách riêng 1 folder layout

- nếu gọi ở client thì dùng luôn Axios để gắn access token vào headers bằng interceptors (vẫn k đọc đc cookie -> nhờ server action lấy hộ)

- refetchUser cần đc gọi lại ở nhiều nơi -> tách thành customHook