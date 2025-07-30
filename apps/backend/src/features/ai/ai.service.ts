import { Injectable } from '@nestjs/common';
import Groq from 'groq-sdk';
import { config } from '../../config/config';
import type { Task, Mood } from '@moodflow/types';

@Injectable()
export class AiService {
  private groq: Groq;

  constructor() {
    this.groq = new Groq({
      apiKey: config.groq.apiKey,
    });
  }

  async generatePlanning(mood: Mood, tasks: Task[]): Promise<string> {
    const prompt = `
En tant qu'assistant IA spécialisé en productivité personnelle, analysez les données suivantes et générez des recommandations de planning intelligent :

HUMEUR DU JOUR :
- Niveau d'humeur : ${mood.value}/10

TÂCHES À PLANIFIER :
${tasks
  .map(
    task => `
- ${task.title} (${task.category})
  * Priorité : ${task.priority}
  * Durée estimée : ${task.estimatedDuration}min
  * Description : ${task.description || 'Aucune'}
`,
  )
  .join('')}

Générez des recommandations personnalisées en tenant compte de :
1. L'état émotionnel pour adapter le type de tâches
2. Le niveau d'énergie pour optimiser la charge de travail
3. Les meilleures pratiques de productivité
4. La répartition optimale des tâches selon les moments de la journée

Répondez avec des conseils concrets et adaptés, en français, de manière empathique et motivante.
    `;

    try {
      const completion = await this.groq.chat.completions.create({
        model: config.groq.model,
        messages: [{ role: 'user', content: prompt }],
        max_completion_tokens: 500,
        temperature: 0.7,
      });

      return (
        completion.choices[0]?.message?.content ||
        'Impossible de générer des recommandations pour le moment.'
      );
    } catch (error) {
      console.error('Erreur IA:', error);
      return 'Service IA temporairement indisponible. Planifiez vos tâches selon vos préférences habituelles.';
    }
  }

  async generateDebriefInsights(
    mood: Mood,
    completedTasks: Task[],
    actualProductivity: number,
  ): Promise<string> {
    const prompt = `
Analysez la journée de travail suivante et générez un débrief personnalisé :

DONNÉES DE LA JOURNÉE :
- Humeur matinale : ${mood.value}/10
- Productivité réelle : ${actualProductivity}%
- Tâches complétées : ${completedTasks.length}

TÂCHES RÉALISÉES :
${completedTasks
  .map(
    task => `
- ${task.title} (${task.category})
  * Durée prévue : ${task.estimatedDuration}min
  * Durée réelle : ${task.actualDuration || 'Non mesurée'}min
`,
  )
  .join('')}

Générez un débrief constructif incluant :
1. Les points positifs de la journée
2. Les axes d'amélioration
3. Des conseils pour optimiser la productivité future
4. Une motivation pour demain

Ton empathique et encourageant en français.
    `;

    try {
      const completion = await this.groq.chat.completions.create({
        model: config.groq.model,
        messages: [{ role: 'user', content: prompt }],
        max_completion_tokens: 400,
        temperature: 0.8,
      });

      return (
        completion.choices[0]?.message?.content ||
        'Bonne journée de travail ! Continuez sur cette lancée.'
      );
    } catch (error) {
      console.error('Erreur IA:', error);
      return 'Analyse non disponible. Réfléchissez à vos accomplissements et préparez demain sereinement.';
    }
  }
}
