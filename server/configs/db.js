import https from 'https';

const NEON_HOST = 'ep-silent-cell-ah5o3p6z-pooler.c-3.us-east-1.aws.neon.tech';
const NEON_IP = '18.215.6.120';

async function sql(strings, ...values) {
  let query = '';
  const params = [];
  for (let i = 0; i < strings.length; i++) {
    query += strings[i];
    if (i < values.length) {
      params.push(values[i]);
      query += `$${i + 1}`;
    }
  }

  const body = JSON.stringify({ query, params });

  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: NEON_IP,
      port: 443,
      path: '/sql',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
        'Neon-Connection-String': process.env.DATABASE_URL,
        'Host': NEON_HOST
      },
      timeout: 30000
    }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try {
          const result = JSON.parse(data);
          if (result.error) {
            reject(new Error(result.error.message || result.error));
          } else {
            resolve(result.rows);
          }
        } catch (e) {
          reject(new Error(`Failed to parse response: ${data}`));
        }
      });
    });
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error('Connection timeout')); });
    req.write(body);
    req.end();
  });
}

export default sql;
