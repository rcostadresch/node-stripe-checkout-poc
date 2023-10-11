import { BaseEntity, SelectQueryBuilder } from 'typeorm'

export const getPagination = async (
  Model: typeof BaseEntity,
  page: number,
  per_page: number,
  options: generic_object
): Promise<PaginationAwareObject> => {
  const skip = (page - 1) * per_page
  const count = await Model.count({ ...options })

  const calcule_last_page = count % per_page
  const last_page = calcule_last_page === 0 ? count / per_page : Math.trunc(count / per_page) + 1

  const res = await Model.find({
    ...options,
    take: per_page,
    skip,
  })

  return formatReturn(skip, count, per_page, page, last_page, res)
}

export const getPaginationBuilder = async (
  selectQueryBuilder: SelectQueryBuilder<any>,
  page: number,
  per_page: number,
  orderBy?: string,
  join_needed = false
): Promise<PaginationAwareObject> => {
  const skip = (page - 1) * per_page
  const count = await selectQueryBuilder.getCount()

  const calcule_last_page = count % per_page
  const last_page = calcule_last_page === 0 ? count / per_page : Math.trunc(count / per_page) + 1

  let res
  if (orderBy) {
    res = join_needed
      ? (await selectQueryBuilder.orderBy(`${orderBy}`, 'ASC').getMany()).slice(skip, skip + per_page)
      : await selectQueryBuilder.orderBy(`${orderBy}`, 'ASC').offset(skip).limit(per_page).getMany()
  } else {
    res = join_needed
      ? (await selectQueryBuilder.getMany()).slice(skip, skip + per_page)
      : await selectQueryBuilder.offset(skip).limit(per_page).getMany()
  }

  return formatReturn(skip, count, per_page, page, last_page, res)
}

const formatReturn = (skip, count, per_page, page, last_page, res) => {
  return {
    from: skip <= count ? skip + 1 : null,
    to: count > skip + per_page ? skip + per_page : count,
    per_page: per_page,
    total: count,
    current_page: page,
    prev_page: page > 1 ? page - 1 : null,
    next_page: count > skip + per_page ? page + 1 : null,
    last_page: last_page,
    data: res || [],
  }
}

interface generic_object {
  [key: string]: any
}

export interface PaginationAwareObject {
  from: any
  to: any
  per_page: any
  total: number | any
  current_page: number
  prev_page?: number | null
  next_page?: number | null
  last_page: number | null
  data: Array<generic_object | any> | any
}
