const express = require('express');
const router = express.Router();


router.post('/students', async (req, res) => {
  const student = new Student(req.body);
  await student.save();
  res.status(201).json(student);
});


router.post('/courses', async (req, res) => {
  const course = new Course(req.body);
  await course.save();
  res.status(201).json(course);
});


router.post('/enroll', async (req, res) => {
  const { studentId, courseId } = req.body;
  const student = await Student.findOne({ _id: studentId, isActive: true });
  const course = await Course.findOne({ _id: courseId, isActive: true });
  if (student && course) {
    const enrollment = new Enrollment({ studentId, courseId });
    await enrollment.save();
    res.status(201).json(enrollment);
  } else {
    res.status(400).json({ error: 'Student or course not active' });
  }
});




router.get('/students/:id/courses', async (req, res) => {
  const enrollments = await Enrollment.find({ studentId: req.params.id, isActive: true })
    .populate({ path: 'courseId', match: { isActive: true } });
  const activeCourses = enrollments
    .map(e => e.courseId)
    .filter(c => c && c.isActive);
  res.json(activeCourses);
});


router.get('/courses/:id/students', async (req, res) => {
  const enrollments = await Enrollment.find({ courseId: req.params.id, isActive: true })
    .populate({ path: 'studentId', match: { isActive: true } });
  const activeStudents = enrollments
    .map(e => e.studentId)
    .filter(s => s && s.isActive);
  res.json(activeStudents);
});



router.delete('/students/:id', async (req, res) => {
  await Student.findByIdAndUpdate(req.params.id, { isActive: false });
  await Enrollment.updateMany({ studentId: req.params.id }, { isActive: false });
  res.status(204).send();
});


router.delete('/courses/:id', async (req, res) => {
  await Course.findByIdAndUpdate(req.params.id, { isActive: false });
  await Enrollment.updateMany({ courseId: req.params.id }, { isActive: false });
  res.status(204).send();
});
