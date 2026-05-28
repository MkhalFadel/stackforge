const frontendFrameworks = {

   react: {
      name: "React",
      template: "frontend/react",
      needsInstall: true,
      supportsTailwind: true,
   },

   next: {
      name: "Next.js",
      template: "frontend/next",
      needsInstall: true,
      supportsTailwind: true,
   },

   vanilla: {
      name: "Vanilla",
      template: "frontend/vanilla",
      needsInstall: false,
      supportsTailwind: false,
   },
};

module.exports = frontendFrameworks;