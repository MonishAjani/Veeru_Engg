import sqlite3
import mysql.connector
import os

# Database settings - replace with your actual values
MYSQL_HOST = "localhost"  # Use your Hostinger MySQL host
MYSQL_USER = "your_db_user"  # Your Hostinger MySQL username
MYSQL_PASSWORD = "your_db_password"  # Your Hostinger MySQL password
MYSQL_DATABASE = "your_db_name"  # Your Hostinger database name
SQLITE_DB = "db.sqlite3"  # Path to your SQLite database

# Connect to SQLite
print("Connecting to SQLite database...")
sqlite_conn = sqlite3.connect(SQLITE_DB)
sqlite_cursor = sqlite_conn.cursor()

# Get all tables
print("Getting tables from SQLite...")
sqlite_cursor.execute("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';")
tables = sqlite_cursor.fetchall()

# Connect to MySQL
print(f"Connecting to MySQL database ({MYSQL_USER}@{MYSQL_HOST})...")
try:
    mysql_conn = mysql.connector.connect(
        host="localhost",
        user="Monish_Ajani",
        password="Jfmamjjasond@2025",
        database="veeru_djnago"
    )
    mysql_cursor = mysql_conn.cursor()
    print("MySQL connection successful!")
except Exception as e:
    print(f"Error connecting to MySQL: {e}")
    sqlite_conn.close()
    exit(1)

print(f"Found {len(tables)} tables to convert")

# Process each table
for table in tables:
    table_name = table[0]
    print(f"\nProcessing table: {table_name}")
    
    # Get table schema
    sqlite_cursor.execute(f"PRAGMA table_info({table_name})")
    columns = sqlite_cursor.fetchall()
    
    # Get table data
    sqlite_cursor.execute(f"SELECT * FROM {table_name}")
    rows = sqlite_cursor.fetchall()
    
    if not rows:
        print(f"  Table {table_name} is empty, skipping")
        continue
    
    print(f"  Found {len(rows)} rows")
    
    # Get column names
    column_names = [column[1] for column in columns]
    print(f"  Columns: {', '.join(column_names)}")
    
    try:
        # Check if table exists in MySQL
        try:
            mysql_cursor.execute(f"SELECT 1 FROM {table_name} LIMIT 1")
            table_exists = True
        except:
            table_exists = False
        
        if table_exists:
            # Delete existing data in MySQL table
            print(f"  Clearing existing data from {table_name}...")
            mysql_cursor.execute(f"DELETE FROM {table_name}")
            
            # Create placeholders for INSERT
            placeholders = ', '.join(['%s'] * len(column_names))
            
            # Insert data into MySQL
            print(f"  Inserting {len(rows)} rows into {table_name}...")
            success_count = 0
            error_count = 0
            
            for i, row in enumerate(rows):
                try:
                    mysql_cursor.execute(
                        f"INSERT INTO {table_name} ({', '.join(column_names)}) VALUES ({placeholders})", 
                        row
                    )
                    success_count += 1
                    if (i+1) % 100 == 0 or i+1 == len(rows):
                        print(f"  Progress: {i+1}/{len(rows)} rows processed")
                except Exception as e:
                    error_count += 1
                    if error_count < 5:  # Only show first few errors to avoid flooding console
                        print(f"  Error inserting row {i} into {table_name}: {e}")
                    elif error_count == 5:
                        print("  Additional errors omitted...")
            
            print(f"  Completed table {table_name}: {success_count} rows inserted, {error_count} errors")
        else:
            print(f"  Table {table_name} does not exist in MySQL database, skipping")
    except Exception as e:
        print(f"  Error processing table {table_name}: {e}")

# Commit changes and close connections
print("\nCommitting changes to MySQL...")
mysql_conn.commit()

print("Closing connections...")
sqlite_conn.close()
mysql_conn.close()

print("\nConversion completed!")
print("Remember to check for any errors reported above.")