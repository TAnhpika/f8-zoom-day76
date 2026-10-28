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

- store: config zustand

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

## Logout

- tránh khi chuyển trang refetch lại user -> đẩy thông tin cơ bản của user lên global state -> chỉ cần lấy lần đầu.
- khi nào logout thì cập nhập state ấy trên global
- nhanh nhất thì dùng Zustand, k cần bọc Provider. (Redux phải bọc, setup hơi phức tạp)

- khi nào xử lý cookie thì nhờ server của Next lấy hộ
- logout viết trực tiếp trên action vì k cần xử lý state
- gọi ở dưới -> để hồi refetch

## AddToCard

- đồng bộ global state -> dùng zustand (setup cực chill)

- fetch vs axios: dùng fetch khi muốn cache, còn lại axios

## RefreshToken

- fetch nhiều lần -> cắm cờ Promise -> hàm chạy 1 lần

- ở home sửa sai access token, khi qua product nav về login nhưng product là trang public

## Get cart list

### dumb - smart container

- tách riêng phần hiển thị (UI) & logic

### server-only

- npm i server-only
- import ở client sẽ lỗi
- chỉ dùng trong folder app

## Refresh access token khi refreshToken vẫn còn

- access token hết hạn. từ home -> cart sẽ lỗi
- hàm fetchWrapper gọi api refetch nhưng k lưu đc do đang gọi trang server component, dù gọi qua server action vẫn k lưu đc. 
-> gọi từ client (axios refetch) / gọi từ middleware
- nếu muốn có data fetching từ server thì cần thiết lập ở proxy (thành phần duy nhất trước khi vào page - proxy - layout - page) -> refetch ở proxy

- nếu dùng trực tiếp cookies từ next/headers sẽ toang vì nó tuân theo chuẩn http: hết vòng đời request thì cookie mới được set
- proxy -> set cookie (response header) -> layout -> page -> response (browser save)
- mới vào page mà gọi api thì đọc token cũ (đợi lần F5 tiếp mới có token mới)
- Khi set cookie bằng response của proxy -> next tự động đính kèm cookie mới vào request header

## Protect route
- đã login thì k vào page login nữa