import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class idProductoUnico implements ValidatorConstraintInterface {
  validate(array: any[], args: any) {
    if (!Array.isArray(array)) {
      return false;
    }

    const property = args.constraints[0];
    const values = array.map(item => item[property]);

    return new Set(values).size === array.length;
  }

  defaultMessage(args: any) {
    const property = args.constraints[0];
    return `El campo '${property}' dentro del arreglo debe ser único.`;
  }
}
