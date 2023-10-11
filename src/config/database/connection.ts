import { createConnection, getConnection, Connection } from 'typeorm'

const connection = {
  async get(): Promise<Connection> {
    return await getConnection()
  },

  async create(): Promise<void> {
    await createConnection()
  },

  async close(): Promise<void> {
    await getConnection().close()
  },

  async clear(): Promise<void> {
    const connection = getConnection()
    const entities = connection.entityMetadatas

    entities.forEach(async (entity) => {
      const repository = connection.getRepository(entity.name)
      await repository.query(`DELETE FROM ${entity.tableName}`)
    })
  },
}
export default connection
