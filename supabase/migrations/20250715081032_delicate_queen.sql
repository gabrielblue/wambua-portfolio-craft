/*
  # Create services table

  1. New Tables
    - `services`
      - `id` (uuid, primary key)
      - `name` (text, service name)
      - `description` (text, service description)
      - `icon` (text, icon identifier)
      - `gradient` (text, gradient class name)
      - `order_index` (integer, display order)
      - `is_active` (boolean, visibility status)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `services` table
    - Add policy for public to read active services
    - Add policy for authenticated users to manage services

  3. Functions
    - Create trigger function to update `updated_at` column
    - Add trigger to automatically update `updated_at` on row changes
*/

-- Create the services table
CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  icon text NOT NULL DEFAULT '💻',
  gradient text NOT NULL DEFAULT 'bg-gradient-blue',
  order_index integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can view active services"
  ON services
  FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Authenticated users can manage services"
  ON services
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create function to update updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for services table
CREATE TRIGGER update_services_updated_at
  BEFORE UPDATE ON services
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert default services data
INSERT INTO services (name, description, icon, gradient, order_index, is_active) VALUES
  ('Web Development', 'Creating responsive and modern websites using the latest technologies', '🌐', 'bg-gradient-to-r from-blue-500 to-purple-600', 1, true),
  ('Mobile Development', 'Building native and cross-platform mobile applications', '📱', 'bg-gradient-to-r from-green-500 to-blue-500', 2, true),
  ('Backend Development', 'Developing robust server-side applications and APIs', '⚙️', 'bg-gradient-to-r from-purple-500 to-pink-500', 3, true),
  ('UI/UX Design', 'Designing intuitive and beautiful user interfaces', '🎨', 'bg-gradient-to-r from-orange-500 to-red-500', 4, true);