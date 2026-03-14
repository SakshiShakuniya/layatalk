# Laya Talk Backend (Laravel)

This is the Laravel backend that powers the Laya Talk Next.js frontend. It exposes public blog endpoints and protected admin APIs for creating, updating, and deleting blogs with optional featured images.

## Requirements
- PHP 8.2+
- Composer
- MySQL/PostgreSQL/SQLite

## Setup
1. Install dependencies
   - composer install
2. Configure environment
   - cp .env.example .env
   - php artisan key:generate
   - Set DB connection in .env
3. Migrate database
   - php artisan migrate
4. Serve app
   - php artisan serve

### Media storage
- Uploaded featured images are validated and stored to storage/app/public/blogs and exposed as /storage/blogs/... via Storage::url().
- A fallback route for /storage/* has been added in routes/web.php to serve files even if the storage symlink is missing. Recommended:
  - php artisan storage:link

## API
Public:
- GET /api/blogs — list published blogs
- GET /api/blog/{slug} — single blog by slug

Admin (auth:sanctum):
- POST /api/admin/login — obtain token
- GET /api/admin/blogs — list all blogs
- POST /api/admin/blog — create blog (supports featured_image)
- PUT /api/admin/blog/{id} — update blog (supports featured_image)
- DELETE /api/admin/blog/{id} — delete blog


The Next.js app consumes these endpoints and normalizes image URLs for reliable display in both the blog list and details pages.
