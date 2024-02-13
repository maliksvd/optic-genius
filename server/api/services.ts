export default defineEventHandler(async (event) => {
  const services = [
    {
      label: "Eye exam",
      value: "eye_exam",
      icon: "i-ph-eye",
    },
    {
      label: "Reparation",
      value: "reparation",
      icon: "i-ph-wrench",
    },
    {
      label: "Adjustment",
      value: "adjustment",
      icon: "i-ph-image-square",
    },
    {
      label: "Contact lens fitting",
      value: "contact_lens_fitting",
      icon: "i-ph-subtract",
    },
    {
      label: "Stylist",
      value: "stylist",
      icon: "i-ph-eyeglasses",
    },
    {
      label: "Laser eye surgery",
      value: "laser_eye_surgery",
      icon: "i-ph-smiley-x-eyes",
    },
    {
      label: "Eye disease",
      value: "eye_disease",
      icon: "i-ph-smiley-x-eyes",
    },
    {
      label: "Eye infection",
      value: "eye_infection",
      icon: "i-ph-eyedropper-sample",
    },
    {
      label: "Emergency",
      value: "emergency",
      icon: "i-ph-shield-plus",
    },
    {
      label: "Other",
      value: "other",
      icon: "i-ph-circles-four",
    },
  ];

  return services;
});
