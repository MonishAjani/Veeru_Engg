<?php
// api.php - A simple PHP proxy for your SQLite database
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: https://veeruengineering.com');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Access-Control-Allow-Credentials: true');

// Enable error reporting for debugging (remove in production)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Log errors to a file
ini_set('log_errors', 1);
ini_set('error_log', 'php_errors.log');

// Handle preflight OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Connect to SQLite database
try {
    $db = new SQLite3('db.sqlite3');
    $db->enableExceptions(true);
    
    // Set timeout to avoid database locked errors
    $db->busyTimeout(5000);
    
    // Log successful connection
    error_log("Successfully connected to SQLite database");
} catch (Exception $e) {
    error_log("Database connection failed: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed: ' . $e->getMessage()]);
    exit();
}

// Get the request path
$path = $_SERVER['REQUEST_URI'];
error_log("Request path: " . $path);

// Function to handle database queries
function fetchData($db, $table, $entityName) {
    try {
        $results = $db->query("SELECT * FROM $table");
        $items = [];
        while ($row = $results->fetchArray(SQLITE3_ASSOC)) {
            $items[] = $row;
        }
        error_log("Successfully fetched " . count($items) . " items from $table");
        echo json_encode(['results' => $items]);
    } catch (Exception $e) {
        error_log("Error fetching $entityName: " . $e->getMessage());
        http_response_code(500);
        echo json_encode(['error' => "Error fetching $entityName: " . $e->getMessage()]);
    }
}

// Handle different API endpoints
if (strpos($path, '/api/services') !== false) {
    fetchData($db, 'services_service', 'services');
}
elseif (strpos($path, '/api/projects') !== false) {
    fetchData($db, 'projects_project', 'projects');
}
elseif (strpos($path, '/api/certificates') !== false) {
    fetchData($db, 'certificates_certificate', 'certificates');
}
elseif (strpos($path, '/api/prestigious-projects') !== false || strpos($path, '/api/prestigious_projects') !== false) {
    fetchData($db, 'prestigious_projects_prestigiousproject', 'prestigious projects');
}
elseif (strpos($path, '/api/test-cors') !== false) {
    // Test CORS endpoint
    error_log("Test CORS endpoint accessed");
    echo json_encode([
        'status' => 'success',
        'message' => 'CORS is working correctly!',
        'method' => $_SERVER['REQUEST_METHOD'],
        'path' => $path,
        'headers' => getallheaders()
    ]);
}
elseif (strpos($path, '/api/debug') !== false) {
    // Debug endpoint to check database tables
    try {
        $tables = [];
        $results = $db->query("SELECT name FROM sqlite_master WHERE type='table'");
        while ($row = $results->fetchArray(SQLITE3_ASSOC)) {
            $tables[] = $row['name'];
        }
        echo json_encode([
            'status' => 'success',
            'tables' => $tables,
            'php_version' => phpversion(),
            'sqlite_version' => SQLite3::version()['versionString']
        ]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Error fetching tables: ' . $e->getMessage()]);
    }
}
else {
    // Endpoint not found
    error_log("Endpoint not found: " . $path);
    http_response_code(404);
    echo json_encode([
        'error' => 'Endpoint not found',
        'path' => $path,
        'available_endpoints' => [
            '/api/services',
            '/api/projects',
            '/api/certificates',
            '/api/prestigious-projects',
            '/api/test-cors',
            '/api/debug'
        ]
    ]);
}

// Close the database connection
$db->close();
?>