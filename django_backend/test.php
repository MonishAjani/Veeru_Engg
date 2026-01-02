<?php
// test.php - A simple test file to verify PHP is working
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: https://veeruengineering.com');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Basic server information
$server_info = [
    'status' => 'success',
    'message' => 'PHP is working correctly!',
    'php_version' => phpversion(),
    'server_software' => $_SERVER['SERVER_SOFTWARE'] ?? 'Unknown',
    'server_name' => $_SERVER['SERVER_NAME'] ?? 'Unknown',
    'request_time' => date('Y-m-d H:i:s'),
    'sqlite_available' => extension_loaded('sqlite3') ? 'Yes' : 'No',
    'database_exists' => file_exists('db.sqlite3') ? 'Yes' : 'No'
];

// Test database connection if SQLite is available
if (extension_loaded('sqlite3') && file_exists('db.sqlite3')) {
    try {
        $db = new SQLite3('db.sqlite3');
        $server_info['database_connection'] = 'Success';
        
        // Get table count
        $result = $db->query("SELECT count(*) as count FROM sqlite_master WHERE type='table'");
        $row = $result->fetchArray(SQLITE3_ASSOC);
        $server_info['table_count'] = $row['count'];
        
        // List tables
        $tables = [];
        $result = $db->query("SELECT name FROM sqlite_master WHERE type='table'");
        while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
            $tables[] = $row['name'];
        }
        $server_info['tables'] = $tables;
        
        $db->close();
    } catch (Exception $e) {
        $server_info['database_connection'] = 'Failed: ' . $e->getMessage();
    }
}

// Output the information
echo json_encode($server_info, JSON_PRETTY_PRINT);
?>