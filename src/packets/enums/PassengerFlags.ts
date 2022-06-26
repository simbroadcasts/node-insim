export enum PassengerFlags {
  /** Front passenger is male */
  FRONT_MALE = 1,

  /** Front passenger is female */
  FRONT_FEMALE = 2,

  /** Rear-left passenger is male */
  REAR_LEFT_MALE = 4,

  /** Rear-left passenger is female */
  REAR_LEFT_FEMALE = 8,

  /** Rear-middle passenger is male */
  REAR_MIDDLE_MALE = 16,

  /** Rear-middle passenger is female */
  REAR_MIDDLE_FEMALE = 32,

  /** Rear-right passenger is male */
  REAR_RIGHT_MALE = 64,

  /** Rear-right passenger is female */
  REAR_RIGHT_FEMALE = 128,
}
