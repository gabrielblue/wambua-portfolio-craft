/*
  # Create works table for dynamic portfolio management

  1. New Tables
    - `works`
      - `id` (uuid, primary key)
      - `title` (text, project title)
      - `description` (text, project description)
      - `image_url` (text, project image URL)
      - `tech_stack` (text, technology used)
      - `github_url` (text, GitHub repository URL)
      - `live_url` (text, live demo URL, optional)
      - `category` (text, project category)
      - `order_index` (integer, for ordering)
      - `is_featured` (boolean, to highlight projects)
      - `is_active` (boolean, to show/hide projects)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `works` table
    - Add policy for public read access
    - Add policy for authenticated admin write access

  3. Sample Data
    - Insert default projects from the current static data
*/

CREATE TABLE IF NOT EXISTS works (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  image_url text NOT NULL,
  tech_stack text NOT NULL,
  github_url text,
  live_url text,
  category text NOT NULL DEFAULT 'Web Development',
  order_index integer NOT NULL DEFAULT 0,
  is_featured boolean NOT NULL DEFAULT false,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE works ENABLE ROW LEVEL SECURITY;

-- Allow public read access to active works
CREATE POLICY "Anyone can view active works"
  ON works
  FOR SELECT
  TO public
  USING (is_active = true);

-- Allow authenticated users to manage works (for admin)
CREATE POLICY "Authenticated users can manage works"
  ON works
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Insert default works
INSERT INTO works (title, description, image_url, tech_stack, github_url, category, order_index, is_featured) VALUES
  (
    'Alumni Android App',
    'Mobile application built with Kotlin for alumni networking and communication',
    '/src/assets/alumni-android-mockup.jpg',
    'Kotlin',
    'https://github.com/gabrielblue/alumniandroid',
    'Mobile Development',
    1,
    true
  ),
  (
    'Laravel Web Application',
    'Full-stack web platform built with Laravel, PHP and Bootstrap',
    '/src/assets/laravel-project-mockup.jpg',
    'PHP, Laravel',
    'https://github.com/gabrielblue/Laravel-project',
    'Web Development',
    2,
    true
  ),
  (
    'Node.js Backend API',
    'Server-side application with Express.js and registration system',
    '/src/assets/nodejs-project-mockup.jpg',
    'Node.js, JavaScript',
    'https://github.com/gabrielblue/Nodejs-',
    'Backend Development',
    3,
    false
  ),
  (
    'Frontend Assignment',
    'Responsive web development project showcasing HTML, CSS skills',
    '/src/assets/assignment-project-mockup.jpg',
    'HTML, CSS',
    'https://github.com/gabrielblue/assingment',
    'Frontend Development',
    4,
    false
  );

-- Create trigger to update updated_at timestamp
CREATE TRIGGER update_works_updated_at
    BEFORE UPDATE ON works
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();