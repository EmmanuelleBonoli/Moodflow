import {apiClient} from './index';
import type {NewMood} from '@moodflow/types';

export const moodApi = {
    update: (newMood: NewMood): Promise<void> =>
        apiClient.post('/mood', newMood),
};
