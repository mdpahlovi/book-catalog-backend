## Application Routes: https://book-catalog-backend-khaki.vercel.app/

#### Test Customer = 32ff4e3c-8cbb-43fe-8760-2ec258ede453

#### Test Admin = b555e38e-bead-4132-8d74-f3d9bf6e2ef2

#### Test Admin (Token) = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiNTU1ZTM4ZS1iZWFkLTQxMzItOGQ3NC1mM2Q5YmY2ZTJlZjIiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2OTM2NzA4MTksImV4cCI6MTcyNTIwNjgxOX0.NpGWRXndA59T8ndNrT8mZKOC0K5d89EZsHKdNKcuWCY

### User

-   https://book-catalog-backend-khaki.vercel.app/api/v1/auth/signup (POST)
-   https://book-catalog-backend-khaki.vercel.app/api/v1/auth/signin (POST)
-   https://book-catalog-backend-khaki.vercel.app/api/v1/users (GET)
-   https://book-catalog-backend-khaki.vercel.app/api/v1/users/32ff4e3c-8cbb-43fe-8760-2ec258ede453 (Single GET)
-   https://book-catalog-backend-khaki.vercel.app/api/v1/users/32ff4e3c-8cbb-43fe-8760-2ec258ede453 (PATCH)
-   https://book-catalog-backend-khaki.vercel.app/api/v1/users/32ff4e3c-8cbb-43fe-8760-2ec258ede453 (DELETE)
-   https://book-catalog-backend-khaki.vercel.app/api/v1/profile (GET)

### Category

-   https://book-catalog-backend-khaki.vercel.app/api/v1/categories/create-category (POST)
-   https://book-catalog-backend-khaki.vercel.app/api/v1/categories (GET)
-   https://book-catalog-backend-khaki.vercel.app/api/v1/categories/936c7564-f99f-4d13-91b4-3bd60469e5af (Single GET)
-   https://book-catalog-backend-khaki.vercel.app/api/v1/categories/f2a13685-cac4-4d17-9dbb-dd2ff0495b25 (PATCH)
-   https://book-catalog-backend-khaki.vercel.app/api/v1/categories/f2a13685-cac4-4d17-9dbb-dd2ff0495b25 (DELETE)

### Books

-   https://book-catalog-backend-khaki.vercel.app/api/v1/books/create-book (POST)
-   https://book-catalog-backend-khaki.vercel.app/api/v1/books (GET)
-   https://book-catalog-backend-khaki.vercel.app/api/v1/books/936c7564-f99f-4d13-91b4-3bd60469e5af/category (GET)
-   https://book-catalog-backend-khaki.vercel.app/api/v1/books/a7d6cff7-ec90-4c8e-9b0f-1226d019a276 (GET)
-   https://book-catalog-backend-khaki.vercel.app/api/v1/books/a7d6cff7-ec90-4c8e-9b0f-1226d019a276 (PATCH)
-   https://book-catalog-backend-khaki.vercel.app/api/v1/books/a7d6cff7-ec90-4c8e-9b0f-1226d019a276 (DELETE)

### Orders

-   https://book-catalog-backend-khaki.vercel.app/api/v1/orders/create-order (POST)
-   https://book-catalog-backend-khaki.vercel.app/api/v1/orders (GET)
-   https://book-catalog-backend-khaki.vercel.app/api/v1/orders/c71820fa-40d9-4711-b27b-7292eeef9ac5 (GET)
-   Order Customer : { "email" : "janesmith@gmail.com", "password" : "123456" }
