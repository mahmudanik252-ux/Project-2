    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>StudyFlow - Smart Study Planner & Grade Tracker</title>
    
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        :root {
            --primary-color: #6366f1;
            --secondary-color: #8b5cf6;
            --accent-color: #06d6a0;
            --warning-color: #f59e0b;
            --danger-color: #ef4444;
            --success-color: #10b981;
            --dark-color: #1f2937;
            --light-color: #f8fafc;
            --text-color: #374151;
            --border-color: #e5e7eb;
            --shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
            --shadow-lg: 0 20px 40px rgba(0, 0, 0, 0.15);
        }

        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            line-height: 1.6;
            color: var(--text-color);
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            overflow-x: hidden;
        }

        /* Navigation */
        .navbar {
            position: fixed;
            top: 0;
            width: 100%;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(20px);
            z-index: 1000;
            padding: 1rem 0;
            transition: all 0.3s ease;
            border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        }

        .navbar.scrolled {
            background: rgba(255, 255, 255, 0.98);
            box-shadow: var(--shadow);
        }

        .nav-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .logo {
            font-size: 1.8rem;
            font-weight: 800;
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .nav-links {
            display: flex;
            list-style: none;
            gap: 2rem;
        }

        .nav-links a {
            text-decoration: none;
            color: var(--text-color);
            font-weight: 500;
            padding: 0.5rem 1rem;
            border-radius: 8px;
            transition: all 0.3s ease;
            position: relative;
        }

        .nav-links a:hover,
        .nav-links a.active {
            color: var(--primary-color);
            background: rgba(99, 102, 241, 0.1);
        }

        .mobile-menu {
            display: none;
            flex-direction: column;
            cursor: pointer;
        }

        .mobile-menu span {
            width: 25px;
            height: 3px;
            background: var(--text-color);
            margin: 3px 0;
            transition: 0.3s;
            border-radius: 2px;
        }

        /* Page Container */
        .page {
            display: none;
            min-height: 100vh;
            padding-top: 80px;
            animation: fadeIn 0.6s ease-in-out;
        }

        .page.active {
            display: block;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
        }

        /* Home Page */
        .hero {
            text-align: center;
            padding: 4rem 0;
            color: white;
        }

        .hero h1 {
            font-size: 4rem;
            font-weight: 800;
            margin-bottom: 1rem;
            opacity: 0;
            animation: slideInUp 1s ease 0.2s forwards;
        }

        .hero p {
            font-size: 1.3rem;
            margin-bottom: 2rem;
            opacity: 0;
            animation: slideInUp 1s ease 0.4s forwards;
        }

        .cta-buttons {
            display: flex;
            gap: 1rem;
            justify-content: center;
            flex-wrap: wrap;
            opacity: 0;
            animation: slideInUp 1s ease 0.6s forwards;
        }

        .btn {
            padding: 1rem 2rem;
            border: none;
            border-radius: 12px;
            font-weight: 600;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            cursor: pointer;
            transition: all 0.3s ease;
            font-size: 1rem;
        }

        .btn-primary {
            background: var(--accent-color);
            color: white;
            box-shadow: 0 4px 15px rgba(6, 214, 160, 0.3);
        }

        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(6, 214, 160, 0.4);
        }

        .btn-secondary {
            background: rgba(255, 255, 255, 0.2);
            color: white;
            border: 2px solid rgba(255, 255, 255, 0.3);
        }

        .btn-secondary:hover {
            background: rgba(255, 255, 255, 0.3);
            transform: translateY(-2px);
        }

        /* Features Section */
        .features {
            background: white;
            padding: 4rem 0;
            margin-top: 2rem;
            border-radius: 20px 20px 0 0;
        }

        .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            margin-top: 3rem;
        }

        .feature-card {
            background: white;
            padding: 2rem;
            border-radius: 16px;
            box-shadow: var(--shadow);
            text-align: center;
            transition: all 0.3s ease;
            border: 1px solid var(--border-color);
        }

        .feature-card:hover {
            transform: translateY(-10px);
            box-shadow: var(--shadow-lg);
        }

        .feature-icon {
            width: 80px;
            height: 80px;
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            border-radius: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 1rem;
            font-size: 2rem;
            color: white;
        }

        /* Dashboard Styles */
        .dashboard-header {
            background: white;
            padding: 2rem;
            border-radius: 16px;
            box-shadow: var(--shadow);
            margin-bottom: 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 1rem;
        }

        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1.5rem;
            margin-bottom: 2rem;
        }

        .stat-card {
            background: white;
            padding: 1.5rem;
            border-radius: 12px;
            box-shadow: var(--shadow);
            text-align: center;
            position: relative;
            overflow: hidden;
        }

        .stat-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
        }

        .stat-number {
            font-size: 2.5rem;
            font-weight: 800;
            color: var(--primary-color);
            margin-bottom: 0.5rem;
        }

        .stat-label {
            color: var(--text-color);
            font-weight: 500;
        }

        /* Form Styles */
        .form-container {
            background: white;
            padding: 2rem;
            border-radius: 16px;
            box-shadow: var(--shadow);
            margin-bottom: 2rem;
        }

        .form-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1.5rem;
        }

        .form-group {
            display: flex;
            flex-direction: column;
        }

        .form-group label {
            margin-bottom: 0.5rem;
            font-weight: 600;
            color: var(--text-color);
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
            padding: 0.75rem;
            border: 2px solid var(--border-color);
            border-radius: 8px;
            font-size: 1rem;
            transition: all 0.3s ease;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
            outline: none;
            border-color: var(--primary-color);
            box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
        }

        /* Task/Assignment Cards */
        .cards-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 1.5rem;
        }

        .task-card,
        .assignment-card {
            background: white;
            padding: 1.5rem;
            border-radius: 12px;
            box-shadow: var(--shadow);
            transition: all 0.3s ease;
            border-left: 4px solid var(--primary-color);
            position: relative;
        }

        .task-card:hover,
        .assignment-card:hover {
            transform: translateY(-5px);
            box-shadow: var(--shadow-lg);
        }

        .card-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 1rem;
        }

        .card-title {
            font-size: 1.2rem;
            font-weight: 700;
            color: var(--text-color);
            margin-bottom: 0.5rem;
        }

        .card-meta {
            display: flex;
            gap: 1rem;
            margin-bottom: 1rem;
            flex-wrap: wrap;
        }

        .meta-item {
            display: flex;
            align-items: center;
            gap: 0.3rem;
            font-size: 0.9rem;
            color: var(--text-color);
        }

        .priority-high { border-left-color: var(--danger-color); }
        .priority-medium { border-left-color: var(--warning-color); }
        .priority-low { border-left-color: var(--success-color); }

        .status-badge {
            padding: 0.25rem 0.75rem;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 600;
        }

        .status-pending { background: rgba(245, 158, 11, 0.1); color: var(--warning-color); }
        .status-completed { background: rgba(16, 185, 129, 0.1); color: var(--success-color); }
        .status-overdue { background: rgba(239, 68, 68, 0.1); color: var(--danger-color); }

        /* Grade Cards */
        .grade-card {
            background: white;
            padding: 1.5rem;
            border-radius: 12px;
            box-shadow: var(--shadow);
            margin-bottom: 1rem;
            transition: all 0.3s ease;
        }

        .grade-card:hover {
            transform: translateY(-3px);
            box-shadow: var(--shadow-lg);
        }

        .grade-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1rem;
        }

        .grade-score {
            font-size: 2rem;
            font-weight: 800;
            padding: 0.5rem 1rem;
            border-radius: 8px;
            color: white;
        }

        .grade-a { background: var(--success-color); }
        .grade-b { background: var(--accent-color); }
        .grade-c { background: var(--warning-color); }
        .grade-d { background: var(--danger-color); }

        /* Progress Bars */
        .progress-container {
            background: var(--border-color);
            border-radius: 10px;
            height: 8px;
            overflow: hidden;
            margin: 1rem 0;
        }

        .progress-bar {
            height: 100%;
            background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
            border-radius: 10px;
            transition: width 0.8s ease;
        }

        /* Modal Styles */
        .modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            z-index: 2000;
            backdrop-filter: blur(5px);
        }

        .modal.active {
            display: flex;
            align-items: center;
            justify-content: center;
            animation: fadeIn 0.3s ease;
        }

        .modal-content {
            background: white;
            padding: 2rem;
            border-radius: 16px;
            max-width: 500px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            animation: slideInUp 0.3s ease;
        }

        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.5rem;
        }

        .close-btn {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: var(--text-color);
            padding: 0.5rem;
            border-radius: 50%;
            transition: all 0.3s ease;
        }

        .close-btn:hover {
            background: var(--border-color);
        }

        /* Animations */
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes slideInLeft {
            from {
                opacity: 0;
                transform: translateX(-30px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }

        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }

        .animate-pulse {
            animation: pulse 2s infinite;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
            .nav-links {
                display: none;
                position: absolute;
                top: 100%;
                left: 0;
                width: 100%;
                background: white;
                flex-direction: column;
                padding: 1rem;
                box-shadow: var(--shadow);
                border-radius: 0 0 16px 16px;
            }

            .nav-links.active {
                display: flex;
            }

            .mobile-menu {
                display: flex;
            }

            .hero h1 {
                font-size: 2.5rem;
            }

            .cta-buttons {
                flex-direction: column;
                align-items: center;
            }

            .dashboard-header {
                flex-direction: column;
                text-align: center;
            }

            .form-grid {
                grid-template-columns: 1fr;
            }

            .cards-grid {
                grid-template-columns: 1fr;
            }
        }

        @media (max-width: 480px) {
            .container {
                padding: 1rem;
            }

            .hero h1 {
                font-size: 2rem;
            }

            .hero p {
                font-size: 1.1rem;
            }
        }

        /* Loading Animation */
        .loading {
            display: inline-block;
            width: 20px;
            height: 20px;
            border: 3px solid rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            border-top-color: white;
            animation: spin 1s ease-in-out infinite;
        }

        @keyframes spin {
            to { transform: rotate(360deg); }
        }

        /* Success/Error Messages */
        .message {
            padding: 1rem;
            border-radius: 8px;
            margin: 1rem 0;
            font-weight: 500;
            animation: slideInUp 0.3s ease;
        }

        .message-success {
            background: rgba(16, 185, 129, 0.1);
            color: var(--success-color);
            border: 1px solid rgba(16, 185, 129, 0.2);
        }

        .message-error {
            background: rgba(239, 68, 68, 0.1);
            color: var(--danger-color);
            border: 1px solid rgba(239, 68, 68, 0.2);
        }
    </style>
</head>
<body>
    <!-- Navigation -->
    <nav class="navbar" id="navbar">
        <div class="nav-container">
            <div class="logo">StudyFlow</div>
            <ul class="nav-links" id="navLinks">
                <li><a href="#" onclick="showPage('home')" class="active">Home</a></li>
                <li><a href="#" onclick="showPage('dashboard')">Dashboard</a></li>
                <li><a href="#" onclick="showPage('assignments')">Assignments</a></li>
                <li><a href="#" onclick="showPage('grades')">Grades</a></li>
                <li><a href="#" onclick="showPage('planner')">Planner</a></li>
            </ul>
            <div class="mobile-menu" id="mobileMenu">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    </nav>

    <!-- Home Page -->
    <div id="home" class="page active">
        <div class="hero">
            <div class="container">
                <h1>StudyFlow</h1>
                <p>Your intelligent study companion for academic success</p>
                <div class="cta-buttons">
                    <a href="#" onclick="showPage('dashboard')" class="btn btn-primary">
                        📊 Get Started
                    </a>
                    <a href="#" onclick="showPage('planner')" class="btn btn-secondary">
                        📅 Plan Your Studies
                    </a>
                </div>
            </div>
        </div>
        
        <div class="features">
            <div class="container">
                <h2 style="text-align: center; font-size: 2.5rem; margin-bottom: 1rem; color: var(--text-color);">
                    Everything You Need to Excel
                </h2>
                <div class="features-grid">
                    <div class="feature-card">
                        <div class="feature-icon">📚</div>
                        <h3>Smart Planning</h3>
                        <p>Organize your study schedule with intelligent task prioritization and deadline management.</p>
                    </div>
                    <div class="feature-card">
                        <div class="feature-icon">📊</div>
                        <h3>Grade Tracking</h3>
                        <p>Monitor your academic progress with detailed grade analytics and GPA calculations.</p>
                    </div>
                    <div class="feature-card">
                        <div class="feature-icon">⏰</div>
                        <h3>Time Management</h3>
                        <p>Stay on top of deadlines with smart reminders and progress tracking.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Dashboard Page -->
    <div id="dashboard" class="page">
        <div class="container">
            <div class="dashboard-header">
                <div>
                    <h1>Dashboard</h1>
                    <p>Welcome back! Here's your academic overview.</p>
                </div>
                <button class="btn btn-primary" onclick="openModal('quickAddModal')">
                    ➕ Quick Add
                </button>
            </div>

            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-number" id="totalAssignments">12</div>
                    <div class="stat-label">Total Assignments</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number" id="completedTasks">8</div>
                    <div class="stat-label">Completed Tasks</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number" id="currentGPA">3.7</div>
                    <div class="stat-label">Current GPA</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number" id="upcomingDeadlines">4</div>
                    <div class="stat-label">Upcoming Deadlines</div>
                </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-top: 2rem;">
                <div class="form-container">
                    <h3 style="margin-bottom: 1rem;">Recent Activity</h3>
                    <div id="recentActivity">
                        <div style="padding: 1rem 0; border-bottom: 1px solid var(--border-color);">
                            <strong>Mathematics Assignment</strong> completed
                            <div style="font-size: 0.9rem; color: #666;">2 hours ago</div>
                        </div>
                        <div style="padding: 1rem 0; border-bottom: 1px solid var(--border-color);">
                            <strong>Physics Quiz</strong> grade received: A-
                            <div style="font-size: 0.9rem; color: #666;">1 day ago</div>
                        </div>
                        <div style="padding: 1rem 0;">
                            <strong>Chemistry Lab Report</strong> due tomorrow
                            <div style="font-size: 0.9rem; color: #666;">3 days ago</div>
                        </div>
                    </div>
                </div>

                <div class="form-container">
                    <h3 style="margin-bottom: 1rem;">Progress Overview</h3>
                    <div>
                        <div style="margin-bottom: 1rem;">
                            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                                <span>Weekly Goals</span>
                                <span>75%</span>
                            </div>
                            <div class="progress-container">
                                <div class="progress-bar" style="width: 75%;"></div>
                            </div>
                        </div>
                        <div style="margin-bottom: 1rem;">
                            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                                <span>Assignment Completion</span>
                                <span>67%</span>
                            </div>
                            <div class="progress-container">
                                <div class="progress-bar" style="width: 67%;"></div>
                            </div>
                        </div>
                        <div>
                            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                                <span>Study Time This Week</span>
                                <span>85%</span>
                            </div>
                            <div class="progress-container">
                                <div class="progress-bar" style="width: 85%;"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Assignments Page -->
    <div id="assignments" class="page">
        <div class="container">
            <div class="dashboard-header">
                <div>
                    <h1>Assignments</h1>
                    <p>Manage your assignments and track progress</p>
                </div>
                <button class="btn btn-primary" onclick="openModal('assignmentModal')">
                    ➕ Add Assignment
                </button>
            </div>

            <div class="cards-grid" id="assignmentsList">
                <div class="assignment-card priority-high">
                    <div class="card-header">
                        <div>
                            <div class="card-title">Advanced Calculus Problem Set</div>
                            <div class="card-meta">
                                <div class="meta-item">📚 Mathematics</div>
                                <div class="meta-item">📅 Due: Dec 15, 2024</div>
                                <div class="meta-item">⚡ High Priority</div>
                            </div>
                        </div>
                        <span class="status-badge status-pending">Pending</span>
                    </div>
                    <p>Complete problems 1-20 from Chapter 8. Focus on integration techniques and applications.</p>
                    <div class="progress-container">
                        <div class="progress-bar" style="width: 30%;"></div>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1rem;">
                        <span style="font-size: 0.9rem; color: #666;">Progress: 30%</span>
                        <div>
                            <button class="btn" style="padding: 0.5rem 1rem; margin-right: 0.5rem; background: var(--success-color); color: white;" onclick="markComplete(this)">Complete</button>
                            <button class="btn" style="padding: 0.5rem 1rem; background: var(--border-color); color: var(--text-color);" onclick="editAssignment(this)">Edit</button>
                        </div>
                    </div>
                </div>

                <div class="assignment-card priority-medium">
                    <div class="card-header">
                        <div>
                            <div class="card-title">Chemistry Lab Report</div>
                            <div class="card-meta">
                                <div class="meta-item">🧪 Chemistry</div>
                                <div class="meta-item">📅 Due: Dec 18, 2024</div>
                                <div class="meta-item">⚡ Medium Priority</div>
                            </div>
                        </div>
                        <span class="status-badge status-pending">Pending</span>
                    </div>
                    <p>Write a comprehensive lab report on the organic synthesis experiment conducted last week.</p>
                    <div class="progress-container">
                        <div class="progress-bar" style="width: 60%;"></div>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1rem;">
                        <span style="font-size: 0.9rem; color: #666;">Progress: 60%</span>
                        <div>
                            <button class="btn" style="padding: 0.5rem 1rem; margin-right: 0.5rem; background: var(--success-color); color: white;" onclick="markComplete(this)">Complete</button>
                            <button class="btn" style="padding: 0.5rem 1rem; background: var(--border-color); color: var(--text-color);" onclick="editAssignment(this)">Edit</button>
                        </div>
                    </div>
                </div>

                <div class="assignment-card priority-low">
                    <div class="card-header">
                        <div>
                            <div class="card-title">History Essay</div>
                            <div class="card-meta">
                                <div class="meta-item">📜 History</div>
                                <div class="meta-item">📅 Due: Dec 22, 2024</div>
                                <div class="meta-item">⚡ Low Priority</div>
                            </div>
                        </div>
                        <span class="status-badge status-completed">Completed</span>
                    </div>
                    <p>5-page essay on the causes and effects of World War I. Include at least 5 scholarly sources.</p>
                    <div class="progress-container">
                        <div class="progress-bar" style="width: 100%;"></div>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1rem;">
                        <span style="font-size: 0.9rem; color: var(--success-color);">✅ Completed</span>
                        <div>
                            <button class="btn" style="padding: 0.5rem 1rem; background: var(--border-color); color: var(--text-color);" onclick="editAssignment(this)">Edit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Grades Page -->
    <div id="grades" class="page">
        <div class="container">
            <div class="dashboard-header">
                <div>
                    <h1>Grades</h1>
                    <p>Track your academic performance</p>
                </div>
                <button class="btn btn-primary" onclick="openModal('gradeModal')">
                    ➕ Add Grade
                </button>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 300px; gap: 2rem;">
                <div>
                    <div id="gradesList">
                        <div class="grade-card">
                            <div class="grade-header">
                                <div>
                                    <h3>Advanced Calculus Midterm</h3>
                                    <div style="color: #666; margin-top: 0.5rem;">Mathematics • Nov 28, 2024</div>
                                </div>
                                <div class="grade-score grade-a">A</div>
                            </div>
                            <div style="display: flex; justify-content: space-between; margin-bottom: 1rem;">
                                <span>Score: 92/100</span>
                                <span>Weight: 25%</span>
                            </div>
                            <div class="progress-container">
                                <div class="progress-bar" style="width: 92%;"></div>
                            </div>
                        </div>

                        <div class="grade-card">
                            <div class="grade-header">
                                <div>
                                    <h3>Organic Chemistry Quiz</h3>
                                    <div style="color: #666; margin-top: 0.5rem;">Chemistry • Dec 1, 2024</div>
                                </div>
                                <div class="grade-score grade-b">B+</div>
                            </div>
                            <div style="display: flex; justify-content: space-between; margin-bottom: 1rem;">
                                <span>Score: 87/100</span>
                                <span>Weight: 15%</span>
                            </div>
                            <div class="progress-container">
                                <div class="progress-bar" style="width: 87%;"></div>
                            </div>
                        </div>

                        <div class="grade-card">
                            <div class="grade-header">
                                <div>
                                    <h3>World War I Essay</h3>
                                    <div style="color: #666; margin-top: 0.5rem;">History • Nov 25, 2024</div>
                                </div>
                                <div class="grade-score grade-a">A-</div>
                            </div>
                            <div style="display: flex; justify-content: space-between; margin-bottom: 1rem;">
                                <span>Score: 89/100</span>
                                <span>Weight: 20%</span>
                            </div>
                            <div class="progress-container">
                                <div class="progress-bar" style="width: 89%;"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <div class="form-container">
                        <h3 style="margin-bottom: 1rem;">GPA Overview</h3>
                        <div style="text-align: center; margin-bottom: 2rem;">
                            <div style="font-size: 3rem; font-weight: 800; color: var(--primary-color);">3.7</div>
                            <div style="color: #666;">Current GPA</div>
                        </div>
                        
                        <div style="margin-bottom: 1rem;">
                            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                                <span>Mathematics</span>
                                <span style="font-weight: 600;">3.8</span>
                            </div>
                            <div class="progress-container">
                                <div class="progress-bar" style="width: 95%;"></div>
                            </div>
                        </div>

                        <div style="margin-bottom: 1rem;">
                            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                                <span>Chemistry</span>
                                <span style="font-weight: 600;">3.5</span>
                            </div>
                            <div class="progress-container">
                                <div class="progress-bar" style="width: 87.5%;"></div>
                            </div>
                        </div>

                        <div>
                            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                                <span>History</span>
                                <span style="font-weight: 600;">3.9</span>
                            </div>
                            <div class="progress-container">
                                <div class="progress-bar" style="width: 97.5%;"></div>
                            </div>
                        </div>
                    </div>

                    <div class="form-container" style="margin-top: 1rem;">
                        <h3 style="margin-bottom: 1rem;">Grade Distribution</h3>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                            <span>A grades</span>
                            <span>45%</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                            <span>B grades</span>
                            <span>35%</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                            <span>C grades</span>
                            <span>15%</span>
                        </div>
                        <div style="display: flex; justify-content: space-between;">
                            <span>D grades</span>
                            <span>5%</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Planner Page -->
    <div id="planner" class="page">
        <div class="container">
            <div class="dashboard-header">
                <div>
                    <h1>Study Planner</h1>
                    <p>Plan your study sessions and track your time</p>
                </div>
                <button class="btn btn-primary" onclick="openModal('taskModal')">
                    ➕ Add Task
                </button>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 300px; gap: 2rem;">
                <div>
                    <div class="form-container">
                        <h3 style="margin-bottom: 1rem;">Today's Schedule</h3>
                        <div id="todaySchedule">
                            <div style="display: flex; align-items: center; padding: 1rem 0; border-bottom: 1px solid var(--border-color);">
                                <div style="width: 80px; font-weight: 600; color: var(--primary-color);">9:00 AM</div>
                                <div style="flex: 1;">
                                    <div style="font-weight: 600;">Calculus Study Session</div>
                                    <div style="font-size: 0.9rem; color: #666;">Review integration techniques</div>
                                </div>
                                <button class="btn" style="padding: 0.25rem 0.75rem; background: var(--success-color); color: white; font-size: 0.8rem;">Start</button>
                            </div>
                            <div style="display: flex; align-items: center; padding: 1rem 0; border-bottom: 1px solid var(--border-color);">
                                <div style="width: 80px; font-weight: 600; color: var(--primary-color);">11:00 AM</div>
                                <div style="flex: 1;">
                                    <div style="font-weight: 600;">Chemistry Lab Prep</div>
                                    <div style="font-size: 0.9rem; color: #666;">Prepare for tomorrow's experiment</div>
                                </div>
                                <button class="btn" style="padding: 0.25rem 0.75rem; background: var(--success-color); color: white; font-size: 0.8rem;">Start</button>
                            </div>
                            <div style="display: flex; align-items: center; padding: 1rem 0;">
                                <div style="width: 80px; font-weight: 600; color: var(--primary-color);">2:00 PM</div>
                                <div style="flex: 1;">
                                    <div style="font-weight: 600;">History Research</div>
                                    <div style="font-size: 0.9rem; color: #666;">Find sources for upcoming essay</div>
                                </div>
                                <button class="btn" style="padding: 0.25rem 0.75rem; background: var(--success-color); color: white; font-size: 0.8rem;">Start</button>
                            </div>
                        </div>
                    </div>

                    <div class="cards-grid" style="margin-top: 2rem;">
                        <div class="task-card priority-high">
                            <div class="card-header">
                                <div>
                                    <div class="card-title">Complete Calculus Assignment</div>
                                    <div class="card-meta">
                                        <div class="meta-item">⏰ 2 hours</div>
                                        <div class="meta-item">📅 Today</div>
                                    </div>
                                </div>
                                <span class="status-badge status-pending">Pending</span>
                            </div>
                            <p>Work on problems 15-25, focusing on advanced integration techniques.</p>
                            <div style="margin-top: 1rem;">
                                <button class="btn" style="padding: 0.5rem 1rem; background: var(--success-color); color: white; margin-right: 0.5rem;" onclick="startTimer(this)">⏱️ Start Timer</button>
                                <button class="btn" style="padding: 0.5rem 1rem; background: var(--border-color); color: var(--text-color);" onclick="markComplete(this)">✅ Complete</button>
                            </div>
                        </div>

                        <div class="task-card priority-medium">
                            <div class="card-header">
                                <div>
                                    <div class="card-title">Review Chemistry Notes</div>
                                    <div class="card-meta">
                                        <div class="meta-item">⏰ 1 hour</div>
                                        <div class="meta-item">📅 Tomorrow</div>
                                    </div>
                                </div>
                                <span class="status-badge status-pending">Pending</span>
                            </div>
                            <p>Go through organic chemistry notes from last week's lectures.</p>
                            <div style="margin-top: 1rem;">
                                <button class="btn" style="padding: 0.5rem 1rem; background: var(--success-color); color: white; margin-right: 0.5rem;" onclick="startTimer(this)">⏱️ Start Timer</button>
                                <button class="btn" style="padding: 0.5rem 1rem; background: var(--border-color); color: var(--text-color);" onclick="markComplete(this)">✅ Complete</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <div class="form-container">
                        <h3 style="margin-bottom: 1rem;">Study Timer</h3>
                        <div style="text-align: center; margin-bottom: 2rem;">
                            <div id="timerDisplay" style="font-size: 2.5rem; font-weight: 800; color: var(--primary-color); margin-bottom: 1rem;">25:00</div>
                            <div style="display: flex; gap: 0.5rem; justify-content: center;">
                                <button id="startBtn" class="btn btn-primary" style="padding: 0.5rem 1rem;" onclick="startPomodoro()">Start</button>
                                <button id="pauseBtn" class="btn" style="padding: 0.5rem 1rem; background: var(--warning-color); color: white;" onclick="pausePomodoro()">Pause</button>
                                <button id="resetBtn" class="btn" style="padding: 0.5rem 1rem; background: var(--border-color); color: var(--text-color);" onclick="resetPomodoro()">Reset</button>
                            </div>
                        </div>
                        <div style="text-align: center; color: #666;">
                            <div>Pomodoro Technique</div>
                            <div style="font-size: 0.9rem;">25 min work, 5 min break</div>
                        </div>
                    </div>

                    <div class="form-container" style="margin-top: 1rem;">
                        <h3 style="margin-bottom: 1rem;">This Week</h3>
                        <div style="margin-bottom: 1rem;">
                            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                                <span>Study Hours</span>
                                <span>28/35</span>
                            </div>
                            <div class="progress-container">
                                <div class="progress-bar" style="width: 80%;"></div>
                            </div>
                        </div>
                        <div style="margin-bottom: 1rem;">
                            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                                <span>Tasks Completed</span>
                                <span>12/15</span>
                            </div>
                            <div class="progress-container">
                                <div class="progress-bar" style="width: 80%;"></div>
                            </div>
                        </div>
                        <div>
                            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                                <span>Goals Achieved</span>
                                <span>3/4</span>
                            </div>
                            <div class="progress-container">
                                <div class="progress-bar" style="width: 75%;"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modals -->
    <div id="quickAddModal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h3>Quick Add</h3>
                <button class="close-btn" onclick="closeModal('quickAddModal')">&times;</button>
            </div>
            <form id="quickAddForm">
                <div class="form-group">
                    <label for="quickType">Type</label>
                    <select id="quickType" required>
                        <option value="">Select type...</option>
                        <option value="assignment">Assignment</option>
                        <option value="task">Task</option>
                        <option value="grade">Grade</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="quickTitle">Title</label>
                    <input type="text" id="quickTitle" required>
                </div>
                <div class="form-group">
                    <label for="quickSubject">Subject</label>
                    <input type="text" id="quickSubject" required>
                </div>
                <div class="form-group">
                    <label for="quickDue">Due Date</label>
                    <input type="date" id="quickDue">
                </div>
                <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 1rem;">Add Item</button>
            </form>
        </div>
    </div>

    <div id="assignmentModal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h3>Add Assignment</h3>
                <button class="close-btn" onclick="closeModal('assignmentModal')">&times;</button>
            </div>
            <form id="assignmentForm">
                <div class="form-grid">
                    <div class="form-group">
                        <label for="assignmentTitle">Title</label>
                        <input type="text" id="assignmentTitle" required>
                    </div>
                    <div class="form-group">
                        <label for="assignmentSubject">Subject</label>
                        <input type="text" id="assignmentSubject" required>
                    </div>
                    <div class="form-group">
                        <label for="assignmentDue">Due Date</label>
                        <input type="date" id="assignmentDue" required>
                    </div>
                    <div class="form-group">
                        <label for="assignmentPriority">Priority</label>
                        <select id="assignmentPriority" required>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label for="assignmentDescription">Description</label>
                    <textarea id="assignmentDescription" rows="3"></textarea>
                </div>
                <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 1rem;">Add Assignment</button>
            </form>
        </div>
    </div>

    <div id="gradeModal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h3>Add Grade</h3>
                <button class="close-btn" onclick="closeModal('gradeModal')">&times;</button>
            </div>
            <form id="gradeForm">
                <div class="form-grid">
                    <div class="form-group">
                        <label for="gradeTitle">Assignment/Test</label>
                        <input type="text" id="gradeTitle" required>
                    </div>
                    <div class="form-group">
                        <label for="gradeSubject">Subject</label>
                        <input type="text" id="gradeSubject" required>
                    </div>
                    <div class="form-group">
                        <label for="gradeScore">Score</label>
                        <input type="number" id="gradeScore" min="0" max="100" required>
                    </div>
                    <div class="form-group">
                        <label for="gradeTotal">Total Points</label>
                        <input type="number" id="gradeTotal" min="1" value="100" required>
                    </div>
                    <div class="form-group">
                        <label for="gradeWeight">Weight (%)</label>
                        <input type="number" id="gradeWeight" min="1" max="100" value="10" required>
                    </div>
                    <div class="form-group">
                        <label for="gradeDate">Date</label>
                        <input type="date" id="gradeDate" required>
                    </div>
                </div>
                <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 1rem;">Add Grade</button>
            </form>
        </div>
    </div>

    <div id="taskModal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h3>Add Task</h3>
                <button class="close-btn" onclick="closeModal('taskModal')">&times;</button>
            </div>
            <form id="taskForm">
                <div class="form-grid">
                    <div class="form-group">
                        <label for="taskTitle">Title</label>
                        <input type="text" id="taskTitle" required>
                    </div>
                    <div class="form-group">
                        <label for="taskDuration">Duration (minutes)</label>
                        <input type="number" id="taskDuration" min="5" value="25" required>
                    </div>
                    <div class="form-group">
                        <label for="taskPriority">Priority</label>
                        <select id="taskPriority" required>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="taskDate">Date</label>
                        <input type="date" id="taskDate" required>
                    </div>
                </div>
                <div class="form-group">
                    <label for="taskDescription">Description</label>
                    <textarea id="taskDescription" rows="3"></textarea>
                </div>
                <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 1rem;">Add Task</button>
            </form>
        </div>
    </div>

    <script>
        // Global variables
        let currentPage = 'home';
        let pomodoroTimer = null;
        let pomodoroTime = 25 * 60; // 25 minutes in seconds
        let isTimerRunning = false;

        // Navigation functionality
        function showPage(pageId) {
            // Hide all pages
            document.querySelectorAll('.page').forEach(page => {
                page.classList.remove('active');
            });
            
            // Show selected page
            document.getElementById(pageId).classList.add('active');
            
            // Update navigation
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
            });
            event.target.classList.add('active');
            
            currentPage = pageId;
            
            // Close mobile menu
            document.getElementById('navLinks').classList.remove('active');
        }

        // Mobile menu toggle
        document.getElementById('mobileMenu').addEventListener('click', function() {
            document.getElementById('navLinks').classList.toggle('active');
        });

        // Navbar scroll effect
        window.addEventListener('scroll', function() {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Modal functions
        function openModal(modalId) {
            document.getElementById(modalId).classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeModal(modalId) {
            document.getElementById(modalId).classList.remove('active');
            document.body.style.overflow = 'auto';
        }

        // Close modal when clicking outside
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    closeModal(modal.id);
                }
            });
        });

        // Assignment functions
        function markComplete(button) {
            const card = button.closest('.assignment-card, .task-card');
            const statusBadge = card.querySelector('.status-badge');
            const progressBar = card.querySelector('.progress-bar');
            
            statusBadge.textContent = 'Completed';
            statusBadge.className = 'status-badge status-completed';
            progressBar.style.width = '100%';
            
            button.textContent = '✅ Completed';
            button.disabled = true;
            button.style.opacity = '0.6';
            
            showMessage('Task marked as completed!', 'success');
            updateStats();
        }

        function editAssignment(button) {
            showMessage('Edit functionality would open assignment details for editing.', 'success');
        }

        // Timer functions
        function startTimer(button) {
            const card = button.closest('.task-card');
            const title = card.querySelector('.card-title').textContent;
            
            button.innerHTML = '<div class="loading"></div> Running...';
            button.disabled = true;
            
            showMessage(`Timer started for: ${title}`, 'success');
            
            setTimeout(() => {
                button.innerHTML = '⏹️ Stop Timer';
                button.disabled = false;
                button.onclick = () => stopTimer(button);
            }, 1000);
        }

        function stopTimer(button) {
            button.innerHTML = '⏱️ Start Timer';
            button.onclick = () => startTimer(button);
            showMessage('Timer stopped. Great work!', 'success');
        }

        // Pomodoro timer functions
        function startPomodoro() {
            if (!isTimerRunning) {
                isTimerRunning = true;
                pomodoroTimer = setInterval(updatePomodoroDisplay, 1000);
                document.getElementById('startBtn').textContent = 'Running...';
                document.getElementById('startBtn').disabled = true;
            }
        }

        function pausePomodoro() {
            if (isTimerRunning) {
                isTimerRunning = false;
                clearInterval(pomodoroTimer);
                document.getElementById('startBtn').textContent = 'Resume';
                document.getElementById('startBtn').disabled = false;
            }
        }

        function resetPomodoro() {
            isTimerRunning = false;
            clearInterval(pomodoroTimer);
            pomodoroTime = 25 * 60;
            updatePomodoroDisplay();
            document.getElementById('startBtn').textContent = 'Start';
            document.getElementById('startBtn').disabled = false;
        }

        function updatePomodoroDisplay() {
            const minutes = Math.floor(pomodoroTime / 60);
            const seconds = pomodoroTime % 60;
            document.getElementById('timerDisplay').textContent = 
                `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            
            if (pomodoroTime > 0) {
                pomodoroTime--;
            } else {
                // Timer finished
                isTimerRunning = false;
                clearInterval(pomodoroTimer);
                showMessage('Pomodoro session completed! Take a 5-minute break.', 'success');
                document.getElementById('startBtn').textContent = 'Start';
                document.getElementById('startBtn').disabled = false;
                pomodoroTime = 25 * 60;
            }
        }

        // Form submissions
        document.getElementById('quickAddForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const type = document.getElementById('quickType').value;
            const title = document.getElementById('quickTitle').value;
            
            showMessage(`${type.charAt(0).toUpperCase() + type.slice(1)} "${title}" added successfully!`, 'success');
            closeModal('quickAddModal');
            this.reset();
            updateStats();
        });

        document.getElementById('assignmentForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const title = document.getElementById('assignmentTitle').value;
            
            showMessage(`Assignment "${title}" added successfully!`, 'success');
            closeModal('assignmentModal');
            this.reset();
            updateStats();
        });

        document.getElementById('gradeForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const title = document.getElementById('gradeTitle').value;
            const score = document.getElementById('gradeScore').value;
            
            showMessage(`Grade for "${title}" (${score}%) added successfully!`, 'success');
            closeModal('gradeModal');
            this.reset();
            updateStats();
        });

        document.getElementById('taskForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const title = document.getElementById('taskTitle').value;
            
            showMessage(`Task "${title}" added successfully!`, 'success');
            closeModal('taskModal');
            this.reset();
            updateStats();
        });

        // Utility functions
        function showMessage(text, type) {
            const message = document.createElement('div');
            message.className = `message message-${type}`;
            message.textContent = text;
            
            document.body.appendChild(message);
            
            setTimeout(() => {
                message.remove();
            }, 3000);
        }

        function updateStats() {
            // Simulate updating dashboard stats
            const stats = {
                totalAssignments: Math.floor(Math.random() * 5) + 10,
                completedTasks: Math.floor(Math.random() * 3) + 8,
                currentGPA: (Math.random() * 0.5 + 3.5).toFixed(1),
                upcomingDeadlines: Math.floor(Math.random() * 3) + 3
            };
            
            Object.keys(stats).forEach(key => {
                const element = document.getElementById(key);
                if (element) {
                    element.textContent = stats[key];
                }
            });
        }

        // Initialize the application
        document.addEventListener('DOMContentLoaded', function() {
            // Set default dates for forms
            const today = new Date().toISOString().split('T')[0];
            document.querySelectorAll('input[type="date"]').forEach(input => {
                if (!input.value) {
                    input.value = today;
                }
            });
            
            // Initialize pomodoro display
            updatePomodoroDisplay();
            
            // Add some initial animations
            setTimeout(() => {
                document.querySelectorAll('.stat-card').forEach((card, index) => {
                    setTimeout(() => {
                        card.style.animation = 'slideInUp 0.6s ease forwards';
                    }, index * 100);
                });
            }, 500);
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', function(e) {
            if (e.ctrlKey || e.metaKey) {
                switch(e.key) {
                    case '1':
                        e.preventDefault();
                        showPage('home');
                        break;
                    case '2':
                        e.preventDefault();
                        showPage('dashboard');
                        break;
                    case '3':
                        e.preventDefault();
                        showPage('assignments');
                        break;
                    case '4':
                        e.preventDefault();
                        showPage('grades');
                        break;
                    case '5':
                        e.preventDefault();
                        showPage('planner');
                        break;
                }
            }
            
            // Escape to close modals
            if (e.key === 'Escape') {
                document.querySelectorAll('.modal.active').forEach(modal => {
                    closeModal(modal.id);
                });
            }
        });
    </script>
<script>(function(){function c(){var b=a.contentDocument||a.contentWindow.document;if(b){var d=b.createElement('script');d.innerHTML="window.__CF$cv$params={r:'977c0f74926bba5c',t:'MTc1NjYzODQwNi4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";b.getElementsByTagName('head')[0].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibility='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystatechange||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyState&&(document.onreadystatechange=e,c())}}}})();</script></body>
</html>// Global variables
        let currentPage = 'home';
        let pomodoroTimer = null;
        let pomodoroTime = 25 * 60; // 25 minutes in seconds
        let isTimerRunning = false;

        // Navigation functionality
        function showPage(pageId) {
            // Hide all pages
            document.querySelectorAll('.page').forEach(page => {
                page.classList.remove('active');
            });
            
            // Show selected page
            document.getElementById(pageId).classList.add('active');
            
            // Update navigation
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
            });
            event.target.classList.add('active');
            
            currentPage = pageId;
            
            // Close mobile menu
            document.getElementById('navLinks').classList.remove('active');
        }

        // Mobile menu toggle
        document.getElementById('mobileMenu').addEventListener('click', function() {
            document.getElementById('navLinks').classList.toggle('active');
        });

        // Navbar scroll effect
        window.addEventListener('scroll', function() {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Modal functions
        function openModal(modalId) {
            document.getElementById(modalId).classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeModal(modalId) {
            document.getElementById(modalId).classList.remove('active');
            document.body.style.overflow = 'auto';
        }

        // Close modal when clicking outside
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    closeModal(modal.id);
                }
            });
        });

        // Assignment functions
        function markComplete(button) {
            const card = button.closest('.assignment-card, .task-card');
            const statusBadge = card.querySelector('.status-badge');
            const progressBar = card.querySelector('.progress-bar');
            
            statusBadge.textContent = 'Completed';
            statusBadge.className = 'status-badge status-completed';
            progressBar.style.width = '100%';
            
            button.textContent = '✅ Completed';
            button.disabled = true;
            button.style.opacity = '0.6';
            
            showMessage('Task marked as completed!', 'success');
            updateStats();
        }

        function editAssignment(button) {
            showMessage('Edit functionality would open assignment details for editing.', 'success');
        }

        // Timer functions
        function startTimer(button) {
            const card = button.closest('.task-card');
            const title = card.querySelector('.card-title').textContent;
            
            button.innerHTML = '<div class="loading"></div> Running...';
            button.disabled = true;
            
            showMessage(`Timer started for: ${title}`, 'success');
            
            setTimeout(() => {
                button.innerHTML = '⏹️ Stop Timer';
                button.disabled = false;
                button.onclick = () => stopTimer(button);
            }, 1000);
        }

        function stopTimer(button) {
            button.innerHTML = '⏱️ Start Timer';
            button.onclick = () => startTimer(button);
            showMessage('Timer stopped. Great work!', 'success');
        }

        // Pomodoro timer functions
        function startPomodoro() {
            if (!isTimerRunning) {
                isTimerRunning = true;
                pomodoroTimer = setInterval(updatePomodoroDisplay, 1000);
                document.getElementById('startBtn').textContent = 'Running...';
                document.getElementById('startBtn').disabled = true;
            }
        }

        function pausePomodoro() {
            if (isTimerRunning) {
                isTimerRunning = false;
                clearInterval(pomodoroTimer);
                document.getElementById('startBtn').textContent = 'Resume';
                document.getElementById('startBtn').disabled = false;
            }
        }

        function resetPomodoro() {
            isTimerRunning = false;
            clearInterval(pomodoroTimer);
            pomodoroTime = 25 * 60;
            updatePomodoroDisplay();
            document.getElementById('startBtn').textContent = 'Start';
            document.getElementById('startBtn').disabled = false;
        }

        function updatePomodoroDisplay() {
            const minutes = Math.floor(pomodoroTime / 60);
            const seconds = pomodoroTime % 60;
            document.getElementById('timerDisplay').textContent = 
                `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            
            if (pomodoroTime > 0) {
                pomodoroTime--;
            } else {
                // Timer finished
                isTimerRunning = false;
                clearInterval(pomodoroTimer);
                showMessage('Pomodoro session completed! Take a 5-minute break.', 'success');
                document.getElementById('startBtn').textContent = 'Start';
                document.getElementById('startBtn').disabled = false;
                pomodoroTime = 25 * 60;
            }
        }

        // Form submissions
        document.getElementById('quickAddForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const type = document.getElementById('quickType').value;
            const title = document.getElementById('quickTitle').value;
            
            showMessage(`${type.charAt(0).toUpperCase() + type.slice(1)} "${title}" added successfully!`, 'success');
            closeModal('quickAddModal');
            this.reset();
            updateStats();
        });

        document.getElementById('assignmentForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const title = document.getElementById('assignmentTitle').value;
            
            showMessage(`Assignment "${title}" added successfully!`, 'success');
            closeModal('assignmentModal');
            this.reset();
            updateStats();
        });

        document.getElementById('gradeForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const title = document.getElementById('gradeTitle').value;
            const score = document.getElementById('gradeScore').value;
            
            showMessage(`Grade for "${title}" (${score}%) added successfully!`, 'success');
            closeModal('gradeModal');
            this.reset();
            updateStats();
        });

        document.getElementById('taskForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const title = document.getElementById('taskTitle').value;
            
            showMessage(`Task "${title}" added successfully!`, 'success');
            closeModal('taskModal');
            this.reset();
            updateStats();
        });

        // Utility functions
        function showMessage(text, type) {
            const message = document.createElement('div');
            message.className = `message message-${type}`;
            message.textContent = text;
            
            document.body.appendChild(message);
            
            setTimeout(() => {
                message.remove();
            }, 3000);
        }

        function updateStats() {
            // Simulate updating dashboard stats
            const stats = {
                totalAssignments: Math.floor(Math.random() * 5) + 10,
                completedTasks: Math.floor(Math.random() * 3) + 8,
                currentGPA: (Math.random() * 0.5 + 3.5).toFixed(1),
                upcomingDeadlines: Math.floor(Math.random() * 3) + 3
            };
            
            Object.keys(stats).forEach(key => {
                const element = document.getElementById(key);
                if (element) {
                    element.textContent = stats[key];
                }
            });
        }

        // Initialize the application
        document.addEventListener('DOMContentLoaded', function() {
            // Set default dates for forms
            const today = new Date().toISOString().split('T')[0];
            document.querySelectorAll('input[type="date"]').forEach(input => {
                if (!input.value) {
                    input.value = today;
                }
            });
            
            // Initialize pomodoro display
            updatePomodoroDisplay();
            
            // Add some initial animations
            setTimeout(() => {
                document.querySelectorAll('.stat-card').forEach((card, index) => {
                    setTimeout(() => {
                        card.style.animation = 'slideInUp 0.6s ease forwards';
                    }, index * 100);
                });
            }, 500);
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', function(e) {
            if (e.ctrlKey || e.metaKey) {
                switch(e.key) {
                    case '1':
                        e.preventDefault();
                        showPage('home');
                        break;
                    case '2':
                        e.preventDefault();
                        showPage('dashboard');
                        break;
                    case '3':
                        e.preventDefault();
                        showPage('assignments');
                        break;
                    case '4':
                        e.preventDefault();
                        showPage('grades');
                        break;
                    case '5':
                        e.preventDefault();
                        showPage('planner');
                        break;
                }
            }
            
            // Escape to close modals
            if (e.key === 'Escape') {
                document.querySelectorAll('.modal.active').forEach(modal => {
                    closeModal(modal.id);
                });
            }
        });
    

(function(){function c(){var b=a.contentDocument||a.contentWindow.document;if(b){var d=b.createElement('script');d.innerHTML="window.__CF$cv$params={r:'977c0f74926bba5c',t:'MTc1NjYzODQwNi4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";b.getElementsByTagName('head')[0].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibility='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystatechange||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyState&&(document.onreadystatechange=e,c())}}}})();