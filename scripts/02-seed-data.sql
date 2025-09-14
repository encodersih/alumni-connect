-- Insert demo users
INSERT INTO users (email, password_hash, user_type, first_name, last_name) VALUES
('student@university.edu', '$2b$10$hash1', 'student', 'John', 'Student'),
('alumni@university.edu', '$2b$10$hash2', 'alumni', 'Sarah', 'Alumni'),
('admin@university.edu', '$2b$10$hash3', 'admin', 'Admin', 'User'),
('alumni2@university.edu', '$2b$10$hash4', 'alumni', 'Michael', 'Johnson'),
('alumni3@university.edu', '$2b$10$hash5', 'alumni', 'Emily', 'Davis'),
('student2@university.edu', '$2b$10$hash6', 'student', 'Alex', 'Wilson');

-- Insert alumni profiles
INSERT INTO alumni_profiles (user_id, graduation_year, degree, major, current_company, current_position, industry, location, bio, skills, is_mentor, mentor_categories) VALUES
(2, 2018, 'Bachelor of Science', 'Computer Science', 'Google', 'Senior Software Engineer', 'Technology', 'San Francisco, CA', 'Passionate software engineer with 6 years of experience in full-stack development.', ARRAY['JavaScript', 'Python', 'React', 'Node.js'], true, ARRAY['Career Development', 'Technical Skills']),
(4, 2015, 'Master of Business Administration', 'Business Administration', 'Microsoft', 'Product Manager', 'Technology', 'Seattle, WA', 'Product management expert with focus on enterprise solutions.', ARRAY['Product Management', 'Strategy', 'Leadership'], true, ARRAY['Career Development', 'Leadership']),
(5, 2020, 'Bachelor of Arts', 'Marketing', 'Adobe', 'Marketing Director', 'Marketing', 'New York, NY', 'Creative marketing professional with expertise in digital campaigns.', ARRAY['Digital Marketing', 'Brand Strategy', 'Analytics'], false, ARRAY[]);

-- Insert student profiles
INSERT INTO student_profiles (user_id, student_id, current_year, major, expected_graduation, interests, career_goals) VALUES
(1, 'STU001', 3, 'Computer Science', 2025, ARRAY['Web Development', 'AI/ML', 'Startups'], 'Become a full-stack developer at a tech startup'),
(6, 'STU002', 2, 'Business Administration', 2026, ARRAY['Entrepreneurship', 'Finance', 'Consulting'], 'Start my own business or work in management consulting');

-- Insert sample mentorship requests
INSERT INTO mentorship_requests (student_id, mentor_id, status, message, category) VALUES
(1, 2, 'pending', 'Hi Sarah, I would love to learn more about your journey in software engineering and get guidance on my career path.', 'Career Development'),
(6, 4, 'accepted', 'Hello Michael, I am interested in product management and would appreciate your mentorship.', 'Career Development');

-- Insert sample events
INSERT INTO events (title, description, event_date, location, event_type, max_attendees, created_by) VALUES
('Alumni Networking Night', 'Join us for an evening of networking with fellow alumni and current students.', '2024-10-15 18:00:00', 'University Campus Center', 'Networking', 100, 3),
('Tech Career Panel', 'Panel discussion with alumni working in top tech companies.', '2024-10-22 14:00:00', 'Engineering Building Auditorium', 'Career', 150, 3);

-- Insert sample connections
INSERT INTO connections (requester_id, receiver_id, status, connection_type) VALUES
(1, 2, 'accepted', 'mentorship'),
(6, 4, 'pending', 'general');
