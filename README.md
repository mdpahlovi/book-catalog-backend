## Application Routes: https://book-catalog-backend-khaki.vercel.app/

### User

-   https://book-catalog-backend-khaki.vercel.app/api/v1/auth/signup (POST)
-   https://book-catalog-backend-khaki.vercel.app/api/v1/auth/signin (POST)
-   https://book-catalog-backend-khaki.vercel.app/api/v1/users (GET)
-   https://book-catalog-backend-khaki.vercel.app/api/v1/users/6177a5b87d32123f08d2f5d4 (Single GET)
-   https://book-catalog-backend-khaki.vercel.app/api/v1/users/6177a5b87d32123f08d2f5d4 (PATCH)
-   https://book-catalog-backend-khaki.vercel.app/api/v1/users/6177a5b87d32123f08d2f5d4 (DELETE)
-   https://book-catalog-backend-khaki.vercel.app/api/v1/profile (GET)

### Category

-   https://book-catalog-backend-khaki.vercel.app/api/v1/categories/create-category (POST)
-   https://book-catalog-backend-khaki.vercel.app/api/v1/categories (GET)
-   https://book-catalog-backend-khaki.vercel.app/api/v1/categories/6177a5b87d32123f08d2f5d4 (Single GET)
-   https://book-catalog-backend-khaki.vercel.app/api/v1/categories/6177a5b87d32123f08d2f5d4 (PATCH)
-   https://book-catalog-backend-khaki.vercel.app/api/v1/categories/6177a5b87d32123f08d2f5d4 (DELETE)

### Books

-   https://book-catalog-backend-khaki.vercel.app/api/v1/books/create-book (POST)
-   https://book-catalog-backend-khaki.vercel.app/api/v1/books (GET)
-   https://book-catalog-backend-khaki.vercel.app/api/v1/books/:categoryId/category (GET)
-   https://book-catalog-backend-khaki.vercel.app/api/v1/books/:id (GET)
-   https://book-catalog-backend-khaki.vercel.app/api/v1/books/:id (PATCH)
-   https://book-catalog-backend-khaki.vercel.app/api/v1/books/:id (DELETE)

### Orders

-   https://book-catalog-backend-khaki.vercel.app/api/v1/orders/create-order (POST)
-   https://book-catalog-backend-khaki.vercel.app/api/v1/orders (GET)
-   https://book-catalog-backend-khaki.vercel.app/api/v1/orders/:orderId (GET)
