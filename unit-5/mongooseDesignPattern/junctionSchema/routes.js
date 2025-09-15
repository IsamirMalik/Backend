const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const { Consultation, Doctor, Patient } = require('./schema');

router.post('/doctors', async (req, res) => {
  const doctor = new Doctor(req.body);
  await doctor.save();
  res.status(201).json(doctor);
});

router.post('/patients', async (req, res) => {
  const patient = new Patient(req.body);
  await patient.save();
  res.status(201).json(patient);
});

router.post('/consultations', async (req, res) => {
  const { doctorId, patientId, notes } = req.body;
  const doctor = await Doctor.findOne({ _id: doctorId, isActive: true });
  const patient = await Patient.findOne({ _id: patientId, isActive: true });
  if (!doctor || !patient) {
    return res.status(400).json({ error: 'Either doctor or patient is inactive or does not exist' });
  }
  const consultation = new Consultation({ doctorId, patientId, notes });
  await consultation.save();
  res.status(201).json(consultation);
});

router.get('/doctors/:id/patients', async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const consultations = await Consultation.find({ doctorId: req.params.id, isActive: true })
    .populate({
      path: 'patientId',
      select: 'name age gender',
    })
    .sort({ consultedAt: -1 })
    .limit(limit);
  const patients = consultations.map(c => c.patientId);
  res.json(patients);
});

router.get('/patients/:id/doctors', async (req, res) => {
  const consultations = await Consultation.find({ patientId: req.params.id, isActive: true })
    .populate({
      path: 'doctorId',
      select: 'name specialization',
    });
  const doctors = consultations.map(c => c.doctorId);
  res.json(doctors);
});

router.get('/doctors/:id/consultations/count', async (req, res) => {
  const count = await Consultation.countDocuments({ doctorId: req.params.id, isActive: true });
  res.json({ count });
});

router.get('/patients', async (req, res) => {
  const { gender } = req.query;
  const filter = { isActive: true };
  if (gender) filter.gender = gender;
  const patients = await Patient.find(filter);
  res.json(patients);
});
router.get('/consultations/recent', async (req, res) => {
  const consultations = await Consultation.find({ isActive: true })
    .sort({ consultedAt: -1 })
    .limit(5)
    .populate('doctorId', 'name')
    .populate('patientId', 'name');
  res.json(consultations);
});

router.delete('/doctors/:id', async (req, res) => {
  await Doctor.findByIdAndUpdate(req.params.id, { isActive: false });
  await Consultation.updateMany({ doctorId: req.params.id }, { isActive: false });
  res.status(204).send();
});

router.delete('/patients/:id', async (req, res) => {
  await Patient.findByIdAndUpdate(req.params.id, { isActive: false });
  await Consultation.updateMany({ patientId: req.params.id }, { isActive: false });
  res.status(204).send();
});

module.exports = router;