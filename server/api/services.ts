export default defineEventHandler(async (event) => {
  const services = [
    {
      label: 'Eye exam',
      value: 'eye_exam',
    },
    {
      label: "Reparation",
      value: "reparation"
    },
    {
      label: 'Adjustment',
      value: 'adjustment',
    },
    {
      label: 'Contact lens fitting',
      value: 'contact_lens_fitting',
    },
    {
      label: 'Stylist',
      value: 'stylist',
    },
    {
      label: 'Laser eye surgery',
      value: 'laser_eye_surgery',
    },
    {
      label: 'Eye disease',
      value: 'eye_disease',
    },
    {
      label: 'Eye injury',
      value: 'eye_injury',
    },
    {
      label: 'Eye infection',
      value: 'eye_infection',
    },
    {
      label: 'Eye pain',
      value: 'eye_pain',
    },
    {
      label: 'Emergency',
      value: 'emergency',
    },
    {
      label: 'Other',
      value: 'other',
    },
  ]

  return services
 
})
