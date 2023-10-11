type UseCaseBaseProps = { [key: string]: any }

export abstract class UseCaseBase {
  //TODO: abstract = handle
  abstract execute(data: UseCaseBaseProps): Promise<unknown>
}
