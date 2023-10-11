/*eslint-disabled no-unused-vars*/
import {
  Entity,
  getRepository,
  getCustomRepository,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  EntityRepository,
  Repository,
} from 'typeorm'
import messages from '../messages'

type SerializerProps = { [key: string]: any }

abstract class ModelBase {
  static serializer(data: SerializerProps): SerializerProps {
    throw new Error(messages.NOT_IMPLEMENTED)
  }
}

export {
  ModelBase,
  Entity,
  getRepository,
  getCustomRepository,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  EntityRepository,
  Repository,
}
