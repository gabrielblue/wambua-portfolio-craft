/*
  # Create services table for dynamic service management

  1. New Tables
    - `services`
      - `id` (uuid, primary key)
      - `name` (text, service name)
      - `description` (text, service description)
      - `icon` (text, icon identifier)
      - `gradient` (text, gradient class)
      - `order_index` (integer, for ordering)
      - `is_active` (boolean, to show/hide services)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `services` table
    - Add policy for public read access
    - Add policy for authenticated admin write access

  3. Sample Data
    - Insert default services from the current static data
*/

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

ALTER TABLE services ENABLE ROW LEVEL SECURITY;

-- Allow public read access to active services
CREATE POLICY "Anyone can view active services"
  ON services
  FOR SELECT
  TO public
  USING (is_active = true);

-- Allow authenticated users to manage services (for admin)
CREATE POLICY "Authenticated users can manage services"
  ON services
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Insert default services
INSERT INTO services (name, description, icon, gradient, order_index) VALUES
  ('HTML', 'I deliver high-quality solutions for web development. To begin, understanding client requirements is crucial; effective communication helps tailor HTML code to meet specific needs.', '💻', 'bg-gradient-purple', 1),
  ('CSS', 'I craft visually appealing and responsive designs for websites. Assessing client preferences and branding guidelines ensures a personalized approach.', '🎨', 'bg-gradient-green', 2),
  ('JavaScript', 'I create dynamic and interactive web experiences tailored to clients'' functional requirements, ensuring engaging and responsive interfaces.', '⚡', 'bg-gradient-pink', 3),
  ('React', 'I build scalable, component-based user interfaces using React, ensuring seamless and maintainable front-end solutions for complex applications.', '⚛️', 'bg-gradient-blue', 4),
  ('Mobile App Development', 'I develop cross-platform mobile applications that deliver a seamless user experience on iOS and Android devices, using modern frameworks and tools.', '📱', 'bg-gradient-purple', 5),
  ('Laravel', 'I use Laravel to build secure and efficient backend solutions for web applications, focusing on scalability, reliability, and rapid development.', '🛠️', 'bg-gradient-orange', 6);

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_services_updated_at
    BEFORE UPDATE ON services
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();