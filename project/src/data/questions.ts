import { Step } from '../types/questionnaire';

export const steps: Step[] = [
  {
    id: 'personal-info',
    title: 'Personal Information',
    questions: [
      {
        id: 'name',
        type: 'text',
        text: 'What is your full name?',
        required: true,
      },
      {
        id: 'age',
        type: 'number',
        text: 'What is your age?',
        required: true,
      },
    ],
  },
  {
    id: 'education',
    title: 'Education',
    questions: [
      {
        id: 'student-status',
        type: 'multiple-choice',
        text: 'Are you currently a student?',
        required: true,
        options: [
          { id: 'yes', label: 'Yes, full-time', value: 'full-time' },
          { id: 'part-time', label: 'Yes, part-time', value: 'part-time' },
          { id: 'no', label: 'No', value: 'no' },
        ],
        nextQuestions: {
          'full-time': ['study-field'],
          'part-time': ['study-field', 'work-status'],
          'no': ['highest-education'],
        },
      },
      {
        id: 'study-field',
        type: 'multiple-choice',
        text: 'What field are you studying?',
        required: true,
        options: [
          { id: 'cs', label: 'Computer Science', value: 'cs' },
          { id: 'engineering', label: 'Engineering', value: 'engineering' },
          { id: 'business', label: 'Business', value: 'business' },
          { id: 'other', label: 'Other', value: 'other' },
        ],
        nextQuestions: {
          'cs': ['programming-experience'],
          'engineering': ['engineering-type'],
          'business': ['business-focus'],
          'other': ['career-goals'],
        },
      },
      {
        id: 'highest-education',
        type: 'multiple-choice',
        text: 'What is your highest level of education?',
        required: true,
        options: [
          { id: 'high-school', label: 'High School', value: 'high-school' },
          { id: 'bachelors', label: 'Bachelor\'s Degree', value: 'bachelors' },
          { id: 'masters', label: 'Master\'s Degree', value: 'masters' },
          { id: 'phd', label: 'PhD', value: 'phd' },
        ],
      },
    ],
  },
  {
    id: 'experience',
    title: 'Professional Experience',
    questions: [
      {
        id: 'programming-experience',
        type: 'multiple-choice',
        text: 'How much programming experience do you have?',
        required: true,
        options: [
          { id: 'beginner', label: 'Beginner (0-1 years)', value: 'beginner' },
          { id: 'intermediate', label: 'Intermediate (1-3 years)', value: 'intermediate' },
          { id: 'advanced', label: 'Advanced (3+ years)', value: 'advanced' },
        ],
        nextQuestions: {
          'beginner': ['preferred-language'],
          'intermediate': ['tech-stack'],
          'advanced': ['specialization'],
        },
      },
      {
        id: 'engineering-type',
        type: 'multiple-choice',
        text: 'What type of engineering are you studying?',
        required: true,
        options: [
          { id: 'mechanical', label: 'Mechanical Engineering', value: 'mechanical' },
          { id: 'electrical', label: 'Electrical Engineering', value: 'electrical' },
          { id: 'civil', label: 'Civil Engineering', value: 'civil' },
          { id: 'other', label: 'Other', value: 'other' },
        ],
      },
      {
        id: 'business-focus',
        type: 'multiple-choice',
        text: 'What is your business focus?',
        required: true,
        options: [
          { id: 'marketing', label: 'Marketing', value: 'marketing' },
          { id: 'finance', label: 'Finance', value: 'finance' },
          { id: 'management', label: 'Management', value: 'management' },
          { id: 'entrepreneurship', label: 'Entrepreneurship', value: 'entrepreneurship' },
        ],
      },
    ],
  },
  {
    id: 'career',
    title: 'Career Goals',
    questions: [
      {
        id: 'career-goals',
        type: 'multiple-choice',
        text: 'What are your career goals?',
        required: true,
        options: [
          { id: 'startup', label: 'Start my own company', value: 'startup' },
          { id: 'corporate', label: 'Work for a large corporation', value: 'corporate' },
          { id: 'freelance', label: 'Freelance/Consulting', value: 'freelance' },
          { id: 'research', label: 'Research/Academia', value: 'research' },
        ],
      },
      {
        id: 'preferred-language',
        type: 'multiple-choice',
        text: 'Which programming language would you like to learn first?',
        required: true,
        options: [
          { id: 'javascript', label: 'JavaScript', value: 'javascript' },
          { id: 'python', label: 'Python', value: 'python' },
          { id: 'java', label: 'Java', value: 'java' },
          { id: 'cpp', label: 'C++', value: 'cpp' },
        ],
      },
      {
        id: 'tech-stack',
        type: 'multiple-choice',
        text: 'What is your primary tech stack?',
        required: true,
        options: [
          { id: 'frontend', label: 'Frontend (React, Vue, Angular)', value: 'frontend' },
          { id: 'backend', label: 'Backend (Node.js, Python, Java)', value: 'backend' },
          { id: 'fullstack', label: 'Full Stack', value: 'fullstack' },
          { id: 'mobile', label: 'Mobile Development', value: 'mobile' },
        ],
      },
      {
        id: 'specialization',
        type: 'multiple-choice',
        text: 'What is your area of specialization?',
        required: true,
        options: [
          { id: 'ai', label: 'AI/Machine Learning', value: 'ai' },
          { id: 'security', label: 'Cybersecurity', value: 'security' },
          { id: 'cloud', label: 'Cloud Architecture', value: 'cloud' },
          { id: 'devops', label: 'DevOps', value: 'devops' },
        ],
      },
    ],
  },
];