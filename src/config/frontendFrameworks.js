const frontendFrameworks = {

   react: {
      name: "React",
      template: "frontend/react",
      needsInstall: true,
   },

   next: {
      name: "Next.js",
      template: "frontend/next",
      needsInstall: true,
   },

   vanilla: {
      name: "Vanilla",
      template: "frontend/vanilla",
      needsInstall: false,
   },
};

module.exports = frontendFrameworks;