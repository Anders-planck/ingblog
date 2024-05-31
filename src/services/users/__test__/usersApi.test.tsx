import { beforeAll, afterAll } from '@jest/globals';
import { usersApi } from '@/services/users';

jest.mock('@/lib/supabase', () => ({
  supabase: {
    from: jest.fn().mockReturnThis(),
    update: jest.fn().mockResolvedValue({ data: {}, error: null }),
  },
}));

beforeAll(() => {
  jest.spyOn(usersApi.endpoints.getProfile, 'initiate');
  jest.spyOn(usersApi.endpoints.updateProfile, 'initiate');
});

afterAll(() => {
  jest.restoreAllMocks();
});

describe('usersApi', () => {
  test('get profile endpoint', () => {
    const result = usersApi.endpoints.getProfile.initiate({ userId: '1' });
    expect(result).toBeDefined();
  });

  test('update profile endpoint', () => {
    const result = usersApi.endpoints.updateProfile.initiate({
      full_name: 'test',
      phone: '123456789',
      work: 'test',
      updated_at: '2021-09-01T00:00:00.000Z',
    });
    expect(result).toBeDefined();
  });
});
