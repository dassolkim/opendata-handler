const { Pool, Client } = require("pg");
const config = require('./pg-config')
const { rows } = require("pg/lib/defaults");



async function query (q, client) {
    // const client = await pool.connect()
    let res
    try {
        await client.query('BEGIN')
        try {
            res = await client.query(q)
            await client.query('COMMIT')
        } catch (err) {
            console.log(err)
            // await client.query('ROLLBACK')
            // throw err
        }
    } finally {
        // client.release()
    }
    return res
}

async function main () {
    try {
        const client = await config.pool.connect()
        let i = 20
        const d_t_name = 'us_p1_csv_'
        const rows = {
            cols: []
        }
        // range us_p1_csv_20-38
        while(i<39){
            const t_name = d_t_name + i
            const result = await query(`SELECT * FROM ${t_name} LIMIT 1`, client)
            // console.log(JSON.stringify(result))
            if (result != undefined){
                rows.cols[i] = result.rows
            }
            i++
        }
        client.release()
        console.log(rows.cols)
        // while(true){
        //     console.log(rows.cols)
        // }
    } catch (err) {
        console.log('Database ' + err)
    }
}

main()

/* async function query (q, client) {
    // const client = await pool.connect()
    let res
    let result
    await client.query('BEGIN')
       
    res = await client.query(q)
    await client.query('COMMIT')
    
    if (res == undefined){
        result = null
    } else{
        result = res
    }
    return result
} */

/* const d_t_name = 'us_p1_csv_'
const d_c_name = 'col_'
const col = []
let i = 0
while(i<1){
    const t_name = d_t_name + i
    console.log(t_name)
    pool.query(`SELECT * from ${t_name} LIMIT 10`, (err, res) => {
        console.log(res)
        // col = res.rows[i]
        // console.log(col);
    })
    i++
    pool.end()
}
console.log(col)
 */



