import { expect } from 'chai';

import { axios, afterEachTest, beforeEachTest } from '@/utils/tests';

describe('GET /health', () => {
  beforeEach(beforeEachTest);

  afterEach(afterEachTest);

  it('should return 200 OK with database connected', async () => {
    const response = await axios.get('/health');

    expect(response.status).to.equal(200);
    expect(response.data).to.deep.equal({
      success: true,
      data: {
        status: 'OK',
        database: 'Connected',
      },
    });
  });
});
