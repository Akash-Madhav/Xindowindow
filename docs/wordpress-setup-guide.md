# WordPress Setup Guide

## 1. WordPress REST API
The WordPress REST API is enabled by default in WP 4.7+. You can verify it by navigating to `https://your-wordpress-site.com/wp-json/wp/v2/`.

## 2. ACF PRO Installation
You must install and activate the Advanced Custom Fields PRO plugin. The PRO version is required for Repeater fields and Options Pages.
Once installed, go to ACF -> Settings, and ensure "REST API" is set to "Active".

## 3. Options Pages
Add the following to your active theme's `functions.php` to create the Global Settings options page:
```php
if( function_exists('acf_add_options_page') ) {
    acf_add_options_page(array(
        'page_title'    => 'Global Settings',
        'menu_title'    => 'Global Settings',
        'menu_slug'     => 'global-settings',
        'capability'    => 'edit_posts',
        'redirect'      => false,
        'show_in_rest'  => true, // Expose via REST API
    ));
}
```

## 4. ACF Field Groups
1. Go to ACF -> Tools -> Import Field Groups.
2. Select the `acf-export.json` file located in this folder.
3. Import the field groups.

## 5. Custom Post Types
You can create CPTs for `Testimonials` or `Products` if you prefer not to use Global Option page repeaters. (The JSON uses Options Page repeaters for simplicity).

## 6. CORS Configuration
Add this to `functions.php`:
```php
add_action('rest_api_init', function() {
  remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
  add_filter('rest_pre_serve_request', function($value) {
    $origin = get_http_origin();
    $allowed = ['https://xindowindow.com', 'http://localhost:3000'];
    if (in_array($origin, $allowed)) {
      header("Access-Control-Allow-Origin: " . esc_url($origin));
      header("Access-Control-Allow-Methods: GET, OPTIONS");
      header("Access-Control-Allow-Headers: Content-Type, Authorization");
    }
    return $value;
  });
});
```

## 7. Media Links
Ensure images are uploaded to the WP Media library and URLs configured inside the ACF image fields. The Next.js frontend `.env.local` must point to your WordPress install.
