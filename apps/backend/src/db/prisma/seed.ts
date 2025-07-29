// prisma/seed.ts
import {
  PrismaClient,
  TaskPriority,
  TaskStatus,
  TaskCategory,
  AccountStatus,
  UserRole,
} from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Début du seeding...');

  // Nettoyer les données existantes
  await prisma.debrief.deleteMany();
  await prisma.planningTask.deleteMany();
  await prisma.planning.deleteMany();
  await prisma.task.deleteMany();
  await prisma.user.deleteMany();

  // Créer des utilisateurs de test
  const hashedPassword = await bcrypt.hash('Password123', 12);

  const testUser = await prisma.user.create({
    data: {
      email: 'user@moodflow.com',
      name: 'Manu User Test',
      password: hashedPassword,
      accountStatus: AccountStatus.ACTIVE,
      userRole: UserRole.USER,
    },
  });

  const adminUser = await prisma.user.create({
    data: {
      email: 'manu@moodflow.com',
      name: 'Manu Admin Test',
      password: hashedPassword,
      accountStatus: AccountStatus.ACTIVE,
      userRole: UserRole.ADMIN,
    },
  });

  console.log('✅ Utilisateurs créés');

  const tasks = await Promise.all([
    prisma.task.create({
      data: {
        userId: testUser.id,
        title: 'Développer API users',
        description:
          'Créer les endpoints CRUD pour la gestion des utilisateurs',
        priority: TaskPriority.high,
        status: TaskStatus.completed,
        category: TaskCategory.creative,
        estimatedDuration: 180, // 3h
        actualDuration: 165, // 2h45
        completedAt: new Date(),
      },
    }),
    prisma.task.create({
      data: {
        userId: testUser.id,
        title: 'Réunion équipe',
        description: "Point hebdomadaire avec l'équipe de développement",
        priority: TaskPriority.medium,
        status: TaskStatus.completed,
        category: TaskCategory.meeting,
        estimatedDuration: 60,
        actualDuration: 75,
        completedAt: new Date(),
      },
    }),
    prisma.task.create({
      data: {
        userId: testUser.id,
        title: 'Rédiger documentation',
        description: "Documenter les nouvelles fonctionnalités de l'API",
        priority: TaskPriority.medium,
        status: TaskStatus.in_progress,
        category: TaskCategory.admin,
        estimatedDuration: 120,
        actualDuration: null,
      },
    }),
    prisma.task.create({
      data: {
        userId: testUser.id,
        title: 'Formation TypeScript',
        description: 'Suivre le cours avancé sur TypeScript',
        priority: TaskPriority.low,
        status: TaskStatus.pending,
        category: TaskCategory.learning,
        estimatedDuration: 240,
        actualDuration: null,
      },
    }),
    prisma.task.create({
      data: {
        userId: testUser.id,
        title: 'Pause déjeuner',
        description: "Sortir prendre l'air et manger sainement",
        priority: TaskPriority.medium,
        status: TaskStatus.completed,
        category: TaskCategory.personal,
        estimatedDuration: 60,
        actualDuration: 45,
        completedAt: new Date(),
      },
    }),
  ]);

  console.log('✅ Tâches créées');

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todayPlanning = await prisma.planning.create({
    data: {
      userId: testUser.id,
      date: today,
      mood: 8,
      aiRecommendations:
        "Excellente journée ! Votre niveau d'énergie est optimal. Concentrez-vous sur les tâches prioritaires le matin et gardez les tâches moins importantes pour l'après-midi.",
      totalEstimatedTime: 660, // 11h
      actualProductivity: 85,
    },
  });

  await Promise.all(
    tasks.slice(0, 4).map(task =>
      prisma.planningTask.create({
        data: {
          planningId: todayPlanning.id,
          taskId: task.id,
        },
      }),
    ),
  );

  console.log('✅ Planning du jour créé');

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  yesterday.setHours(0, 0, 0, 0);

  const yesterdayPlanning = await prisma.planning.create({
    data: {
      userId: testUser.id,
      date: yesterday,
      mood: 7,
      aiRecommendations:
        'Bonne journée productive. Attention à ne pas négliger les pauses.',
      totalEstimatedTime: 480,
      actualProductivity: 75,
    },
  });

  await prisma.debrief.create({
    data: {
      planningId: yesterdayPlanning.id,
      userReflexion:
        "Journée plutôt satisfaisante. J'ai réussi à terminer l'API mais j'ai eu du mal à me concentrer après 16h.",
      aiAnalysis:
        "Excellente journée productive ! Vous avez su maintenir un bon rythme de travail avec 8 tâches accomplies sur 10. Votre concentration matinale était remarquable, mais attention à la baisse d'énergie après 16h - pensez à faire des pauses plus régulières.",
      success:
        '• API users développée avec succès\n• Réunion très productive\n• Bonne gestion du temps',
      improvementAvenues:
        '• Documentation pas terminée\n• Pause déjeuner trop courte\n• Concentration baisse après 16h',
    },
  });

  console.log("✅ Debrief d'hier créé");

  await Promise.all([
    prisma.task.create({
      data: {
        userId: testUser.id,
        title: 'Code review',
        description: "Réviser le code de l'équipe",
        priority: TaskPriority.high,
        status: TaskStatus.pending,
        category: TaskCategory.creative,
        estimatedDuration: 90,
      },
    }),
    prisma.task.create({
      data: {
        userId: testUser.id,
        title: 'Mise à jour serveur',
        description: 'Appliquer les dernières mises à jour de sécurité',
        priority: TaskPriority.high,
        status: TaskStatus.pending,
        category: TaskCategory.admin,
        estimatedDuration: 45,
      },
    }),
  ]);

  console.log('✅ Tâches supplémentaires créées');

  console.log('🎉 Seeding terminé avec succès!');
  console.log(`👤 Utilisateur test: ${testUser.email} / Password123`);
  console.log(`👑 Admin: ${adminUser.email} / Password123`);
}

main()
  .catch(e => {
    console.error('❌ Erreur lors du seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
