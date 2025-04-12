export enum EnemiesType {
  SOLDIER = "soldier",
  MECHA = "mech",
}

export type Enemies = {
  type: EnemiesType;
  number: number;
};
