<?php
/**
 * Plugin Name: Xindo Headless Core
 * Description: Core data synchronization and custom REST API endpoints for Xindo Next.js frontend.
 * Version: 1.0.0
 * Author: Xindo Tech
 */

if (!defined('ABSPATH')) {
    exit;
}

class XindoHeadlessCore {

    const OPTION_KEY = 'xindo_headless_data';

    public function __construct() {
        // Register REST Routes
        add_action('rest_api_init', [$this, 'register_endpoints']);
        
        // Add Admin Menu
        add_action('admin_menu', [$this, 'register_admin_page']);
        
        // Handle form submission in Admin
        add_action('admin_post_xindo_save_data', [$this, 'save_admin_data']);
    }

    public function register_endpoints() {
        register_rest_route('xindo/v1', '/data', [
            'methods' => 'GET',
            'callback' => [$this, 'get_data'],
            'permission_callback' => '__return_true'
        ]);

        register_rest_route('xindo/v1', '/sync', [
            'methods' => 'POST',
            'callback' => [$this, 'sync_data'],
            'permission_callback' => '__return_true' // Open for local dev, secure in production
        ]);
    }

    public function get_data(WP_REST_Request $request) {
        $data = get_option(self::OPTION_KEY, []);
        return rest_ensure_response($data);
    }

    public function sync_data(WP_REST_Request $request) {
        $params = $request->get_json_params();
        if (empty($params)) {
             return new WP_Error('no_data', 'No valid JSON data provided.', ['status' => 400]);
        }

        update_option(self::OPTION_KEY, $params);
        return rest_ensure_response(['success' => true, 'message' => 'Data synced successfully.']);
    }

    public function register_admin_page() {
        add_menu_page(
            'Xindo Data Hub',
            'Xindo Data',
            'manage_options',
            'xindo-data-hub',
            [$this, 'render_admin_page'],
            'dashicons-database',
            30
        );
    }

    public function render_admin_page() {
        $data = get_option(self::OPTION_KEY, []);
        $json_data = wp_json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        
        ?>
        <div class="wrap">
            <h1>Xindo Headless Data Hub</h1>
            <p>Edit the raw JSON data that powers your Next.js application below.</p>
            
            <?php if (isset($_GET['status']) && $_GET['status'] == 'success'): ?>
                <div class="notice notice-success is-dismissible"><p>Data successfully updated!</p></div>
            <?php endif; ?>

            <form method="POST" action="<?php echo esc_url(admin_url('admin-post.php')); ?>">
                <input type="hidden" name="action" value="xindo_save_data">
                <?php wp_nonce_field('xindo_save_data_nonce', '_wpnonce'); ?>
                
                <textarea 
                    name="xindo_json_data" 
                    id="xindo-json-editor"
                    style="width: 100%; height: 600px; font-family: monospace; background: #1e1e1e; color: #d4d4d4; padding: 15px; border-radius: 5px;"
                ><?php echo esc_textarea($json_data); ?></textarea>
                
                <br><br>
                <button type="submit" class="button button-primary button-large">Save Application Data</button>
            </form>
        </div>
        
        <script>
            // Simple tab support for the textarea
            document.getElementById('xindo-json-editor').addEventListener('keydown', function(e) {
                if (e.key == 'Tab') {
                    e.preventDefault();
                    var start = this.selectionStart;
                    var end = this.selectionEnd;
                    this.value = this.value.substring(0, start) + "  " + this.value.substring(end);
                    this.selectionStart = this.selectionEnd = start + 2;
                }
            });
        </script>
        <?php
    }

    public function save_admin_data() {
        if (!current_user_can('manage_options')) {
            wp_die('Unauthorized');
        }

        check_admin_referer('xindo_save_data_nonce');

        if (isset($_POST['xindo_json_data'])) {
            $json_string = stripslashes($_POST['xindo_json_data']);
            $decoded = json_decode($json_string, true);
            
            if (json_last_error() === JSON_ERROR_NONE) {
                update_option(self::OPTION_KEY, $decoded);
                wp_redirect(admin_url('admin.php?page=xindo-data-hub&status=success'));
                exit;
            } else {
                wp_die('Invalid JSON format. Please go back and correct it.');
            }
        }
    }
}

new XindoHeadlessCore();
