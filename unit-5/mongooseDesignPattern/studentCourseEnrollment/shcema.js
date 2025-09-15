const mongoose = require('mongoose');


const StudentSchema = new mongoose.Schema({
  name: String,
  email: String,
  isActive: { type: Boolean, default: true }
});
const Student = mongoose.model('Student', StudentSchema);


const CourseSchema = new mongoose.Schema({
  title: String,
  description: String,
  isActive: { type: Boolean, default: true }
});
const Course = mongoose.model('Course', CourseSchema);


const EnrollmentSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  enrolledAt: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true }
});
const Enrollment = mongoose.model('Enrollment', EnrollmentSchema);

module.exports = { Student, Course, Enrollment };