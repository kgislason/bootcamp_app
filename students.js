const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const cohortName = process.argv[2];
const limit = process.argv[3];

pool.query(`
SELECT students.id AS student_id, students.name AS name, cohorts.name AS cohort
FROM students
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name LIKE '${cohortName}'
LIMIT ${limit || 5};
`)
.then(res => {
  console.log(res.rows);
  res.rows.forEach(user => {
    console.log(`${user.name} has an ${user.student_id} and was in the ${user.cohort} cohort`);
  });
})
.catch(err => console.error('query error', err.stack));