-- Add soft delete columns to existing tables
-- V2__add_soft_delete_columns.sql
-- Add soft delete columns to users table
ALTER TABLE users
ADD COLUMN is_deleted BOOLEAN DEFAULT FALSE,
ADD COLUMN deleted_at TIMESTAMP;

-- Add soft delete columns to menu_items table  
ALTER TABLE menu_items
ADD COLUMN is_deleted BOOLEAN DEFAULT FALSE,
ADD COLUMN deleted_at TIMESTAMP;

-- Update existing records to set is_deleted = false for all current data
UPDATE users
SET
    is_deleted = FALSE
WHERE
    is_deleted IS NULL;

UPDATE menu_items
SET
    is_deleted = FALSE
WHERE
    is_deleted IS NULL;

-- Make the image field optional in menu_items (remove NOT NULL constraint)
ALTER TABLE menu_items
ALTER COLUMN image
DROP NOT NULL;