import http from '../http';

export interface ClassificationResult {
  meeting_id: number;
  classification: any;
  confidence_score: number;
  created_at: string;
  updated_at: string;
}

export interface TaskStatus {
  task_id: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number;
  created_at: string;
  updated_at: string;
  result?: any;
  error?: string;
}

export interface WorkerStats {
  total_tasks: number;
  completed_tasks: number;
  failed_tasks: number;
  pending_tasks: number;
  average_processing_time: number;
  last_activity: string;
}

export interface WorkerHealth {
  status: 'healthy' | 'unhealthy';
  uptime: number;
  memory_usage: number;
  cpu_usage: number;
  last_check: string;
}

export interface BatchClassificationRequest {
  meeting_ids: number[];
}

export const workersService = {
  classifyMeeting: async (meetingId: number): Promise<TaskStatus> => {
    const response = await http.post(`/api/v1/workers/classify/${meetingId}`, {});
    return response.data.data;
  },

  classifyBatch: async (meetingIds: number[]): Promise<TaskStatus> => {
    const response = await http.post('/api/v1/workers/classify/batch', {
      meeting_ids: meetingIds
    });
    return response.data;
  },

  getTaskStatus: async (taskId: string): Promise<TaskStatus> => {
    const response = await http.get(`/api/v1/workers/task/${taskId}`, {});
    return response.data.data;
  },

  getWorkerStats: async (): Promise<WorkerStats> => {
    const response = await http.get('/api/v1/workers/stats', {});
    return response.data;
  },

  getWorkerHealth: async (): Promise<WorkerHealth> => {
    const response = await http.get('/api/v1/workers/health', {});
    return response.data;
  },

  getClassificationResult: async (meetingId: number): Promise<ClassificationResult> => {
    const response = await http.get(`/api/v1/workers/classification/${meetingId}`, {});
    return response.data;
  },

  getAllClassifications: async (): Promise<ClassificationResult[]> => {
    const response = await http.get('/api/v1/workers/classifications', {});
    return response.data;
  },

  deleteClassification: async (meetingId: number): Promise<void> => {
    await http.delete(`/api/v1/workers/classification/${meetingId}`, {});
  }
};
