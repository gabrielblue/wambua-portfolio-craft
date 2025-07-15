/*
  # Create works table

  1. New Tables
    - `works`
      - `id` (uuid, primary key)
      - `title` (text, project title)
      - `description` (text, project description)
      - `image_url` (text, project image)
      - `tech_stack` (text, technologies used)
      - `github_url` (text, optional GitHub link)
      - `live_url` (text, optional live demo link)
      - `category` (text, project category)
      - `order_index` (integer, display order)
      - `is_featured` (boolean, featured status)
      - `is_active` (boolean, visibility status)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `works` table
    - Add policy for public to read active works
    - Add policy for authenticated users to manage works

  3. Triggers
    - Add trigger to automatically update `updated_at` on row changes
*/

-- Create the works table
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

-- Enable Row Level Security
ALTER TABLE works ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can view active works"
  ON works
  FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Authenticated users can manage works"
  ON works
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create trigger for works table
CREATE TRIGGER update_works_updated_at
  BEFORE UPDATE ON works
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert default works data
INSERT INTO works (title, description, image_url, tech_stack, github_url, category, order_index, is_featured, is_active) VALUES
  (
    'Alumni Android App',
    'Mobile application built with Kotlin for alumni networking and communication',
    'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=800',
    'Kotlin, Android',
    'https://github.com/gabrielblue/alumniandroid',
    'Mobile Development',
    1,
    true,
    true
  ),
  (
    'Laravel Web Application',
    'Full-stack web platform built with Laravel, PHP and Bootstrap',
    'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=800',
    'PHP, Laravel, Bootstrap',
    'https://github.com/gabrielblue/Laravel-project',
    'Web Development',
    2,
    true,
    true
  ),
  (
    'Node.js Backend API',
    'Server-side application with Express.js and registration system',
    'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=800',
    'Node.js, Express.js, JavaScript',
    'https://github.com/gabrielblue/Nodejs-',
    'Backend Development',
    3,
    false,
    true
  ),
  (
    'Frontend Assignment',
    'Responsive web development project showcasing HTML, CSS skills',
    'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
    'HTML, CSS, JavaScript',
    'https://github.com/gabrielblue/assingment',
    'Frontend Development',
    4,
    false,
    true
  );