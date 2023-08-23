module.exports = {
  apps: [
    {
      name: 'hotels-backend',
      cwd: './',
      script: 'npm',
      args: 'run start:prod',
      max_memory_restart: '1G',
    },
  ],
};
