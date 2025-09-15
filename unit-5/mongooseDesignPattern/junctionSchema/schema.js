mongoose.connect('mongodb://localhost:27017/hospital', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Doctor schema
const DoctorSchema = new mongoose.Schema({
  name: String,
  specialization: String,
  isActive: { type: Boolean, default: true }
});
const Doctor = mongoose.model('Doctor', DoctorSchema);

// Patient schema
const PatientSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  isActive: { type: Boolean, default: true }
});
const Patient = mongoose.model('Patient', PatientSchema);

// Consultation (junction) schema
const ConsultationSchema = new mongoose.Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
  consultedAt: { type: Date, default: Date.now },
  notes: String,
  isActive: { type: Boolean, default: true }
});
const Consultation = mongoose.model('Consultation', ConsultationSchema);

module.exports =  {Consultation, Doctor, Patient };