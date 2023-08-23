import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.references.upsert({
    where: { id: 1 },
    update: {},
    create: {
      domain: 'DOM_TYPEDOCUMENT',
      optional: '',
      range_value: 'cc',
      description: 'Cédula de ciudadania',
      state: 'enabled',
    },
  });
  await prisma.references.upsert({
    where: { id: 2 },
    update: {},
    create: {
      domain: 'DOM_TYPEDOCUMENT',
      optional: '',
      range_value: 'nit',
      description: 'Nit',
      state: 'enabled',
    },
  });
  await prisma.references.upsert({
    where: { id: 3 },
    update: {},
    create: {
      domain: 'DOM_GENDER',
      optional: '',
      range_value: 'm',
      description: 'Male',
      state: 'enabled',
    },
  });
  await prisma.references.upsert({
    where: { id: 4 },
    update: {},
    create: {
      domain: 'DOM_GENDER',
      optional: '',
      range_value: 'f',
      description: 'Female',
      state: 'enabled',
    },
  });
  await prisma.references.upsert({
    where: { id: 5},
    update: {},
    create: {
      domain: 'DOM_GENDER',
      optional: '',
      range_value: 'o',
      description: 'Other',
      state: 'enabled',
    },
  });
  await prisma.references.upsert({
    where: { id: 6 },
    update: {},
    create: {
      domain: 'DOM_STATE',
      optional: '',
      range_value: 'enabled',
      description: 'Activado',
      state: 'enabled',
    },
  });
  await prisma.references.upsert({
    where: { id: 7 },
    update: {},
    create: {
      domain: 'DOM_STATE',
      optional: '',
      range_value: 'disabled',
      description: 'Desactivado',
      state: 'enabled',
    },
  });

  await prisma.user.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'Administrador',
      last_name: '',
      email: 'hotelesapp@gmail.com',
      password: '$2a$10$mARD/qq0PY4YJwTG85HyZORkVISq7CZwT2Y3F/I1vU89UGnspnW62', 
      gender: 'male',
      birth_date: new Date(),
      document_type: 'nit',
      document_number: '800200321',
      phone: '3151234565',
      type: 'hotels_admin',
      state: 'enabled',
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
