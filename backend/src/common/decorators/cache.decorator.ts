import { SetMetadata } from "@nestjs/common"

export const Cache = (key: string, ttl = 300) => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    SetMetadata("cache-key", key)(target, propertyKey, descriptor)
    SetMetadata("cache-ttl", ttl)(target, propertyKey, descriptor)
  }
}
