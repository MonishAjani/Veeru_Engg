<?php
// index.php - Entry point for the PHP fallback method
header('Content-Type: text/html');
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Veeru Engineering API</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            line-height: 1.6;
            color: #333;
        }
        h1, h2 {
            color: #f97316;
        }
        .card {
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 20px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .endpoint {
            background-color: #f5f5f5;
            padding: 10px;
            border-radius: 4px;
            font-family: monospace;
            margin: 5px 0;
        }
        a {
            color: #f97316;
            text-decoration: none;
        }
        a:hover {
            text-decoration: underline;
        }
        .button {
            display: inline-block;
            background-color: #f97316;
            color: white;
            padding: 10px 15px;
            border-radius: 4px;
            text-decoration: none;
            margin-top: 10px;
        }
        .button:hover {
            background-color: #ea580c;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <h1>Veeru Engineering API</h1>
    <p>Welcome to the Veeru Engineering API. This API provides access to services, projects, and certificates data.</p>
    
    <div class="card">
        <h2>Available Endpoints</h2>
        <div class="endpoint">/api/services</div>
        <div class="endpoint">/api/projects</div>
        <div class="endpoint">/api/certificates</div>
        <div class="endpoint">/api/prestigious-projects</div>
        <div class="endpoint">/api/test-cors</div>
        <div class="endpoint">/api/debug</div>
    </div>
    
    <div class="card">
        <h2>Testing Tools</h2>
        <p>Use these tools to test the API and verify it's working correctly:</p>
        <p><a href="test.php" class="button">PHP Info Test</a></p>
        <p><a href="api_test.html" class="button">API Test Tool</a></p>
    </div>
    
    <div class="card">
        <h2>Usage Examples</h2>
        <p>To access the API, make requests to the endpoints using the following format:</p>
        <div class="endpoint">https://api.veeruengineering.com/api.php/api/services</div>
        <p>This will return a JSON response with all services data.</p>
    </div>
    
    <div class="card">
        <h2>Frontend Integration</h2>
        <p>To integrate with your frontend, update your API base URL to:</p>
        <div class="endpoint">https://api.veeruengineering.com/api.php/api</div>
        <p>Then make requests to the specific endpoints as needed.</p>
    </div>
    
    <footer style="margin-top: 40px; text-align: center; color: #666; font-size: 14px;">
        &copy; <?php echo date('Y'); ?> Veeru Engineering. All rights reserved.
    </footer>
</body>
</html>