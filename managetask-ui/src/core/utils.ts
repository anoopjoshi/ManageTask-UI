export const isDefined = (value: any) => {
    return !isNull(value) && !isUndefined(value);
  };
  
  export const isNull = (value: any) => {
    return value === null && typeof value === 'object';
  };
  
  export const isUndefined = (value: any) => {
    return value === undefined && typeof value === 'undefined';
  };
  
  export const parseBoolean = (input: string | boolean) => isDefined(input) && input.toString().toLowerCase() === 'true';
  