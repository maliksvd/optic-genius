export default defineEventHandler(async (event) => {
  const occupation_types = [
    {
      label: 'Optometrist',
      value: 'optometrist',
    },
    {
      label: 'Optician',
      value: 'optician',
    },
    {
      label: 'Ophthalmologist',
      value: 'ophthalmologist',
    },
    {
      label: 'Ocularist',
      value: 'ocularist',
    },
    {
      label: 'Orthoptist',
      value: 'orthoptist',
    },
    {
      label: 'Ophthalmic Medical Technologist',
      value: 'ophthalmic_medical_technologist',
    },
    {
      label: 'Ophthalmic Technician',
      value: 'ophthalmic_technician',
    },
    {
      label: 'Ophthalmic Assistant',
      value: 'ophthalmic_assistant',
    },
    {
      label: 'Ophthalmic Photographer',
      value: 'ophthalmic_photographer',
    },
    {
      label: 'Ophthalmic Scribe',
      value: 'ophthalmic_scribe',
    },
    {
      label: 'Ophthalmic Dispenser',
      value: 'ophthalmic_dispenser',
    },
    {
      label: 'Ophthalmic Frame Stylist',
      value: 'ophthalmic_frame_stylist',
    },
    {
      label: 'Ophthalmic Lens Surfacer',
      value: 'ophthalmic_lens_surfacer',
    },
    {
      label: 'Ophthalmic Lab Technician',
      value: 'ophthalmic_lab_technician',
    },
    {
      label: 'Ophthalmic Lab Manager',
      value: 'ophthalmic_lab_manager',
    },
    {
      label: 'Ophthalmic Lab Owner',
      value: 'ophthalmic_lab_owner',
    },
    {
      label: 'Ophthalmic Lens Designer',
      value: 'ophthalmic_lens_designer',
    },
    {
      label: 'Ophthalmic Lens Manufacturer',
      value: 'ophthalmic_lens_manufacturer',
    },
    {
      label: 'Ophthalmic Lens Sales Representative',
      value: 'ophthalmic_lens_sales_representative',
    },
    {
      label: 'Ophthalmic Lens Marketer',
      value: 'ophthalmic_lens_marketer',
    },
  ]
  return occupation_types
})
